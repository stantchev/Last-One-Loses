import { GameState, Player } from '../types/game';

// Calculate the NIM sum (XOR of all heap sizes)
const calculateNimSum = (rows: number[]): number => {
  return rows.reduce((sum, heap) => sum ^ heap, 0);
};

// Check if the current position is a winning position for the current player
export const isWinningPosition = (rows: number[]): boolean => {
  return calculateNimSum(rows) === 0;
};

// Get the optimal move for the AI
export const getOptimalMove = (rows: number[]): { rowIndex: number; count: number } => {
  const nimSum = calculateNimSum(rows);
  
  // If nimSum is 0, we're in a losing position
  // Take 1 from the first non-empty row
  if (nimSum === 0) {
    const rowIndex = rows.findIndex(row => row > 0);
    return { rowIndex, count: 1 };
  }
  
  // Try to find a winning move
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === 0) continue;
    
    for (let take = 1; take <= rows[i]; take++) {
      const newRows = [...rows];
      newRows[i] -= take;
      if (calculateNimSum(newRows) === 0) {
        return { rowIndex: i, count: take };
      }
    }
  }
  
  // If no winning move found, take 1 from the first non-empty row
  const rowIndex = rows.findIndex(row => row > 0);
  return { rowIndex, count: 1 };
};

// Initialize a new game state
export const initializeGame = (): GameState => {
  return {
    rows: [3, 5, 7],
    currentPlayer: Math.random() < 0.5 ? 'human' : 'ai',
    gameOver: false,
    winner: null,
    message: 'Game started! Make your move.',
    lastMove: null,
  };
};

// Check if the move is valid
export const isValidMove = (state: GameState, count: number, rowIndex: number): boolean => {
  const { rows } = state;
  
  // Can't remove from empty row or remove more lines than available
  if (rowIndex < 0 || rowIndex >= rows.length || count <= 0 || count > rows[rowIndex]) {
    return false;
  }
  
  return true;
};

// Make a move and update the game state
export const makeMove = (state: GameState, count: number, rowIndex: number, player: Player): GameState => {
  const { rows } = state;
  
  // Update the rows
  const newRows = [...rows];
  newRows[rowIndex] -= count;
  
  // Check if the game is over
  const isGameOver = newRows.every(row => row === 0);
  
  // The player who made the last move loses
  const winner = isGameOver ? (player === 'human' ? 'ai' : 'human') : null;
  
  // Create the move message
  const moveMessage = `${player === 'human' ? 'You' : 'AI'} removed ${count} line${count > 1 ? 's' : ''} from Row ${rowIndex + 1}`;
  
  // Create the game status message
  let message = moveMessage;
  
  if (isGameOver) {
    message = `${message}. Game over! ${winner === 'human' ? 'You win!' : 'AI wins!'}`;
  }
  
  return {
    ...state,
    rows: newRows,
    currentPlayer: player === 'human' ? 'ai' : 'human',
    gameOver: isGameOver,
    winner,
    message,
    lastMove: moveMessage,
  };
};

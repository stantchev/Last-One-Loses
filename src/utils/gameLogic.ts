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
export const getOptimalMove = (rows: number[], activeRowIndex: number): number => {
  const activeRowSize = rows[activeRowIndex];
  
  // If this is the last row with elements and it has only 1, AI must take it and lose
  if (
    activeRowSize === 1 &&
    rows.slice(activeRowIndex + 1).every(row => row === 0) &&
    rows.slice(0, activeRowIndex).every(row => row === 0)
  ) {
    return 1;
  }

  // If there's only one heap with items left, take all but 1 to force opponent to take last
  if (
    rows.filter(row => row > 0).length === 1 &&
    activeRowSize > 1
  ) {
    return activeRowSize - 1;
  }

  // Copy the rows for calculation
  const newRows = [...rows];
  const nimSum = calculateNimSum(newRows);

  // If we're already in a winning position (nim sum is 0)
  // Just take 1 item to minimize risk
  if (nimSum === 0) {
    return 1;
  }

  // Try to find a move that makes nim sum 0
  for (let take = 1; take <= activeRowSize; take++) {
    newRows[activeRowIndex] = activeRowSize - take;
    if (calculateNimSum(newRows) === 0) {
      return take;
    }
    // Reset for next iteration
    newRows[activeRowIndex] = activeRowSize;
  }

  // If no winning move, just take 1
  return 1;
};

// Initialize a new game state
export const initializeGame = (): GameState => {
  return {
    rows: [3, 5, 7],
    activeRowIndex: 0,
    currentPlayer: Math.random() < 0.5 ? 'human' : 'ai',
    gameOver: false,
    winner: null,
    message: 'Game started! Make your move.',
    lastMove: null,
  };
};

// Check if the move is valid
export const isValidMove = (state: GameState, count: number): boolean => {
  const { rows, activeRowIndex } = state;
  
  // Can't remove more lines than available in active row
  if (count <= 0 || count > rows[activeRowIndex]) {
    return false;
  }
  
  return true;
};

// Make a move and update the game state
export const makeMove = (state: GameState, count: number, player: Player): GameState => {
  const { rows, activeRowIndex } = state;
  
  // Update the rows
  const newRows = [...rows];
  newRows[activeRowIndex] -= count;
  
  // Check if active row is now empty
  let newActiveRowIndex = activeRowIndex;
  if (newRows[activeRowIndex] === 0) {
    // Move to next non-empty row
    while (newActiveRowIndex < newRows.length - 1 && newRows[newActiveRowIndex] === 0) {
      newActiveRowIndex++;
    }
  }
  
  // Check if the game is over
  const isGameOver = newRows.every(row => row === 0);
  
  // The player who made the last move loses
  const winner = isGameOver ? (player === 'human' ? 'ai' : 'human') : null;
  
  // Create the move message
  const moveMessage = `${player === 'human' ? 'You' : 'AI'} removed ${count} line${count > 1 ? 's' : ''} from Row ${activeRowIndex + 1}`;
  
  // Create the game status message
  let message = moveMessage;
  
  if (newRows[activeRowIndex] === 0 && !isGameOver) {
    message = `${message}. Row ${activeRowIndex + 1} is now empty.`;
  }
  
  if (isGameOver) {
    message = `${message}. Game over! ${winner === 'human' ? 'You win!' : 'AI wins!'}`;
  }
  
  return {
    ...state,
    rows: newRows,
    activeRowIndex: newActiveRowIndex,
    currentPlayer: player === 'human' ? 'ai' : 'human',
    gameOver: isGameOver,
    winner,
    message,
    lastMove: moveMessage,
  };
};
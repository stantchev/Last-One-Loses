import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { GameState, GameAction, Player } from '../types/game';
import { initializeGame, makeMove, getOptimalMove, isValidMove } from '../utils/gameLogic';

interface GameContextType {
  state: GameState;
  removeLines: (count: number, rowIndex: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'REMOVE_LINES': {
      const { count, rowIndex } = action.payload;
      
      // Validate the move
      if (!isValidMove(state, count, rowIndex)) {
        return {
          ...state,
          message: `Invalid move! You can remove 1 to ${state.rows[rowIndex]} lines from Row ${rowIndex + 1}.`,
        };
      }
      
      // Process the human move
      return makeMove(state, count, rowIndex, 'human');
    }
    case 'AI_MOVE': {
      if (state.gameOver) return state;
      
      // Get the optimal move for AI
      const { rowIndex, count } = getOptimalMove(state.rows);
      
      // Process the AI move
      return makeMove(state, count, rowIndex, 'ai');
    }
    case 'RESET_GAME':
      return initializeGame();
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, null, initializeGame);
  
  // Make AI move when it's AI's turn
  useEffect(() => {
    if (state.currentPlayer === 'ai' && !state.gameOver) {
      const aiTimer = setTimeout(() => {
        dispatch({ type: 'AI_MOVE' });
      }, 1000); // Delay AI move for better UX
      
      return () => clearTimeout(aiTimer);
    }
  }, [state.currentPlayer, state.gameOver]);
  
  const removeLines = (count: number, rowIndex: number) => {
    if (state.currentPlayer === 'human' && !state.gameOver) {
      dispatch({ type: 'REMOVE_LINES', payload: { count, rowIndex } });
    }
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  return (
    <GameContext.Provider value={{ state, removeLines, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

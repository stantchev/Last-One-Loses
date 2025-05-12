import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import GameStatus from './GameStatus';
import LineRow from './LineRow';
import GameControls from './GameControls';
import { Sparkles } from 'lucide-react';

const GameBoard: React.FC = () => {
  const { state, removeLines, resetGame } = useGame();
  
  return (
    <div className="w-full">
      <GameStatus />
      
      <div className="mt-6 bg-opacity-20 bg-black backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-8">
        <div className="space-y-6">
          {state.rows.map((lineCount, rowIndex) => (
            <LineRow
              key={rowIndex}
              rowIndex={rowIndex}
              lineCount={lineCount}
              isActive={rowIndex === state.activeRowIndex && !state.gameOver}
              isCompleted={lineCount === 0}
            />
          ))}
        </div>
        
        <GameControls />
        
        {state.gameOver && (
          <div className="mt-6 text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-opacity-30 bg-purple-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">
                {state.winner === 'human' ? 'You win!' : 'AI wins!'}
              </span>
            </div>
            <button
              onClick={resetGame}
              className="block w-full mt-2 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
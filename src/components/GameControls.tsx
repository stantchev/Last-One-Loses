import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const GameControls: React.FC = () => {
  const { state, removeLines, resetGame } = useGame();
  const [selectedRow, setSelectedRow] = useState(0);
  const [linesToRemove, setLinesToRemove] = useState(1);
  
  // Reset lines to remove when selected row changes or when there's a game reset
  useEffect(() => {
    setLinesToRemove(1);
  }, [selectedRow, state.gameOver]);
  
  const maxLinesToRemove = state.rows[selectedRow] || 0;
  
  const handleIncrement = () => {
    if (linesToRemove < maxLinesToRemove) {
      setLinesToRemove(prev => prev + 1);
    }
  };
  
  const handleDecrement = () => {
    if (linesToRemove > 1) {
      setLinesToRemove(prev => prev - 1);
    }
  };
  
  const handleRemoveLines = () => {
    removeLines(linesToRemove, selectedRow);
  };
  
  const isDisabled = state.currentPlayer !== 'human' || state.gameOver || maxLinesToRemove === 0;
  
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`flex-1 ${isDisabled ? 'opacity-50' : ''}`}>
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">Select row:</p>
            <div className="flex gap-2">
              {state.rows.map((count, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  disabled={isDisabled || count === 0}
                  className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                    selectedRow === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-800 bg-opacity-30 hover:bg-purple-700'
                  } ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Row {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-2">Lines to remove:</p>
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              disabled={isDisabled || linesToRemove <= 1}
              className="bg-purple-700 hover:bg-purple-600 disabled:hover:bg-purple-700 text-white p-2 rounded-l-md transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="bg-purple-800 text-white py-2 px-4 font-medium">
              {linesToRemove}
            </div>
            <button
              onClick={handleIncrement}
              disabled={isDisabled || linesToRemove >= maxLinesToRemove}
              className="bg-purple-700 hover:bg-purple-600 disabled:hover:bg-purple-700 text-white p-2 rounded-r-md transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={handleRemoveLines}
            disabled={isDisabled}
            className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:hover:bg-teal-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Remove {linesToRemove} line{linesToRemove !== 1 ? 's' : ''}
          </motion.button>
          
          <motion.button
            onClick={resetGame}
            className="bg-purple-700 hover:bg-purple-600 text-white p-2 rounded-md transition-colors"
            whileTap={{ scale: 0.95 }}
            title="Reset Game"
          >
            <RotateCcw className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;

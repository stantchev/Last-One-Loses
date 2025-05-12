import React from 'react';
import { useGame } from '../context/GameContext';
import { Brain, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameStatus: React.FC = () => {
  const { state } = useGame();
  
  return (
    <div className="w-full bg-opacity-20 bg-black backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {state.currentPlayer === 'human' ? (
              <motion.div 
                initial={{ scale: 0.8, opacity:.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center"
              >
                <User className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="font-medium">Your Turn</span>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: .8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center"
              >
                <Brain className="h-5 w-5 mr-2 text-teal-400" />
                <span className="font-medium">AI's Turn</span>
              </motion.div>
            )}
          </div>
          
          <div className="text-sm px-2 py-1 bg-opacity-40 bg-purple-800 rounded-md">
            Active: Row {state.activeRowIndex + 1}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-300"
          >
            {state.message}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameStatus;
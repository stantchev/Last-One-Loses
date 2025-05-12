import React from 'react';
import { motion } from 'framer-motion';

interface LineRowProps {
  rowIndex: number;
  lineCount: number;
  isActive: boolean;
  isCompleted: boolean;
}

const LineRow: React.FC<LineRowProps> = ({ 
  rowIndex, 
  lineCount, 
  isActive,
  isCompleted
}) => {
  // Calculate the max lines for this row based on the original game setup
  const maxLines = rowIndex === 0 ? 3 : rowIndex === 1 ? 5 : 7;
  
  return (
    <motion.div
      className={`p-4 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-opacity-40 bg-teal-900 border-2 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]' 
          : isCompleted 
            ? 'bg-opacity-10 bg-gray-700 border-2 border-gray-700' 
            : 'bg-opacity-20 bg-gray-800 border-2 border-transparent'
      }`}
      animate={{
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <div className="text-sm font-semibold text-gray-300 mr-2">Row {rowIndex + 1}:</div>
        {isActive && (
          <div className="text-xs bg-teal-400 text-teal-900 px-2 py-0.5 rounded-full font-medium">
            Active
          </div>
        )}
        {isCompleted && (
          <div className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full font-medium">
            Completed
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 items-center">
        {Array.from({ length: maxLines }).map((_, index) => {
          const isPresent = index < lineCount;
          
          return (
            <motion.div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                isPresent 
                  ? isActive 
                    ? 'bg-yellow-400' 
                    : 'bg-gray-400' 
                  : 'bg-gray-700 opacity-20'
              }`}
              initial={false}
              animate={isPresent ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default LineRow;
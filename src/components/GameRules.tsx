import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export const GameRules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-opacity-20 bg-black backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-opacity-30 bg-purple-800 hover:bg-opacity-40 transition-colors"
      >
        <div className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-teal-400" />
          <h2 className="text-lg font-semibold">Game Rules</h2>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-teal-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-teal-400" />
        )}
      </button>
      <div
        className={`px-4 py-3 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-yellow-400">Setup:</h3>
            <ul className="list-disc list-inside ml-2 text-sm text-gray-200">
              <li>Row 1: 3 lines (top)</li>
              <li>Row 2: 5 lines (middle)</li>
              <li>Row 3: 7 lines (bottom)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-yellow-400">Rules:</h3>
            <ul className="list-disc list-inside ml-2 text-sm text-gray-200">
              <li>Players alternate turns</li>
              <li>On your turn, remove any number of lines from any single row</li>
              <li>You cannot remove lines from multiple rows in a single turn</li>
              <li>The player forced to remove the final line LOSES</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

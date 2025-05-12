import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const GameHeader: React.FC = () => {
  return (
    <header className="bg-opacity-30 bg-black backdrop-blur-md py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <Gamepad2 className="h-8 w-8 text-yellow-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Last Line <span className="text-yellow-400">Loses</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
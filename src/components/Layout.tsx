import React, { ReactNode } from 'react';
import { GameRules } from './GameRules';
import { GameHeader } from './GameHeader';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex flex-col">
      <GameHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <GameRules />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
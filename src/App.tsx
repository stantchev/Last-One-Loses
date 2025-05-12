import React from 'react';
import GameBoard from './components/GameBoard';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';

function App() {
  return (
    <GameProvider>
      <Layout>
        <GameBoard />
      </Layout>
    </GameProvider>
  );
}

export default App;
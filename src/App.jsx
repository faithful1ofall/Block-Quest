import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Home from './pages/Home';
import Game from './pages/Game';
import MintModal from './components/MintModal';
import { mintQuestPass } from './utils/stacks';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMintPassModal, setShowMintPassModal] = useState(false);
  const { walletAddress, mintQuestPass: saveQuestPass } = useGame();

  const handleStartGame = () => {
    setCurrentPage('game');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
  };

  const handleMintPass = () => {
    setShowMintPassModal(true);
  };

  const handleConfirmMintPass = async () => {
    try {
      const result = await mintQuestPass();
      if (result.success) {
        saveQuestPass();
      }
    } catch (error) {
      console.error('Error minting Quest Pass:', error);
    }
  };

  return (
    <>
      {currentPage === 'home' ? (
        <Home onStartGame={handleStartGame} onMintPass={handleMintPass} />
      ) : (
        <Game onBackHome={handleBackHome} />
      )}

      <MintModal
        isOpen={showMintPassModal}
        onClose={() => setShowMintPassModal(false)}
        type="pass"
        onConfirm={handleConfirmMintPass}
      />
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;

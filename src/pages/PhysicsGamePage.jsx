import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaRedo, FaTrophy } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi';
import PhysicsGame from '../components/PhysicsGame';
import Inventory from '../components/Inventory';
import LevelUpModal from '../components/LevelUpModal';
import MintModal from '../components/MintModal';
import WalletConnect from '../components/WalletConnect';
import { useGame } from '../context/GameContext';
import { mintQuestBadge } from '../utils/stacks';

const PhysicsGamePage = ({ onBackHome }) => {
  const { level, xp, coins, crystals, resetGame, walletAddress, mintQuestBadge: saveBadge } = useGame();
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(1);
  const [levelScore, setLevelScore] = useState(0);

  const handleLevelComplete = (score) => {
    setLevelScore(score);
    setShowVictoryModal(true);
    
    // Check if level up
    const newXp = xp + score;
    const xpNeeded = level * 500;
    
    if (newXp >= xpNeeded) {
      setTimeout(() => {
        setLevelUpLevel(level + 1);
        setShowLevelUpModal(true);
      }, 2000);
    }
  };

  const handleGameOver = () => {
    setShowGameOverModal(true);
  };

  const handleMintBadge = () => {
    setShowMintModal(true);
  };

  const handleConfirmMint = async () => {
    try {
      const result = await mintQuestBadge(level);
      if (result.success) {
        saveBadge(level);
      }
    } catch (error) {
      console.error('Error minting Quest Badge:', error);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetGame();
    }
  };

  const handleNextLevel = () => {
    setShowVictoryModal(false);
    // Reload game with next level
    window.location.reload();
  };

  const handleRetry = () => {
    setShowGameOverModal(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-game-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-game-blue/10 border-2 border-game-yellow rounded-lg p-4 mb-4">
          <motion.h1
            className="font-pixel text-2xl md:text-3xl text-game-yellow"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧱 BLOCK QUEST
          </motion.h1>

          <div className="flex items-center gap-3">
            <WalletConnect />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-pixel text-xs hover:bg-orange-700 transition-all flex items-center gap-2"
            >
              <FaRedo />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackHome}
              className="bg-game-blue text-white px-4 py-2 rounded-lg font-pixel text-xs hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <FaHome />
              Home
            </motion.button>
          </div>
        </div>

        {/* Game Instructions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-game-blue/10 border-2 border-game-yellow rounded-lg p-4 mb-4"
        >
          <p className="font-retro text-center text-white">
            🎯 <strong>Drag and release</strong> the slingshot to launch projectiles! 
            💥 Destroy blocks to earn points and level up! 
            🏆 Mint NFTs to commemorate your achievements!
          </p>
        </motion.div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Canvas - Takes 3 columns */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-game-blue/10 border-2 border-game-yellow rounded-lg overflow-hidden"
            >
              <PhysicsGame 
                onLevelComplete={handleLevelComplete}
                onGameOver={handleGameOver}
              />
            </motion.div>
          </div>

          {/* Inventory - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center lg:justify-start"
          >
            <Inventory onMintBadge={handleMintBadge} />
          </motion.div>
        </div>
      </div>

      {/* Victory Modal */}
      <AnimatePresence>
        {showVictoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="bg-gradient-to-br from-game-dark to-green-900 border-4 border-game-yellow rounded-lg p-8 max-w-md w-full text-center"
            >
              <GiTrophy className="text-8xl text-game-yellow mx-auto mb-4" />
              <h2 className="font-pixel text-3xl text-game-yellow mb-4">LEVEL COMPLETE!</h2>
              <p className="font-retro text-2xl text-white mb-2">Score: {levelScore}</p>
              <p className="font-retro text-lg text-gray-300 mb-6">
                Amazing work! Ready for the next challenge?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBackHome}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:bg-gray-700 transition-all"
                >
                  Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextLevel}
                  className="flex-1 bg-game-yellow text-game-dark px-6 py-3 rounded-lg font-pixel text-xs hover:box-shadow-neon transition-all"
                >
                  Next Level
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showGameOverModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-gradient-to-br from-game-dark to-red-900 border-4 border-red-600 rounded-lg p-8 max-w-md w-full text-center"
            >
              <h2 className="font-pixel text-3xl text-red-500 mb-4">GAME OVER</h2>
              <p className="font-retro text-lg text-gray-300 mb-6">
                Out of shots! Try again?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBackHome}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:bg-gray-700 transition-all"
                >
                  Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="flex-1 bg-game-yellow text-game-dark px-6 py-3 rounded-lg font-pixel text-xs hover:box-shadow-neon transition-all"
                >
                  Retry
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={showLevelUpModal}
        level={levelUpLevel}
        onClose={() => setShowLevelUpModal(false)}
        onMintBadge={handleMintBadge}
      />

      {/* Mint Modal */}
      <MintModal
        isOpen={showMintModal}
        onClose={() => setShowMintModal(false)}
        type="badge"
        level={level}
        onConfirm={handleConfirmMint}
      />
    </div>
  );
};

export default PhysicsGamePage;

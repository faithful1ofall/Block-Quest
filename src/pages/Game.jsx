import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaRedo } from 'react-icons/fa';
import GameGrid from '../components/GameGrid';
import Inventory from '../components/Inventory';
import LevelUpModal from '../components/LevelUpModal';
import MintModal from '../components/MintModal';
import WalletConnect from '../components/WalletConnect';
import { useGame } from '../context/GameContext';
import { mintQuestBadge } from '../utils/stacks';

const Game = ({ onBackHome }) => {
  const { level, resetGame, walletAddress, mintQuestBadge: saveBadge } = useGame();
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(1);

  const handleLevelUp = (newLevel) => {
    setLevelUpLevel(newLevel);
    setShowLevelUpModal(true);
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

  return (
    <div className="min-h-screen bg-game-dark p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-game-blue/10 border-2 border-game-yellow rounded-lg p-4">
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
      </div>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Grid - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-game-blue/10 border-2 border-game-yellow rounded-lg p-4"
            >
              <h2 className="font-pixel text-xl text-game-yellow mb-4 text-center">
                Mining Grid
              </h2>
              <GameGrid onLevelUp={handleLevelUp} />
              <p className="font-retro text-center text-gray-400 mt-4">
                Click blocks to mine treasures! 💰 Coins • 💎 Crystals • 💀 Traps
              </p>
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

      {/* Modals */}
      <LevelUpModal
        isOpen={showLevelUpModal}
        level={levelUpLevel}
        onClose={() => setShowLevelUpModal(false)}
        onMintBadge={handleMintBadge}
      />

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

export default Game;

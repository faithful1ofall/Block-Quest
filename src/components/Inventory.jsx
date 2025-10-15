import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaBomb, FaTrophy } from 'react-icons/fa';
import { GiCrystalShine, GiLevelFour } from 'react-icons/gi';
import { useGame } from '../context/GameContext';

const Inventory = ({ onMintBadge }) => {
  const { coins, crystals, traps, level, xp, questBadges } = useGame();

  const xpNeeded = level * 500;
  const xpProgress = (xp / xpNeeded) * 100;

  return (
    <div className="bg-game-blue/10 border-2 border-game-yellow rounded-lg p-6 w-full max-w-md">
      <h2 className="font-pixel text-xl text-game-yellow mb-6 text-center">Inventory</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 flex items-center gap-3"
        >
          <FaCoins className="text-yellow-400 text-3xl" />
          <div>
            <p className="font-retro text-gray-300 text-sm">Coins</p>
            <p className="font-pixel text-xl text-white">{coins}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 flex items-center gap-3"
        >
          <GiCrystalShine className="text-blue-400 text-3xl" />
          <div>
            <p className="font-retro text-gray-300 text-sm">Crystals</p>
            <p className="font-pixel text-xl text-white">{crystals}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-red-900/30 border border-red-600 rounded-lg p-4 flex items-center gap-3"
        >
          <FaBomb className="text-red-400 text-3xl" />
          <div>
            <p className="font-retro text-gray-300 text-sm">Traps</p>
            <p className="font-pixel text-xl text-white">{traps}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-900/30 border border-purple-600 rounded-lg p-4 flex items-center gap-3"
        >
          <GiLevelFour className="text-purple-400 text-3xl" />
          <div>
            <p className="font-retro text-gray-300 text-sm">Level</p>
            <p className="font-pixel text-xl text-white">{level}</p>
          </div>
        </motion.div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-retro text-sm text-gray-300">XP Progress</span>
          <span className="font-retro text-sm text-game-yellow">
            {xp} / {xpNeeded}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border border-game-yellow/50">
          <motion.div
            className="bg-gradient-to-r from-game-yellow to-yellow-600 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Quest Badges */}
      {questBadges.length > 0 && (
        <div className="mb-4">
          <h3 className="font-pixel text-sm text-game-yellow mb-3 flex items-center gap-2">
            <FaTrophy className="text-yellow-400" />
            Quest Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {questBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-br from-yellow-600 to-orange-600 border-2 border-yellow-400 rounded-lg px-3 py-2"
              >
                <span className="font-pixel text-xs text-white">Lvl {badge.level}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Mint Badge Button */}
      {level > questBadges.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMintBadge}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:from-green-500 hover:to-green-600 transition-all border-2 border-green-400"
        >
          🏆 Mint Level {level} Badge
        </motion.button>
      )}
    </div>
  );
};

export default Inventory;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiLevelFour, GiTrophy } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

const LevelUpModal = ({ isOpen, level, onClose, onMintBadge }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-gradient-to-br from-game-dark to-purple-900 border-4 border-game-yellow rounded-lg p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            {/* Animated Background Stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
              >
                <FaStar className="text-game-yellow" />
              </motion.div>
            ))}

            {/* Content */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="relative z-10"
            >
              <GiLevelFour className="text-8xl text-game-yellow mx-auto mb-4" />
            </motion.div>

            <motion.h2
              className="font-pixel text-3xl text-game-yellow mb-2 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              LEVEL UP!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-retro text-2xl text-white mb-6 relative z-10"
            >
              You've reached Level {level}!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-game-blue/20 border border-game-yellow/50 rounded-lg p-4 mb-6 relative z-10"
            >
              <GiTrophy className="text-yellow-400 text-4xl mx-auto mb-2" />
              <p className="font-retro text-gray-300">
                Congratulations! You can now mint your Level {level} Quest Badge NFT to commemorate this achievement!
              </p>
            </motion.div>

            <div className="flex gap-4 relative z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:bg-gray-700 transition-all"
              >
                Continue
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onClose();
                  onMintBadge();
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:from-green-500 hover:to-green-600 transition-all border-2 border-green-400"
              >
                Mint Badge
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpModal;

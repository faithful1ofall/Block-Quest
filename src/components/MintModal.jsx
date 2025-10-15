import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { GiTreasureMap, GiTrophy } from 'react-icons/gi';

const MintModal = ({ isOpen, onClose, type, level, onConfirm }) => {
  const [minting, setMinting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMint = async () => {
    setMinting(true);
    await onConfirm();
    setMinting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  const isQuestPass = type === 'pass';
  const title = isQuestPass ? 'Mint Quest Pass' : `Mint Quest Badge Level ${level}`;
  const description = isQuestPass
    ? 'Your Quest Pass NFT grants you access to the Block Quest adventure. This is your proof of participation on the blockchain!'
    : `Congratulations on reaching Level ${level}! Mint your Quest Badge NFT to commemorate this achievement on the blockchain.`;
  const icon = isQuestPass ? <GiTreasureMap className="text-6xl" /> : <GiTrophy className="text-6xl" />;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-game-dark border-4 border-game-yellow rounded-lg p-8 max-w-md w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Content */}
            <div className="text-center">
              {success ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    ✅
                  </motion.div>
                  <h2 className="font-pixel text-2xl mt-4">Success!</h2>
                  <p className="font-retro text-lg mt-2">NFT Minted Successfully</p>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-game-yellow mb-4 flex justify-center"
                  >
                    {icon}
                  </motion.div>

                  <h2 className="font-pixel text-2xl text-game-yellow mb-4">{title}</h2>
                  <p className="font-retro text-gray-300 mb-6">{description}</p>

                  <div className="bg-game-blue/20 border border-game-yellow/50 rounded-lg p-4 mb-6">
                    <p className="font-retro text-sm text-gray-400 mb-2">NFT Details:</p>
                    <ul className="font-retro text-sm text-white space-y-1 text-left">
                      <li>• Type: {isQuestPass ? 'Quest Pass' : 'Quest Badge'}</li>
                      {!isQuestPass && <li>• Level: {level}</li>}
                      <li>• Network: Stacks Testnet</li>
                      <li>• Gas Fee: ~0.001 STX</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      disabled={minting}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-pixel text-xs hover:bg-gray-700 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMint}
                      disabled={minting}
                      className="flex-1 bg-game-yellow text-game-dark px-6 py-3 rounded-lg font-pixel text-xs hover:box-shadow-neon transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {minting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Minting...
                        </>
                      ) : (
                        'Mint NFT'
                      )}
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MintModal;

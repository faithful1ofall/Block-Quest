import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaCoins } from 'react-icons/fa';
import { GiCrystalShine, GiTreasureMap } from 'react-icons/gi';
import WalletConnect from '../components/WalletConnect';
import { useGame } from '../context/GameContext';

const Home = ({ onStartGame, onMintPass }) => {
  const { walletConnected, questPassMinted } = useGame();

  return (
    <div className="min-h-screen bg-game-dark flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Logo/Title */}
        <motion.h1
          className="font-pixel text-4xl md:text-6xl text-game-yellow text-shadow-glow mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧱 BLOCK QUEST
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-retro text-xl text-white mb-8 max-w-2xl"
        >
          A blockchain mining adventure on Stacks (Bitcoin Layer 2)
        </motion.p>

        {/* Wallet Connect */}
        <div className="mb-12 flex justify-center">
          <WalletConnect />
        </div>

        {/* Game Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-game-blue/10 border-2 border-game-yellow rounded-lg p-8 mb-8 max-w-3xl"
        >
          <h2 className="font-pixel text-2xl text-game-yellow mb-6">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <FaCoins className="text-game-yellow text-3xl mt-1" />
              <div>
                <h3 className="font-pixel text-sm text-white mb-2">Physics Shooting</h3>
                <p className="font-retro text-gray-300">Drag and release to launch projectiles! Destroy blocks with realistic physics like Angry Birds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GiCrystalShine className="text-blue-400 text-3xl mt-1" />
              <div>
                <h3 className="font-pixel text-sm text-white mb-2">Level Up</h3>
                <p className="font-retro text-gray-300">Earn XP from mining. Every 500 XP = Level Up!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GiTreasureMap className="text-green-400 text-3xl mt-1" />
              <div>
                <h3 className="font-pixel text-sm text-white mb-2">Mint NFTs</h3>
                <p className="font-retro text-gray-300">Get Quest Pass to start, then mint Quest Badges as you level up</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaGamepad className="text-purple-400 text-3xl mt-1" />
              <div>
                <h3 className="font-pixel text-sm text-white mb-2">Compete</h3>
                <p className="font-retro text-gray-300">Climb the leaderboard and prove you're the ultimate miner!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('physics')}
            disabled={!walletConnected}
            className={`flex items-center gap-3 px-8 py-4 rounded-lg font-pixel text-lg transition-all ${
              walletConnected
                ? 'bg-game-yellow text-game-dark hover:box-shadow-neon cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaGamepad />
            Play Physics Mode
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('classic')}
            disabled={!walletConnected}
            className={`flex items-center gap-3 px-8 py-4 rounded-lg font-pixel text-sm transition-all ${
              walletConnected
                ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaGamepad />
            Classic Mode
          </motion.button>

          {walletConnected && !questPassMinted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMintPass}
              className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg font-pixel text-lg hover:bg-green-700 transition-all"
            >
              <GiTreasureMap />
              Mint Quest Pass
            </motion.button>
          )}
        </div>

        {!walletConnected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-retro text-gray-400 mt-6"
          >
            ⚠️ Connect your wallet to start playing
          </motion.p>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-center font-retro text-gray-500"
      >
        Built on Stacks • Powered by Bitcoin
      </motion.footer>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCoins } from 'react-icons/fa';
import WordGame from '../components/WordGame';
import { useGame } from '../context/GameContext';
import { depositAndPlay, resolveGame, claimReward } from '../utils/stacks';

const WordGamePage = ({ onBackHome }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [depositAmount, setDepositAmount] = useState(10);
  const [gameResult, setGameResult] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [txStatus, setTxStatus] = useState('');
  const { walletAddress } = useGame();

  const handleStartGame = () => {
    setGameStarted(true);
    setGameResult(null);
  };

  const handleGameEnd = async (status, multiplier) => {
    setGameResult({ status, multiplier, reward: depositAmount * multiplier });
    
    // DEMO MODE: Auto-resolve without blockchain
    if (currentGameId !== null && status === 'won') {
      setTxStatus('Demo mode: Game resolved! (No blockchain transaction)');
    }
  };

  const handleDeposit = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setIsDepositing(true);
    setTxStatus('Starting game in demo mode...');

    try {
      // DEMO MODE: Contract not yet deployed
      // Simulating deposit without actual blockchain transaction
      
      // In production, this would be:
      // const amountInMicroSTX = depositAmount * 1000000;
      // const result = await depositAndPlay(amountInMicroSTX);
      
      // For now, simulate successful deposit
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTxStatus('Demo mode: Game starting...');
      setCurrentGameId(Date.now()); // Temporary game ID
      
      setTimeout(() => {
        handleStartGame();
        setTxStatus('');
      }, 500);
      
    } catch (error) {
      console.error('Error starting game:', error);
      setTxStatus('Failed to start game. Please try again.');
      setTimeout(() => setTxStatus(''), 3000);
    } finally {
      setIsDepositing(false);
    }
  };

  const handleClaimReward = async () => {
    if (!currentGameId) return;

    setIsClaiming(true);
    setTxStatus('Demo mode: Simulating reward claim...');

    try {
      // DEMO MODE: Simulate claim without blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTxStatus('Demo mode: Reward claimed! (No actual STX transferred)');
      setTimeout(() => {
        setTxStatus('');
        setGameStarted(false);
        setGameResult(null);
        setCurrentGameId(null);
      }, 2000);
      
    } catch (error) {
      console.error('Error claiming reward:', error);
      setTxStatus('Claim failed. Please try again.');
      setTimeout(() => setTxStatus(''), 3000);
    } finally {
      setIsClaiming(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-game-dark flex flex-col items-center justify-center p-8">
        {/* Back Button */}
        <button
          onClick={onBackHome}
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-game-yellow transition-colors font-retro"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        {/* Demo Mode Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-blue-600/20 border-2 border-blue-500 rounded-lg px-4 py-2"
        >
          <p className="font-pixel text-blue-300 text-sm">🎮 DEMO MODE</p>
          <p className="font-retro text-blue-400 text-xs">No real STX transactions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          {/* Title */}
          <h1 className="font-pixel text-4xl text-game-yellow text-center mb-4">
            Word Quest
          </h1>
          
          {/* Demo Notice */}
          <div className="bg-blue-600/10 border border-blue-500 rounded-lg p-4 mb-6 text-center">
            <p className="font-pixel text-blue-300 text-sm mb-1">⚠️ Demo Mode Active</p>
            <p className="font-retro text-blue-400 text-xs">
              Smart contract not yet deployed. Play for free without real STX transactions.
            </p>
          </div>

          {/* Game Info */}
          <div className="bg-game-blue/10 border-2 border-game-yellow rounded-lg p-8 mb-8">
            <h2 className="font-pixel text-2xl text-white mb-4">How to Play</h2>
            <ul className="font-retro text-gray-300 space-y-3">
              <li>• Guess the 5-letter word in 6 attempts</li>
              <li>• Green = correct letter in correct position</li>
              <li>• Yellow = correct letter in wrong position</li>
              <li>• Gray = letter not in word</li>
              <li>• Your multiplier decreases with each wrong guess</li>
              <li>• Win faster for bigger rewards!</li>
            </ul>
          </div>

          {/* Multiplier Table */}
          <div className="bg-gray-800/50 border-2 border-gray-700 rounded-lg p-6 mb-8">
            <h3 className="font-pixel text-xl text-game-yellow mb-4 text-center">
              Reward Multipliers
            </h3>
            <div className="grid grid-cols-3 gap-4 font-retro text-center">
              <div>
                <div className="text-green-400 text-2xl font-pixel">5x</div>
                <div className="text-gray-400 text-sm">1 attempt</div>
              </div>
              <div>
                <div className="text-green-400 text-2xl font-pixel">4x</div>
                <div className="text-gray-400 text-sm">2 attempts</div>
              </div>
              <div>
                <div className="text-yellow-400 text-2xl font-pixel">3x</div>
                <div className="text-gray-400 text-sm">3 attempts</div>
              </div>
              <div>
                <div className="text-yellow-400 text-2xl font-pixel">2x</div>
                <div className="text-gray-400 text-sm">4 attempts</div>
              </div>
              <div>
                <div className="text-orange-400 text-2xl font-pixel">1x</div>
                <div className="text-gray-400 text-sm">5 attempts</div>
              </div>
              <div>
                <div className="text-orange-400 text-2xl font-pixel">1x</div>
                <div className="text-gray-400 text-sm">6 attempts</div>
              </div>
            </div>
          </div>

          {/* Deposit Section */}
          <div className="bg-gray-800/50 border-2 border-game-yellow rounded-lg p-6 mb-6">
            <h3 className="font-pixel text-xl text-white mb-4 flex items-center gap-2">
              <FaCoins className="text-game-yellow" />
              Stake Amount
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg font-retro text-lg border-2 border-gray-600 focus:border-game-yellow outline-none"
              />
              <span className="font-pixel text-white text-lg">STX</span>
            </div>
            <div className="font-retro text-gray-400 text-sm">
              Potential reward: {depositAmount} - {depositAmount * 5} STX
            </div>
          </div>

          {/* Transaction Status */}
          {txStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-600/20 border-2 border-blue-500 rounded-lg p-4 mb-4 text-center"
            >
              <p className="font-retro text-blue-300">{txStatus}</p>
            </motion.div>
          )}

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeposit}
            disabled={!walletAddress || isDepositing}
            className={`w-full py-4 rounded-lg font-pixel text-xl transition-all ${
              walletAddress && !isDepositing
                ? 'bg-game-yellow text-game-dark hover:shadow-lg hover:shadow-game-yellow/50'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isDepositing ? 'Starting...' : walletAddress ? 'Start Game (Demo)' : 'Connect Wallet First'}
          </motion.button>
          
          <p className="text-center font-retro text-gray-500 text-xs mt-2">
            * Demo mode: No actual deposit required
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Back Button */}
      <button
        onClick={onBackHome}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white hover:text-game-yellow transition-colors font-retro"
      >
        <FaArrowLeft />
        Back to Home
      </button>

      {/* Game */}
      <WordGame onGameEnd={handleGameEnd} onDeposit={handleDeposit} />

      {/* Result Modal */}
      {gameResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 border-4 border-game-yellow rounded-lg p-8 max-w-md"
          >
            <h2 className="font-pixel text-3xl text-center mb-6">
              {gameResult.status === 'won' ? (
                <span className="text-green-400">You Won! 🎉</span>
              ) : (
                <span className="text-red-400">Game Over</span>
              )}
            </h2>
            
            {gameResult.status === 'won' && (
              <div className="text-center mb-6">
                <div className="font-pixel text-5xl text-game-yellow mb-2">
                  {gameResult.multiplier}x
                </div>
                <div className="font-retro text-gray-300 mb-4">
                  Reward: {gameResult.reward} STX
                </div>
                {txStatus && (
                  <div className="bg-blue-600/20 border border-blue-500 rounded p-3 mb-4">
                    <p className="font-retro text-sm text-blue-300">{txStatus}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              {gameResult.status === 'won' && (
                <button
                  onClick={handleClaimReward}
                  disabled={isClaiming}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-pixel hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isClaiming ? 'Claiming...' : 'Claim Reward'}
                </button>
              )}
              <button
                onClick={() => {
                  setGameStarted(false);
                  setGameResult(null);
                  setCurrentGameId(null);
                  setTxStatus('');
                }}
                className="flex-1 bg-game-yellow text-game-dark py-3 rounded-lg font-pixel hover:scale-105 transition-transform"
              >
                Play Again
              </button>
              <button
                onClick={onBackHome}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-pixel hover:bg-gray-600 transition-colors"
              >
                Home
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WordGamePage;

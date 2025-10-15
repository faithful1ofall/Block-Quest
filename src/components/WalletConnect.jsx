import React from 'react';
import { motion } from 'framer-motion';
import { FaWallet } from 'react-icons/fa';
import { useGame } from '../context/GameContext';
import { connectWallet, disconnectWallet, isWalletConnected, getWalletAddress } from '../utils/stacks';

const WalletConnect = () => {
  const { walletConnected, walletAddress, connectWallet: setWallet, disconnectWallet: clearWallet } = useGame();

  React.useEffect(() => {
    if (isWalletConnected()) {
      const address = getWalletAddress();
      if (address) {
        setWallet(address);
      }
    }
  }, []);

  const handleConnect = () => {
    connectWallet(
      (address) => {
        setWallet(address);
      },
      () => {
        console.log('Wallet connection cancelled');
      }
    );
  };

  const handleDisconnect = () => {
    disconnectWallet();
    clearWallet();
  };

  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {!walletConnected ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnect}
          className="flex items-center gap-2 bg-game-yellow text-game-dark px-6 py-3 rounded-lg font-pixel text-xs hover:box-shadow-neon transition-all"
        >
          <FaWallet />
          Connect Wallet
        </motion.button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="bg-game-blue/20 border-2 border-game-yellow px-4 py-2 rounded-lg">
            <span className="font-retro text-sm">{truncateAddress(walletAddress)}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDisconnect}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-pixel text-xs hover:bg-red-700 transition-all"
          >
            Disconnect
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [coins, setCoins] = useState(0);
  const [crystals, setCrystals] = useState(0);
  const [traps, setTraps] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [minedBlocks, setMinedBlocks] = useState([]);
  const [questPassMinted, setQuestPassMinted] = useState(false);
  const [questBadges, setQuestBadges] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('blockQuestData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setCoins(data.coins || 0);
      setCrystals(data.crystals || 0);
      setTraps(data.traps || 0);
      setLevel(data.level || 1);
      setXp(data.xp || 0);
      setMinedBlocks(data.minedBlocks || []);
      setQuestPassMinted(data.questPassMinted || false);
      setQuestBadges(data.questBadges || []);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = {
      coins,
      crystals,
      traps,
      level,
      xp,
      minedBlocks,
      questPassMinted,
      questBadges,
    };
    localStorage.setItem('blockQuestData', JSON.stringify(data));
  }, [coins, crystals, traps, level, xp, minedBlocks, questPassMinted, questBadges]);

  const mineBlock = (blockId) => {
    if (minedBlocks.includes(blockId)) return null;

    const roll = Math.random();
    let result;
    let xpGain = 0;

    if (roll < 0.6) {
      result = 'coin';
      setCoins(prev => prev + 10);
      xpGain = 10;
    } else if (roll < 0.8) {
      result = 'crystal';
      setCrystals(prev => prev + 1);
      xpGain = 50;
    } else if (roll < 0.95) {
      result = 'empty';
      xpGain = 5;
    } else {
      result = 'trap';
      setTraps(prev => prev + 1);
      xpGain = -20;
    }

    setMinedBlocks(prev => [...prev, blockId]);
    
    const newXp = Math.max(0, xp + xpGain);
    setXp(newXp);

    // Level up logic
    const xpNeeded = level * 500;
    if (newXp >= xpNeeded) {
      setLevel(prev => prev + 1);
      setXp(0);
      return { result, levelUp: true, newLevel: level + 1 };
    }

    return { result, levelUp: false };
  };

  const resetGame = () => {
    setCoins(0);
    setCrystals(0);
    setTraps(0);
    setLevel(1);
    setXp(0);
    setMinedBlocks([]);
    localStorage.removeItem('blockQuestData');
  };

  const connectWallet = (address) => {
    setWalletConnected(true);
    setWalletAddress(address);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  const mintQuestPass = () => {
    setQuestPassMinted(true);
  };

  const mintQuestBadge = (level) => {
    setQuestBadges(prev => [...prev, { level, timestamp: Date.now() }]);
  };

  const value = {
    walletConnected,
    walletAddress,
    coins,
    crystals,
    traps,
    level,
    xp,
    minedBlocks,
    questPassMinted,
    questBadges,
    mineBlock,
    resetGame,
    connectWallet,
    disconnectWallet,
    mintQuestPass,
    mintQuestBadge,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

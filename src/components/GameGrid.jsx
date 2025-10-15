import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoins, FaBomb } from 'react-icons/fa';
import { GiCrystalShine } from 'react-icons/gi';
import { useGame } from '../context/GameContext';

const GameGrid = ({ onLevelUp }) => {
  const { mineBlock, minedBlocks } = useGame();
  const [animatingBlock, setAnimatingBlock] = useState(null);
  const [blockResults, setBlockResults] = useState({});

  const gridSize = 10;
  const blocks = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  const handleBlockClick = (blockId) => {
    if (minedBlocks.includes(blockId)) return;

    const result = mineBlock(blockId);
    if (!result) return;

    setAnimatingBlock(blockId);
    setBlockResults(prev => ({ ...prev, [blockId]: result.result }));

    setTimeout(() => {
      setAnimatingBlock(null);
      if (result.levelUp) {
        onLevelUp(result.newLevel);
      }
    }, 800);
  };

  const getBlockIcon = (blockId) => {
    const result = blockResults[blockId];
    if (!result) return '?';

    switch (result) {
      case 'coin':
        return <FaCoins className="text-yellow-400 text-2xl" />;
      case 'crystal':
        return <GiCrystalShine className="text-blue-400 text-2xl" />;
      case 'trap':
        return <FaBomb className="text-red-500 text-2xl" />;
      case 'empty':
        return <span className="text-gray-500 text-2xl">∅</span>;
      default:
        return '?';
    }
  };

  const getBlockColor = (blockId) => {
    if (!minedBlocks.includes(blockId)) {
      return 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700';
    }

    const result = blockResults[blockId];
    switch (result) {
      case 'coin':
        return 'bg-gradient-to-br from-yellow-600 to-yellow-800';
      case 'crystal':
        return 'bg-gradient-to-br from-blue-600 to-blue-800';
      case 'trap':
        return 'bg-gradient-to-br from-red-600 to-red-800';
      case 'empty':
        return 'bg-gradient-to-br from-gray-600 to-gray-800';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-10 gap-1 md:gap-2 max-w-4xl">
        {blocks.map((blockId) => {
          const isMined = minedBlocks.includes(blockId);
          const isAnimating = animatingBlock === blockId;

          return (
            <motion.button
              key={blockId}
              onClick={() => handleBlockClick(blockId)}
              disabled={isMined}
              className={`
                w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16
                rounded-lg border-2 border-game-yellow/30
                flex items-center justify-center
                transition-all duration-300
                ${getBlockColor(blockId)}
                ${!isMined ? 'cursor-pointer hover:border-game-yellow' : 'cursor-not-allowed'}
                ${isAnimating ? 'border-game-yellow box-shadow-neon' : ''}
              `}
              whileHover={!isMined ? { scale: 1.1 } : {}}
              whileTap={!isMined ? { scale: 0.9 } : {}}
              animate={
                isAnimating
                  ? {
                      rotateY: [0, 180],
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {isMined ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getBlockIcon(blockId)}
                  </motion.div>
                ) : (
                  <motion.span
                    key="question"
                    className="text-game-yellow text-2xl md:text-3xl font-pixel"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;

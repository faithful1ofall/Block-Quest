import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Word list for the game (can be expanded)
const WORD_LIST = [
  'REACT', 'STACK', 'BLOCK', 'CHAIN', 'QUEST', 'PIXEL', 'FRAME', 'MOUNT',
  'LIGHT', 'SOUND', 'WORLD', 'POWER', 'MAGIC', 'STONE', 'FLAME', 'WATER',
  'EARTH', 'STORM', 'FROST', 'BLADE', 'SWORD', 'SHIELD', 'ARMOR', 'CROWN',
  'JEWEL', 'PEARL', 'AMBER', 'CORAL', 'IVORY', 'ONYX', 'TOPAZ', 'BERYL'
];

const VALID_WORDS = [...WORD_LIST, 'HELLO', 'WORLD', 'GAMES', 'PLAYS', 'WORDS'];

const WordGame = ({ onGameEnd, onDeposit }) => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [shakeRow, setShakeRow] = useState(-1);
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Select random word on mount
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
  }, []);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, currentGuess, guesses, targetWord]); // Include dependencies

  const getCellColor = (letter, index, guess) => {
    if (!guess) return 'bg-gray-700 border-gray-600';
    
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    
    // Exact match (green)
    if (guessLetters[index] === targetLetters[index]) {
      return 'bg-green-600 border-green-500';
    }
    
    // Letter exists but wrong position (yellow)
    if (targetLetters.includes(guessLetters[index])) {
      // Check if this letter hasn't been used in correct position
      const correctPositions = guessLetters.filter((l, i) => l === targetLetters[i]);
      const letterCount = targetLetters.filter(l => l === guessLetters[index]).length;
      const usedCount = guessLetters.slice(0, index).filter(l => l === guessLetters[index]).length;
      
      if (usedCount < letterCount) {
        return 'bg-yellow-600 border-yellow-500';
      }
    }
    
    // Wrong letter (gray)
    return 'bg-gray-800 border-gray-700';
  };

  const handleKeyPress = (key) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        showMessage('Not enough letters');
        return;
      }

      if (!VALID_WORDS.includes(currentGuess)) {
        showMessage('Not in word list');
        setShakeRow(guesses.length);
        setTimeout(() => setShakeRow(-1), 500);
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      // Check win condition
      if (currentGuess === targetWord) {
        setGameStatus('won');
        const multiplier = calculateMultiplier(newGuesses.length);
        showMessage(`You won! ${multiplier}x multiplier`);
        if (onGameEnd) {
          onGameEnd('won', multiplier);
        }
        return;
      }

      // Check lose condition
      if (newGuesses.length >= MAX_ATTEMPTS) {
        setGameStatus('lost');
        showMessage(`Game Over! Word was ${targetWord}`);
        if (onGameEnd) {
          onGameEnd('lost', 0);
        }
        return;
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const calculateMultiplier = (attempts) => {
    // 5x for 1 attempt, 4x for 2, etc., down to 1x for 5-6 attempts
    return Math.max(1, 6 - attempts);
  };

  const getMultiplierDisplay = () => {
    const currentAttempt = guesses.length + 1;
    return calculateMultiplier(currentAttempt);
  };

  const getUsedLetters = () => {
    const used = { correct: new Set(), present: new Set(), absent: new Set() };
    
    guesses.forEach(guess => {
      guess.split('').forEach((letter, index) => {
        if (targetWord[index] === letter) {
          used.correct.add(letter);
        } else if (targetWord.includes(letter)) {
          used.present.add(letter);
        } else {
          used.absent.add(letter);
        }
      });
    });
    
    return used;
  };

  const usedLetters = getUsedLetters();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-game-dark p-4">
      {/* Header */}
      <div className="w-full max-w-lg mb-6">
        <h1 className="font-pixel text-3xl text-game-yellow text-center mb-2">
          Word Quest
        </h1>
        <div className="flex justify-between items-center text-white font-retro mb-3">
          <div className="text-sm">
            Attempt: {guesses.length + 1}/{MAX_ATTEMPTS}
          </div>
          <div className="text-lg font-pixel text-game-yellow">
            {getMultiplierDisplay()}x Multiplier
          </div>
        </div>
        
        {/* Hint Section */}
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-pixel text-sm transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && targetWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-600/20 border-2 border-blue-500 rounded px-4 py-2"
            >
              <span className="font-pixel text-blue-300 text-sm">
                First letter: <span className="text-game-yellow text-lg">{targetWord[0]}</span>
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Message Display */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 bg-gray-800 text-white px-6 py-3 rounded-lg font-retro text-sm border-2 border-game-yellow"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="mb-8">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length;
          const displayWord = isCurrentRow ? currentGuess.padEnd(WORD_LENGTH, ' ') : (guess || '     ');
          
          return (
            <motion.div
              key={rowIndex}
              className={`flex gap-2 mb-2 ${shakeRow === rowIndex ? 'animate-shake' : ''}`}
              animate={shakeRow === rowIndex ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {displayWord.split('').map((letter, colIndex) => {
                const cellColor = guess ? getCellColor(letter, colIndex, guess) : 'bg-gray-700 border-gray-600';
                const hasLetter = letter.trim() !== '';
                
                return (
                  <motion.div
                    key={colIndex}
                    initial={guess && rowIndex === guesses.length - 1 ? { rotateX: 0 } : false}
                    animate={guess && rowIndex === guesses.length - 1 ? { rotateX: 360 } : {}}
                    transition={{ delay: colIndex * 0.1, duration: 0.5 }}
                    className={`
                      w-14 h-14 border-2 rounded flex items-center justify-center
                      font-pixel text-2xl text-white transition-all duration-300
                      ${cellColor}
                      ${isCurrentRow && hasLetter ? 'border-game-yellow scale-105' : ''}
                    `}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-2">
          {[
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map(key => {
                let keyColor = 'bg-gray-600 hover:bg-gray-500';
                
                if (usedLetters.correct.has(key)) {
                  keyColor = 'bg-green-600 hover:bg-green-500';
                } else if (usedLetters.present.has(key)) {
                  keyColor = 'bg-yellow-600 hover:bg-yellow-500';
                } else if (usedLetters.absent.has(key)) {
                  keyColor = 'bg-gray-800 hover:bg-gray-700';
                }
                
                const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleKeyPress(key)}
                    disabled={gameStatus !== 'playing'}
                    className={`
                      ${isSpecial ? 'px-3 text-xs' : 'w-9'} h-12
                      ${keyColor}
                      text-white font-pixel rounded
                      transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {key === 'BACKSPACE' ? '←' : key}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Support Info */}
      <div className="mt-4 text-gray-500 font-retro text-xs text-center">
        💻 PC Keyboard or 📱 Touch Keyboard supported
      </div>

      {/* Game Over Actions */}
      {gameStatus !== 'playing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 flex gap-4"
        >
          <button
            onClick={() => window.location.reload()}
            className="bg-game-yellow text-game-dark px-6 py-3 rounded-lg font-pixel hover:scale-105 transition-transform"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WordGame;

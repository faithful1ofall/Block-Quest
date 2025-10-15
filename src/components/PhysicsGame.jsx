import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const PhysicsGame = ({ onLevelComplete, onGameOver }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [shotsRemaining, setShotsRemaining] = useState(5);
  const [currentScore, setCurrentScore] = useState(0);
  const [blocksDestroyed, setBlocksDestroyed] = useState(0);
  const { level, coins, crystals, traps } = useGame();

  const SLINGSHOT_POS = { x: 150, y: 500 };
  const MAX_PULL = 150;

  useEffect(() => {
    // Create engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 1;

    // Create renderer
    const render = Matter.Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#0f172a',
      },
    });
    renderRef.current = render;

    // Create ground
    const ground = Matter.Bodies.rectangle(400, 590, 810, 20, {
      isStatic: true,
      render: { fillStyle: '#fde047' },
    });

    // Create walls
    const leftWall = Matter.Bodies.rectangle(0, 300, 20, 600, {
      isStatic: true,
      render: { fillStyle: '#fde047' },
    });

    const rightWall = Matter.Bodies.rectangle(800, 300, 20, 600, {
      isStatic: true,
      render: { fillStyle: '#fde047' },
    });

    // Create obstacle blocks
    const blocks = createLevelBlocks(level);

    // Add all bodies to world
    Matter.World.add(engine.world, [ground, leftWall, rightWall, ...blocks]);

    // Run engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Collision detection
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        
        // Check if projectile hit a block
        if (bodyA.label === 'projectile' || bodyB.label === 'projectile') {
          const block = bodyA.label === 'projectile' ? bodyB : bodyA;
          
          if (block.label && block.label.includes('block')) {
            handleBlockHit(block);
          }
        }
      });
    });

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [level]);

  const createLevelBlocks = (level) => {
    const blocks = [];
    const startX = 500;
    const startY = 400;
    const blockSize = 40;

    // Create pyramid structure
    const rows = Math.min(3 + Math.floor(level / 3), 6);
    
    for (let row = 0; row < rows; row++) {
      const blocksInRow = rows - row;
      for (let col = 0; col < blocksInRow; col++) {
        const x = startX + (col - blocksInRow / 2) * (blockSize + 5);
        const y = startY - row * (blockSize + 5);
        
        const blockType = getBlockType(level, row);
        const block = createBlock(x, y, blockSize, blockType);
        blocks.push(block);
      }
    }

    return blocks;
  };

  const getBlockType = (level, row) => {
    const rand = Math.random();
    
    if (level < 5) {
      return rand < 0.8 ? 'wooden' : 'crystal';
    } else if (level < 10) {
      if (rand < 0.5) return 'wooden';
      if (rand < 0.85) return 'stone';
      return 'crystal';
    } else {
      if (rand < 0.3) return 'wooden';
      if (rand < 0.6) return 'stone';
      if (rand < 0.85) return 'metal';
      return 'crystal';
    }
  };

  const createBlock = (x, y, size, type) => {
    const colors = {
      wooden: '#8B4513',
      stone: '#808080',
      metal: '#4A4A4A',
      crystal: '#3b82f6',
      trap: '#ef4444',
    };

    const densities = {
      wooden: 0.001,
      stone: 0.002,
      metal: 0.003,
      crystal: 0.0005,
      trap: 0.001,
    };

    return Matter.Bodies.rectangle(x, y, size, size, {
      label: `${type}-block`,
      render: {
        fillStyle: colors[type],
      },
      density: densities[type],
      friction: 0.8,
      restitution: 0.3,
    });
  };

  const handleBlockHit = (block) => {
    const blockType = block.label.split('-')[0];
    
    // Calculate damage based on impact force
    const velocity = Math.sqrt(block.velocity.x ** 2 + block.velocity.y ** 2);
    
    if (velocity > 2) {
      // Remove block and award points
      Matter.World.remove(engineRef.current.world, block);
      
      const points = {
        wooden: 10,
        stone: 25,
        metal: 50,
        crystal: 100,
        trap: -20,
      };
      
      const score = points[blockType] || 0;
      setCurrentScore(prev => prev + score);
      setBlocksDestroyed(prev => prev + 1);
      
      // Update game context
      if (blockType === 'crystal') {
        // Update crystals in context
      }
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is near slingshot
    const distance = Math.sqrt(
      (x - SLINGSHOT_POS.x) ** 2 + (y - SLINGSHOT_POS.y) ** 2
    );
    
    if (distance < 50 && shotsRemaining > 0) {
      setIsDragging(true);
      setDragStart({ x, y });
      setDragCurrent({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Limit drag distance
    const dx = x - SLINGSHOT_POS.x;
    const dy = y - SLINGSHOT_POS.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    
    if (distance > MAX_PULL) {
      const angle = Math.atan2(dy, dx);
      setDragCurrent({
        x: SLINGSHOT_POS.x + Math.cos(angle) * MAX_PULL,
        y: SLINGSHOT_POS.y + Math.sin(angle) * MAX_PULL,
      });
    } else {
      setDragCurrent({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Calculate launch velocity
    const dx = SLINGSHOT_POS.x - dragCurrent.x;
    const dy = SLINGSHOT_POS.y - dragCurrent.y;
    const force = Math.sqrt(dx ** 2 + dy ** 2) / 10;
    
    // Create and launch projectile
    launchProjectile(dx * force * 0.01, dy * force * 0.01);
    
    setShotsRemaining(prev => prev - 1);
    setDragCurrent(SLINGSHOT_POS);
  };

  const launchProjectile = (vx, vy) => {
    const projectile = Matter.Bodies.circle(SLINGSHOT_POS.x, SLINGSHOT_POS.y, 15, {
      label: 'projectile',
      render: { fillStyle: '#fde047' },
      density: 0.004,
      restitution: 0.8,
    });
    
    Matter.World.add(engineRef.current.world, projectile);
    Matter.Body.setVelocity(projectile, { x: vx, y: vy });
    
    // Remove projectile after 5 seconds
    setTimeout(() => {
      if (engineRef.current && engineRef.current.world) {
        Matter.World.remove(engineRef.current.world, projectile);
      }
    }, 5000);
  };

  // Check win/lose conditions
  useEffect(() => {
    if (shotsRemaining === 0 && blocksDestroyed < 5) {
      setTimeout(() => onGameOver(), 2000);
    } else if (blocksDestroyed >= 10) {
      setTimeout(() => onLevelComplete(currentScore), 2000);
    }
  }, [shotsRemaining, blocksDestroyed]);

  return (
    <div className="relative">
      {/* Game Stats */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-game-dark/80 border-2 border-game-yellow rounded-lg px-4 py-2">
          <span className="font-pixel text-sm text-game-yellow">Score: {currentScore}</span>
        </div>
        <div className="bg-game-dark/80 border-2 border-game-yellow rounded-lg px-4 py-2">
          <span className="font-pixel text-sm text-game-yellow">Level: {level}</span>
        </div>
        <div className="bg-game-dark/80 border-2 border-game-yellow rounded-lg px-4 py-2">
          <span className="font-pixel text-sm text-game-yellow">Shots: {shotsRemaining}</span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        className="cursor-crosshair"
      />

      {/* Trajectory Line */}
      {isDragging && (
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width="800"
          height="600"
        >
          <line
            x1={SLINGSHOT_POS.x}
            y1={SLINGSHOT_POS.y}
            x2={dragCurrent.x}
            y2={dragCurrent.y}
            stroke="#fde047"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <circle
            cx={dragCurrent.x}
            cy={dragCurrent.y}
            r="15"
            fill="#fde047"
            opacity="0.5"
          />
        </svg>
      )}
    </div>
  );
};

export default PhysicsGame;

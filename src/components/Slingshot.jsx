import React from 'react';
import { motion } from 'framer-motion';

const Slingshot = ({ position, isDragging, dragPosition, projectileType = 'standard' }) => {
  const { x, y } = position;
  const pullX = isDragging ? dragPosition.x : x;
  const pullY = isDragging ? dragPosition.y : y;

  const projectileColors = {
    standard: '#fde047',
    heavy: '#8B4513',
    explosive: '#ef4444',
    crystal: '#3b82f6',
  };

  const projectileEmoji = {
    standard: '💎',
    heavy: '🪨',
    explosive: '💥',
    crystal: '✨',
  };

  return (
    <svg
      className="absolute bottom-0 left-0 pointer-events-none"
      width="300"
      height="200"
      style={{ zIndex: 5 }}
    >
      {/* Slingshot Base */}
      <g>
        {/* Left post */}
        <rect
          x="80"
          y="120"
          width="10"
          height="80"
          fill="#8B4513"
          rx="5"
        />
        {/* Right post */}
        <rect
          x="160"
          y="120"
          width="10"
          height="80"
          fill="#8B4513"
          rx="5"
        />
        
        {/* Elastic bands */}
        {isDragging ? (
          <>
            {/* Left band stretched */}
            <line
              x1="85"
              y1="120"
              x2={pullX}
              y2={pullY}
              stroke="#654321"
              strokeWidth="3"
            />
            {/* Right band stretched */}
            <line
              x1="165"
              y1="120"
              x2={pullX}
              y2={pullY}
              stroke="#654321"
              strokeWidth="3"
            />
          </>
        ) : (
          <>
            {/* Left band relaxed */}
            <line
              x1="85"
              y1="120"
              x2="120"
              y2="100"
              stroke="#654321"
              strokeWidth="3"
            />
            {/* Right band relaxed */}
            <line
              x1="165"
              y1="120"
              x2="130"
              y2="100"
              stroke="#654321"
              strokeWidth="3"
            />
          </>
        )}

        {/* Projectile */}
        <motion.circle
          cx={isDragging ? pullX : 125}
          cy={isDragging ? pullY : 100}
          r="15"
          fill={projectileColors[projectileType]}
          stroke="#000"
          strokeWidth="2"
          animate={!isDragging ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
        
        {/* Projectile emoji overlay */}
        <text
          x={isDragging ? pullX - 10 : 115}
          y={isDragging ? pullY + 5 : 105}
          fontSize="20"
          className="pointer-events-none"
        >
          {projectileEmoji[projectileType]}
        </text>
      </g>

      {/* Power indicator */}
      {isDragging && (
        <g>
          <rect
            x="10"
            y="10"
            width="30"
            height="100"
            fill="#1e293b"
            stroke="#fde047"
            strokeWidth="2"
            rx="5"
          />
          <motion.rect
            x="12"
            y={110 - Math.min(Math.sqrt((pullX - x) ** 2 + (pullY - y) ** 2), 100)}
            width="26"
            height={Math.min(Math.sqrt((pullX - x) ** 2 + (pullY - y) ** 2), 100)}
            fill="#fde047"
            initial={{ height: 0 }}
            animate={{ height: Math.min(Math.sqrt((pullX - x) ** 2 + (pullY - y) ** 2), 100) }}
          />
          <text
            x="25"
            y="130"
            fontSize="10"
            fill="#fde047"
            textAnchor="middle"
            className="font-pixel"
          >
            PWR
          </text>
        </g>
      )}
    </svg>
  );
};

export default Slingshot;

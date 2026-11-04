import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareOpacity?: number;
  glowColor?: 'brand' | 'sky' | 'indigo' | 'amber';
}

const glowColorMap = {
  brand: 'rgba(16, 185, 129, 0.16)',
  sky: 'rgba(56, 189, 248, 0.16)',
  indigo: 'rgba(99, 102, 241, 0.16)',
  amber: 'rgba(245, 158, 11, 0.16)',
};

const borderColorMap = {
  brand: 'rgba(16, 185, 129, 0.4)',
  sky: 'rgba(56, 189, 248, 0.4)',
  indigo: 'rgba(99, 102, 241, 0.4)',
  amber: 'rgba(245, 158, 11, 0.4)',
};

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltIntensity = 10,
  glareOpacity = 0.08,
  glowColor = 'brand',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -tiltIntensity);
    setRotateY((x - 0.5) * tiltIntensity);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const activeGlow = glowColorMap[glowColor] || glowColorMap.brand;
  const activeBorder = borderColorMap[glowColor] || borderColorMap.brand;

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative transform-style-3d overflow-hidden transition-[border-color,box-shadow] duration-300 ${className}`}
        style={{
          boxShadow: isHovered
            ? `0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px -4px ${activeGlow}`
            : '0 10px 25px -5px rgba(0, 0, 0, 0.45)',
          borderColor: isHovered ? activeBorder : undefined,
        }}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.018 : 1,
          y: isHovered ? -4 : 0,
        }}
        whileTap={{ scale: 0.985 }}
        transition={{
          type: 'spring',
          damping: 22,
          stiffness: 280,
          mass: 0.4,
        }}
      >
        {children}

        {/* Dynamic Specular Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
};


import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareOpacity?: number;
  glowColor?: 'brand' | 'sky' | 'indigo' | 'amber' | 'emerald' | 'purple';
}

const glowColorMap = {
  brand: 'rgba(16, 185, 129, 0.18)',
  sky: 'rgba(56, 189, 248, 0.18)',
  indigo: 'rgba(99, 102, 241, 0.18)',
  amber: 'rgba(245, 158, 11, 0.18)',
  emerald: 'rgba(16, 185, 129, 0.22)',
  purple: 'rgba(168, 85, 247, 0.22)',
};

const borderColorMap = {
  brand: 'rgba(16, 185, 129, 0.45)',
  sky: 'rgba(56, 189, 248, 0.45)',
  indigo: 'rgba(99, 102, 241, 0.45)',
  amber: 'rgba(245, 158, 11, 0.45)',
  emerald: 'rgba(16, 185, 129, 0.5)',
  purple: 'rgba(168, 85, 247, 0.5)',
};

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltIntensity = 8,
  glareOpacity = 0.08,
  glowColor = 'brand',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -tiltIntensity);
    setRotateY((x - 0.5) * tiltIntensity);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const activeGlow = glowColorMap[glowColor] || glowColorMap.brand;
  const activeBorder = borderColorMap[glowColor] || borderColorMap.brand;

  if (prefersReducedMotion) {
    return (
      <div
        className={`relative overflow-hidden transition-all duration-200 ${className}`}
        style={{
          boxShadow: isHovered
            ? `0 16px 36px -10px rgba(0, 0, 0, 0.7), 0 0 20px -2px ${activeGlow}`
            : '0 8px 20px -4px rgba(0, 0, 0, 0.45)',
          borderColor: isHovered ? activeBorder : undefined,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`relative transform-style-3d overflow-hidden transition-[border-color,box-shadow] duration-300 ${className}`}
        style={{
          boxShadow: isPressed
            ? '0 8px 20px -8px rgba(0, 0, 0, 0.6)'
            : isHovered
            ? `0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 0 32px -4px ${activeGlow}`
            : '0 10px 25px -5px rgba(0, 0, 0, 0.45)',
          borderColor: isHovered ? activeBorder : undefined,
        }}
        animate={{
          rotateX: isPressed ? 0 : rotateX,
          rotateY: isPressed ? 0 : rotateY,
          scale: isPressed ? 0.985 : isHovered ? 1.018 : 1,
          y: isPressed ? 0 : isHovered ? -5 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.35,
        }}
        data-interactive="true"
      >
        {children}

        {/* Dynamic Specular Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered && !isPressed ? glareOpacity : 0,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;

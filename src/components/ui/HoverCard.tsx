import React, { ReactNode, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'brand' | 'sky' | 'indigo' | 'amber' | 'emerald';
  lift?: number;
  scale?: number;
  hoverClassName?: string;
}

const glowColorMap = {
  brand: {
    shadow: 'rgba(16, 185, 129, 0.18)',
    border: 'rgba(16, 185, 129, 0.45)',
    text: 'text-brand-400',
  },
  sky: {
    shadow: 'rgba(56, 189, 248, 0.18)',
    border: 'rgba(56, 189, 248, 0.45)',
    text: 'text-sky-400',
  },
  indigo: {
    shadow: 'rgba(99, 102, 241, 0.18)',
    border: 'rgba(99, 102, 241, 0.45)',
    text: 'text-indigo-400',
  },
  amber: {
    shadow: 'rgba(245, 158, 11, 0.18)',
    border: 'rgba(245, 158, 11, 0.45)',
    text: 'text-amber-400',
  },
  emerald: {
    shadow: 'rgba(16, 185, 129, 0.22)',
    border: 'rgba(16, 185, 129, 0.5)',
    text: 'text-emerald-400',
  },
};

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  glowColor = 'brand',
  lift = 5,
  scale = 1.018,
  hoverClassName = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeGlow = glowColorMap[glowColor] || glowColorMap.brand;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  if (prefersReducedMotion) {
    return (
      <div
        className={`relative overflow-hidden transition-all duration-200 ${className}`}
        style={{
          boxShadow: isHovered
            ? `0 16px 36px -10px rgba(0, 0, 0, 0.7), 0 0 24px -2px ${activeGlow.shadow}`
            : '0 8px 20px -4px rgba(0, 0, 0, 0.45)',
          borderColor: isHovered ? activeGlow.border : undefined,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      animate={{
        scale: isPressed ? 0.98 : isHovered ? scale : 1,
        y: isPressed ? 0 : isHovered ? -lift : 0,
      }}
      transition={{
        type: 'spring',
        damping: 24,
        stiffness: 300,
        mass: 0.35,
      }}
      style={{
        boxShadow: isHovered
          ? `0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 0 32px -4px ${activeGlow.shadow}`
          : '0 10px 25px -5px rgba(0, 0, 0, 0.45)',
        borderColor: isHovered ? activeGlow.border : undefined,
      }}
      className={`relative overflow-hidden transition-[border-color,box-shadow] duration-300 ${className}`}
      data-interactive="true"
    >
      {/* Specular glare overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 opacity-0 group-hover:opacity-100 ${hoverClassName}`}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

export default HoverCard;

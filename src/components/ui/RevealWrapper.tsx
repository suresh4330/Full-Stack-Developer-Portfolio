import React from 'react';
import { motion } from 'framer-motion';

interface RevealWrapperProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportAmount?: number;
}

export const RevealWrapper: React.FC<RevealWrapperProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 35,
  className = '',
  viewportAmount = 0.15,
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'zoom':
        return { opacity: 0, scale: 0.92 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getTarget = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'zoom':
        return { opacity: 1, scale: 1 };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getTarget()}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


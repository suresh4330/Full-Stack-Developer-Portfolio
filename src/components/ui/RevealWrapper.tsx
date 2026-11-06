import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export interface RevealWrapperProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

/**
 * RevealWrapper — Clean, Smooth, Unified Scroll Reveal
 * Powered directly by the upgraded ScrollReveal engine for 100% consistent physics and easing.
 */
export const RevealWrapper: React.FC<RevealWrapperProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  className = '',
  viewportAmount = 0.1,
  once = false,
}) => {
  const variantMap: Record<string, 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade'> = {
    up: 'slide-up',
    down: 'slide-down',
    left: 'slide-left',
    right: 'slide-right',
    zoom: 'scale-up',
    fade: 'fade',
  };

  const variant = variantMap[direction] || 'slide-up';

  return (
    <ScrollReveal
      variant={variant}
      startY={distance}
      startX={distance}
      duration={duration}
      delay={delay}
      viewportAmount={viewportAmount}
      once={once}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
};

export default RevealWrapper;

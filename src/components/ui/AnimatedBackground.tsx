import React from 'react';
import { NatureBackground } from './NatureBackground';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Cinematic Nature-Inspired Animated Living Sky */}
      <NatureBackground />

      {/* Subtle Engineered Horizon Mist Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-950/60 pointer-events-none" />
    </div>
  );
};

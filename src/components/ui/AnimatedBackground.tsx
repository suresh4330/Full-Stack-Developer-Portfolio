import React from 'react';
import { NatureBackground } from './NatureBackground';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Cinematic Photorealistic Moonlit Ocean Background */}
      <NatureBackground />

      {/* Dark Navy Atmospheric Scrim behind Hero & Central Content for Supreme Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_42%,rgba(2,6,18,0.76)_0%,rgba(2,6,18,0.52)_55%,rgba(1,4,14,0.82)_100%)] pointer-events-none" />

      {/* Cinematic Vertical Depth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020512]/75 via-transparent to-[#01040e]/90 pointer-events-none" />
    </div>
  );
};

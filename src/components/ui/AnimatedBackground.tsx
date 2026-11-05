import React from 'react';
import { NatureBackground } from './NatureBackground';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Living Cinematic Moonlit Ocean Background */}
      <NatureBackground />

      {/* Subtle Atmospheric Vignette - Keeps Moon, Clouds & Ocean Clearly Visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020510]/30 via-transparent to-[#020510]/65 pointer-events-none" />
    </div>
  );
};

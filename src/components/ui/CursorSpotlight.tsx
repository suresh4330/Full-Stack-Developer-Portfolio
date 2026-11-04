import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsFinePointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => setOpacity(0);
    const handleMouseEnter = () => setOpacity(1);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-500 ease-out"
      style={{
        opacity,
        background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.05), rgba(56, 189, 248, 0.02) 40%, transparent 80%)`,
      }}
    />
  );
};


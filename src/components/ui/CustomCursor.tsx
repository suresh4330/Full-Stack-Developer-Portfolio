import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const checkPointer = () => {
      setIsPointerDevice(window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);

    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkPointer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerDevice || !isVisible) return null;

  return (
    <>
      {/* Click Ripple Bursts */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] border border-brand-400/80"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 8, height: 8, opacity: 0.8, scale: 0.8 }}
          animate={{ width: 56, height: 56, opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
      {/* Outer Smooth Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : isClicking ? 24 : 32,
          height: isHovered ? 48 : isClicking ? 24 : 32,
          backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.02)',
          borderColor: isHovered ? 'rgba(52, 211, 153, 0.7)' : 'rgba(16, 185, 129, 0.4)',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-400 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#34d399' : '#10b981',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};


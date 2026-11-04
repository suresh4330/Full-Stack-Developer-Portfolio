import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top glowing progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500 origin-left z-[9000] shadow-[0_0_15px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      {/* Floating subtle percentage pill in bottom right (only visible when scrolled) */}
      {scrollPercent > 5 && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-md border border-dark-750 text-[10px] font-mono text-brand-400 hidden md:flex items-center gap-1.5 shadow-xl select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
          <span>{scrollPercent}%</span>
        </motion.div>
      )}
    </>
  );
};

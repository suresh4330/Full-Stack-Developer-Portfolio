import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      setIsFinished(true);
      onComplete();
      return;
    }

    const duration = 750; // Calibrated fast, premium 0.75-second load
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const linear = Math.min(1, elapsed / duration);
      // Ease out cubic progress feel
      const eased = 1 - Math.pow(1 - linear, 3);
      const current = Math.min(100, Math.round(eased * 100));
      setProgress(current);

      if (linear < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 350);
        }, 100);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete, prefersReducedMotion]);

  if (isFinished && prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#04060a] flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            filter: 'blur(6px)',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Ambient radial glow */}
          <div className="absolute w-[440px] h-[440px] bg-brand-500/12 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Monogram Box */}
            <motion.div
              className="w-20 h-20 rounded-2xl bg-dark-900 border border-dark-750 flex items-center justify-center text-brand-400 font-mono font-extrabold text-2xl shadow-2xl mb-8 relative overflow-hidden group"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>ASK</span>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Annamneedi Suresh Kumar
            </motion.h1>

            <motion.p
              className="text-xs font-mono text-slate-400 mb-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Full Stack Developer & Software Engineer
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-60 sm:w-72">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>Initializing Portfolio</span>
                <span className="text-brand-300 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden p-[1px] border border-dark-750">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

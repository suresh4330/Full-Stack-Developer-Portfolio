import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Quick, elegant 1-second progress animation
    const startTime = Date.now();
    const duration = 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 400);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#04060a] flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Subtle central glow */}
          <div className="absolute w-[360px] h-[360px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Monogram */}
            <motion.div
              className="w-16 h-16 rounded-2xl bg-dark-900 border border-dark-750 flex items-center justify-center text-brand-400 font-mono font-extrabold text-2xl shadow-2xl mb-6 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span>ASK</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500" />
            </motion.div>

            {/* Name & Title */}
            <motion.h1
              className="text-base sm:text-lg font-bold tracking-tight text-white mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              Annamneedi Suresh Kumar
            </motion.h1>

            <motion.p
              className="text-xs font-mono text-slate-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              Full Stack Developer & Software Engineer
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-56 sm:w-64">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>Loading Experience</span>
                <span className="text-brand-400 font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-dark-800 rounded-full overflow-hidden p-[1px] border border-dark-750">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


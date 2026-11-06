import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface PageLoadSequenceProps {
  children: React.ReactNode;
  duration?: number;
  skip?: boolean;
}

export const PageLoadSequence: React.FC<PageLoadSequenceProps> = ({
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reveal main page smoothly
    const timer = setTimeout(() => {
      setIsReady(true);
    }, prefersReducedMotion ? 0 : 50);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
};

export default PageLoadSequence;

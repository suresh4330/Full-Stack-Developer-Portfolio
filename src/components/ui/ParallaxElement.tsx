import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // Positive moves down slower (depth), negative moves faster
  direction?: 'vertical' | 'horizontal';
  scale?: boolean;
  opacity?: boolean;
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.2,
  direction = 'vertical',
  scale = false,
  opacity = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const translation = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.85]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y: direction === 'vertical' ? translation : 0,
          x: direction === 'horizontal' ? translation : 0,
          scale: scale ? scaleValue : 1,
          opacity: opacity ? opacityValue : 1,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};


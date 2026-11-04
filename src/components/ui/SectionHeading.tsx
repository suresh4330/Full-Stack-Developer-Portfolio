import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  pill: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  pill,
  title,
  description,
  alignment = 'left',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 ${alignment === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}
    >
      {/* Animated Pill Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dark-900 border border-dark-750 text-xs font-mono text-brand-400 mb-3 shadow-sm select-none hover:border-brand-500/50 hover:shadow-md hover:shadow-brand-500/15 transition-all cursor-default"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04, y: -1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
        <span>{pill}</span>
      </motion.div>

      {/* Masked Title Reveal */}
      <div className="overflow-hidden">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Description Fade */}
      {description && (
        <motion.p
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

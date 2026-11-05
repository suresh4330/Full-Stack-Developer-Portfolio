import React from 'react';
import { motion } from 'framer-motion';

const techItems = [
  'React 18',
  'TypeScript',
  'Node.js',
  'Express.js',
  'FastAPI',
  'PostgreSQL',
  'MongoDB Atlas',
  'Tailwind CSS',
  'Vite',
  'RESTful APIs',
  'Stateless JWT',
  'Leaflet.js',
  'Python',
  'C++ DSA',
  'Mongoose ODM',
  'OpenAPI',
  'Docker',
  'Redis',
  'Next.js',
  'GraphQL',
];

export const HorizontalMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-5 border-y border-dark-800/80 bg-dark-950/70 backdrop-blur-sm select-none">
      {/* Left and right soft edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#04060a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#04060a] to-transparent z-10 pointer-events-none" />

      {/* Infinite Dual Track Marquee */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-6 whitespace-nowrap pr-6"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 32,
            ease: 'linear',
          }}
        >
          {techItems.map((item, idx) => (
            <div
              key={`track1-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-900/85 border border-dark-800/90 text-xs font-mono text-slate-300 hover:text-brand-300 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex shrink-0 items-center gap-6 whitespace-nowrap pr-6"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 32,
            ease: 'linear',
          }}
        >
          {techItems.map((item, idx) => (
            <div
              key={`track2-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-900/85 border border-dark-800/90 text-xs font-mono text-slate-300 hover:text-brand-300 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

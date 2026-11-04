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
];

export const HorizontalMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-dark-800/80 bg-dark-950/60 select-none">
      {/* Left and right soft edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04060a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04060a] to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex shrink-0 items-center gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          }}
        >
          {/* Double items array for seamless infinite looping */}
          {[...techItems, ...techItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-dark-900/80 border border-dark-800 text-xs font-mono text-slate-300 hover:text-brand-400 hover:border-brand-500/40 transition-colors"
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


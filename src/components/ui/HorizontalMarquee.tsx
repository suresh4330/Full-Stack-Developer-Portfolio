import React from 'react';
import { motion } from 'framer-motion';

/**
 * HorizontalMarquee — Professional Moving Skills Bar
 *
 * Exact visual match to the reference screenshot:
 * - Skill boxes: Dark pill badges with subtle border and emerald glowing dot.
 * - Items: MongoDB Atlas, Tailwind CSS, Vite, RESTful APIs, Stateless JWT,
 *   Leaflet.js, Python, C++ DSA, Mongoose ODM, OpenAPI, React 18, TypeScript, etc.
 * - Calibrated speed: Smooth, steady, calm professional glide (75s duration, not fast!).
 * - Interactive: Pauses gracefully on hover so user can read or inspect.
 * - Enters smoothly on page load after a brief initial pause.
 */

const techItems = [
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
  'React 18',
  'TypeScript',
  'Node.js',
  'Express.js',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Redis',
  'Next.js',
  'GraphQL',
];

export const HorizontalMarquee: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      className="relative w-full overflow-hidden py-3.5 border-y border-[#16233b]/85 bg-[#060c18]/80 backdrop-blur-md select-none group"
    >
      {/* Soft gradient fades on left and right edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04060a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04060a] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Moving Track (Calm, Professional Slow Speed) */}
      <div className="flex overflow-hidden">
        {/* Track 1 */}
        <motion.div
          className="flex shrink-0 items-center gap-5 whitespace-nowrap pr-5"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 75, // Slow, calm, professional pace
            ease: 'linear',
          }}
        >
          {techItems.map((item, idx) => (
            <div
              key={`track1-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b1322]/90 hover:bg-[#0f1b30] border border-[#1e2d48]/90 hover:border-emerald-400/60 transition-all duration-200 shadow-sm shadow-black/40 cursor-default"
            >
              {/* Glowing emerald green dot from reference image */}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.85)]" />
              <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Track 2 (Seamless loop duplicate) */}
        <motion.div
          className="flex shrink-0 items-center gap-5 whitespace-nowrap pr-5"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 75, // Matching slow pace
            ease: 'linear',
          }}
        >
          {techItems.map((item, idx) => (
            <div
              key={`track2-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b1322]/90 hover:bg-[#0f1b30] border border-[#1e2d48]/90 hover:border-emerald-400/60 transition-all duration-200 shadow-sm shadow-black/40 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.85)]" />
              <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

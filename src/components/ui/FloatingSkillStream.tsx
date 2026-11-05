import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingSkillStream
 * Takes the user's reference skill pills (MongoDB Atlas, Tailwind CSS, Vite, etc.)
 * and animates them entering and floating across the screen after opening the page.
 *
 * Features:
 * - Emerges after a short delay (~2.5s) after opening the portfolio.
 * - Floats smoothly across the screen at randomized altitudes with natural drift.
 * - Styled exactly as the reference screenshot: dark pill with glowing emerald beacon.
 * - Interactive: hover to inspect, subtle cursor magnetic response.
 * - Continuously spawns new floating skill capsules over time.
 */

const skillList = [
  'React 18',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Vite',
  'MongoDB Atlas',
  'FastAPI',
  'PostgreSQL',
  'RESTful APIs',
  'Stateless JWT',
  'Leaflet.js',
  'Python',
  'C++ DSA',
  'Mongoose ODM',
  'OpenAPI',
  'Express.js',
  'Docker',
  'Redis',
  'Next.js',
  'GraphQL',
];

interface FloatingPill {
  id: number;
  skill: string;
  topPercent: number; // Vertical position [15% to 75%]
  duration: number; // Speed of traversal (18s to 32s)
  delay: number; // Delay before starting
  size: 'sm' | 'md';
}

export const FloatingSkillStream: React.FC = () => {
  const [activePills, setActivePills] = useState<FloatingPill[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal stream after user opens the page (2.5 seconds delay)
    const openTimer = setTimeout(() => {
      setIsVisible(true);
      generateInitialPills();
    }, 2500);

    return () => clearTimeout(openTimer);
  }, []);

  const generateInitialPills = () => {
    const lanes = [18, 30, 48, 62, 76]; // Staggered vertical lanes avoiding central focal points
    const initial: FloatingPill[] = [];

    // Create 5-6 concurrent floating skill pills staggered over time
    for (let i = 0; i < 6; i++) {
      const skill = skillList[(i * 3 + 1) % skillList.length];
      const lane = lanes[i % lanes.length] + (Math.random() - 0.5) * 6;
      initial.push({
        id: Date.now() + i,
        skill,
        topPercent: lane,
        duration: 22 + Math.random() * 12,
        delay: i * 3.5, // Staggered entry
        size: i % 2 === 0 ? 'md' : 'sm',
      });
    }

    setActivePills(initial);
  };

  // Re-spawn pill when one finishes its flight
  const handlePillComplete = (id: number) => {
    setActivePills((prev) => {
      const remaining = prev.filter((p) => p.id !== id);
      const nextSkill = skillList[Math.floor(Math.random() * skillList.length)];
      const lanes = [18, 32, 46, 60, 74];
      const randomLane = lanes[Math.floor(Math.random() * lanes.length)] + (Math.random() - 0.5) * 6;

      const newPill: FloatingPill = {
        id: Date.now() + Math.random(),
        skill: nextSkill,
        topPercent: Math.max(14, Math.min(82, randomLane)),
        duration: 22 + Math.random() * 12,
        delay: 0.5 + Math.random() * 2,
        size: Math.random() > 0.5 ? 'md' : 'sm',
      };

      return [...remaining, newPill];
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      <AnimatePresence>
        {activePills.map((pill) => (
          <motion.div
            key={pill.id}
            initial={{ x: '-15vw', opacity: 0, y: 0 }}
            animate={{
              x: '115vw',
              opacity: [0, 0.9, 0.9, 0],
              y: [0, -12, 12, -8, 0], // Gentle undulating wave drift
            }}
            transition={{
              x: {
                duration: pill.duration,
                delay: pill.delay,
                ease: 'linear',
              },
              opacity: {
                duration: pill.duration,
                delay: pill.delay,
                times: [0, 0.08, 0.92, 1],
                ease: 'easeInOut',
              },
              y: {
                duration: pill.duration * 0.5,
                delay: pill.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
            onAnimationComplete={() => handlePillComplete(pill.id)}
            style={{
              position: 'absolute',
              top: `${pill.topPercent}%`,
              left: 0,
            }}
            className="pointer-events-auto cursor-default group"
          >
            {/* The Reference Skill Pill from User's Screenshot */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dark-900/85 hover:bg-dark-850/95 backdrop-blur-md border border-dark-750/90 hover:border-brand-400/60 transition-all duration-300 shadow-xl shadow-black/50 group-hover:scale-105 group-hover:shadow-brand-500/20 ${
                pill.size === 'sm' ? 'text-[11px] py-1 px-3' : 'text-xs'
              } font-mono text-slate-300 hover:text-white`}
            >
              {/* Glowing Emerald Beacon dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-sm shadow-emerald-400/80"></span>
              </span>

              {/* Skill Title */}
              <span className="tracking-wide font-medium">{pill.skill}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

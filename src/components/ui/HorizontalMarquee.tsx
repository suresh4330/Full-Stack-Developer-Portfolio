import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { useAnimationConfig } from '../../context/AnimationContext';

export interface TechBadge {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Languages' | 'Architecture';
  dotColor: string;
  dotShadow: string;
  hoverBorder: string;
  hoverGlow: string;
  badgeTextColor?: string;
}

// Row 1: Core Frameworks, Languages & Full Stack Engines
const row1Techs: TechBadge[] = [
  {
    name: 'React 18',
    category: 'Frontend',
    dotColor: 'bg-cyan-400',
    dotShadow: 'shadow-[0_0_8px_rgba(34,211,238,0.9)]',
    hoverBorder: 'hover:border-cyan-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    badgeTextColor: 'group-hover/badge:text-cyan-300',
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    dotColor: 'bg-blue-400',
    dotShadow: 'shadow-[0_0_8px_rgba(96,165,250,0.9)]',
    hoverBorder: 'hover:border-blue-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]',
    badgeTextColor: 'group-hover/badge:text-blue-300',
  },
  {
    name: 'Python',
    category: 'Languages',
    dotColor: 'bg-amber-400',
    dotShadow: 'shadow-[0_0_8px_rgba(251,191,36,0.9)]',
    hoverBorder: 'hover:border-amber-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]',
    badgeTextColor: 'group-hover/badge:text-amber-300',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    dotColor: 'bg-emerald-400',
    dotShadow: 'shadow-[0_0_8px_rgba(52,211,153,0.9)]',
    hoverBorder: 'hover:border-emerald-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
    badgeTextColor: 'group-hover/badge:text-emerald-300',
  },
  {
    name: 'Docker',
    category: 'DevOps & Cloud',
    dotColor: 'bg-sky-400',
    dotShadow: 'shadow-[0_0_8px_rgba(56,189,248,0.9)]',
    hoverBorder: 'hover:border-sky-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]',
    badgeTextColor: 'group-hover/badge:text-sky-300',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    dotColor: 'bg-teal-400',
    dotShadow: 'shadow-[0_0_8px_rgba(45,212,191,0.9)]',
    hoverBorder: 'hover:border-teal-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]',
    badgeTextColor: 'group-hover/badge:text-teal-300',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    dotColor: 'bg-indigo-400',
    dotShadow: 'shadow-[0_0_8px_rgba(129,140,248,0.9)]',
    hoverBorder: 'hover:border-indigo-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]',
    badgeTextColor: 'group-hover/badge:text-indigo-300',
  },
  {
    name: 'MongoDB Atlas',
    category: 'Database',
    dotColor: 'bg-emerald-500',
    dotShadow: 'shadow-[0_0_8px_rgba(16,185,129,0.9)]',
    hoverBorder: 'hover:border-emerald-500/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    badgeTextColor: 'group-hover/badge:text-emerald-300',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    dotColor: 'bg-slate-300',
    dotShadow: 'shadow-[0_0_8px_rgba(203,213,225,0.9)]',
    hoverBorder: 'hover:border-slate-300/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(203,213,225,0.2)]',
    badgeTextColor: 'group-hover/badge:text-white',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    dotColor: 'bg-sky-400',
    dotShadow: 'shadow-[0_0_8px_rgba(56,189,248,0.9)]',
    hoverBorder: 'hover:border-sky-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]',
    badgeTextColor: 'group-hover/badge:text-sky-300',
  },
  {
    name: 'Vite',
    category: 'Frontend',
    dotColor: 'bg-purple-400',
    dotShadow: 'shadow-[0_0_8px_rgba(192,132,252,0.9)]',
    hoverBorder: 'hover:border-purple-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]',
    badgeTextColor: 'group-hover/badge:text-purple-300',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    dotColor: 'bg-white',
    dotShadow: 'shadow-[0_0_8px_rgba(255,255,255,0.9)]',
    hoverBorder: 'hover:border-white/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    badgeTextColor: 'group-hover/badge:text-white',
  },
];

// Row 2: Cloud, Architecture, Storage, DevOps & Tooling
const row2Techs: TechBadge[] = [
  {
    name: 'AWS Cloud',
    category: 'DevOps & Cloud',
    dotColor: 'bg-orange-400',
    dotShadow: 'shadow-[0_0_8px_rgba(251,146,60,0.9)]',
    hoverBorder: 'hover:border-orange-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.2)]',
    badgeTextColor: 'group-hover/badge:text-orange-300',
  },
  {
    name: 'Kubernetes',
    category: 'DevOps & Cloud',
    dotColor: 'bg-sky-400',
    dotShadow: 'shadow-[0_0_8px_rgba(56,189,248,0.9)]',
    hoverBorder: 'hover:border-sky-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]',
    badgeTextColor: 'group-hover/badge:text-sky-300',
  },
  {
    name: 'RESTful APIs',
    category: 'Architecture',
    dotColor: 'bg-emerald-400',
    dotShadow: 'shadow-[0_0_8px_rgba(52,211,153,0.9)]',
    hoverBorder: 'hover:border-emerald-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
    badgeTextColor: 'group-hover/badge:text-emerald-300',
  },
  {
    name: 'Stateless JWT',
    category: 'Backend',
    dotColor: 'bg-amber-400',
    dotShadow: 'shadow-[0_0_8px_rgba(251,191,36,0.9)]',
    hoverBorder: 'hover:border-amber-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]',
    badgeTextColor: 'group-hover/badge:text-amber-300',
  },
  {
    name: 'Redis',
    category: 'Database',
    dotColor: 'bg-rose-400',
    dotShadow: 'shadow-[0_0_8px_rgba(251,113,133,0.9)]',
    hoverBorder: 'hover:border-rose-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(251,113,133,0.2)]',
    badgeTextColor: 'group-hover/badge:text-rose-300',
  },
  {
    name: 'C++ (DSA)',
    category: 'Languages',
    dotColor: 'bg-indigo-400',
    dotShadow: 'shadow-[0_0_8px_rgba(129,140,248,0.9)]',
    hoverBorder: 'hover:border-indigo-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]',
    badgeTextColor: 'group-hover/badge:text-indigo-300',
  },
  {
    name: 'GraphQL',
    category: 'Architecture',
    dotColor: 'bg-pink-400',
    dotShadow: 'shadow-[0_0_8px_rgba(244,114,182,0.9)]',
    hoverBorder: 'hover:border-pink-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]',
    badgeTextColor: 'group-hover/badge:text-pink-300',
  },
  {
    name: 'Leaflet.js',
    category: 'Frontend',
    dotColor: 'bg-lime-400',
    dotShadow: 'shadow-[0_0_8px_rgba(163,230,53,0.9)]',
    hoverBorder: 'hover:border-lime-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]',
    badgeTextColor: 'group-hover/badge:text-lime-300',
  },
  {
    name: 'Git & GitHub',
    category: 'DevOps & Cloud',
    dotColor: 'bg-slate-200',
    dotShadow: 'shadow-[0_0_8px_rgba(226,232,240,0.9)]',
    hoverBorder: 'hover:border-slate-200/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(226,232,240,0.2)]',
    badgeTextColor: 'group-hover/badge:text-white',
  },
  {
    name: 'Postman',
    category: 'DevOps & Cloud',
    dotColor: 'bg-orange-500',
    dotShadow: 'shadow-[0_0_8px_rgba(249,115,22,0.9)]',
    hoverBorder: 'hover:border-orange-500/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    badgeTextColor: 'group-hover/badge:text-orange-300',
  },
  {
    name: 'Linux / Bash',
    category: 'DevOps & Cloud',
    dotColor: 'bg-yellow-400',
    dotShadow: 'shadow-[0_0_8px_rgba(250,204,21,0.9)]',
    hoverBorder: 'hover:border-yellow-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]',
    badgeTextColor: 'group-hover/badge:text-yellow-300',
  },
  {
    name: 'Mongoose ODM',
    category: 'Database',
    dotColor: 'bg-emerald-400',
    dotShadow: 'shadow-[0_0_8px_rgba(52,211,153,0.9)]',
    hoverBorder: 'hover:border-emerald-400/70',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
    badgeTextColor: 'group-hover/badge:text-emerald-300',
  },
];

interface HorizontalMarqueeProps {
  className?: string;
  variant?: 'dual' | 'single';
}

export const HorizontalMarquee: React.FC<HorizontalMarqueeProps> = ({
  className = '',
  variant = 'dual',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { config } = useAnimationConfig();

  const isMotionDisabled =
    prefersReducedMotion || config.performance.mode === 'static';

  const renderBadge = (tech: TechBadge, key: string) => (
    <div
      key={key}
      className={`group/badge shrink-0 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-dark-900/90 hover:bg-dark-850/95 border border-dark-750/90 ${tech.hoverBorder} transition-all duration-200 shadow-md shadow-black/50 select-none cursor-default hover:scale-105 hover:-translate-y-0.5 ${tech.hoverGlow}`}
      data-interactive="true"
    >
      {/* Illuminated Tech Dot */}
      <span
        className={`w-2 h-2 rounded-full ${tech.dotColor} ${tech.dotShadow} shrink-0 animate-pulse`}
      />
      
      {/* Technology Name */}
      <span
        className={`text-xs font-mono font-semibold text-slate-200 tracking-wide transition-colors ${tech.badgeTextColor || 'group-hover/badge:text-white'}`}
      >
        {tech.name}
      </span>

      {/* Subtle Category Pill Tag */}
      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-dark-950/80 border border-dark-800 text-slate-400 group-hover/badge:text-slate-300">
        {tech.category}
      </span>
    </div>
  );

  return (
    <ScrollReveal variant="fade" duration={0.6} delay={0.1}>
      <section
        aria-label="Core Technologies Marquee"
        className={`marquee-container relative w-full overflow-hidden py-5 border-y border-[#16233b]/85 bg-[#050a14]/85 backdrop-blur-md select-none ${className}`}
      >
        {/* Soft edge fade masks for smooth seamless entry and exit */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#04060a] via-[#04060a]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#04060a] via-[#04060a]/90 to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-3.5">
          {/* Row 1: Flowing Left with Individual Badges */}
          <div className="flex overflow-hidden">
            <div
              className={`flex items-center gap-3.5 ${
                isMotionDisabled ? 'overflow-x-auto w-full py-1' : 'animate-marquee-left'
              }`}
            >
              {/* Primary list */}
              {row1Techs.map((tech, idx) => renderBadge(tech, `r1-primary-${idx}`))}
              {/* Duplicated list for 100% mathematically seamless infinite loop */}
              {!isMotionDisabled &&
                row1Techs.map((tech, idx) => renderBadge(tech, `r1-duplicate-${idx}`))}
            </div>
          </div>

          {/* Row 2: Flowing Right (or Reverse) with Individual Badges */}
          {variant === 'dual' && (
            <div className="flex overflow-hidden">
              <div
                className={`flex items-center gap-3.5 ${
                  isMotionDisabled ? 'overflow-x-auto w-full py-1' : 'animate-marquee-right'
                }`}
              >
                {/* Primary list */}
                {row2Techs.map((tech, idx) => renderBadge(tech, `r2-primary-${idx}`))}
                {/* Duplicated list for 100% mathematically seamless infinite loop */}
                {!isMotionDisabled &&
                  row2Techs.map((tech, idx) => renderBadge(tech, `r2-duplicate-${idx}`))}
              </div>
            </div>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
};

export default HorizontalMarquee;

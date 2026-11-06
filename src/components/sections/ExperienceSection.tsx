import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { milestonesData } from '../../data/experience';
import { Trophy, BookOpen, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const typeIcons: Record<string, React.ReactNode> = {
  Hackathon: <Trophy className="w-4 h-4 text-amber-400" />,
  'Technical Training': <BookOpen className="w-4 h-4 text-brand-400" />,
  'Academic Milestone': <Layers className="w-4 h-4 text-sky-400" />,
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <SectionHeading
            pill="Experience & Research"
            title="Engineering Milestones & Technical Competitions"
            description="Competitive hackathons, rigorous algorithm training programs, and full-stack software development milestones verified directly from academic and competition records."
          />
        </ScrollReveal>

        {/* Verification banner */}
        <ScrollReveal variant="slide-up" startY={20} duration={0.5} delay={0.1}>
          <div className="p-4 rounded-2xl bg-dark-900 border border-dark-800 mb-12 flex items-start gap-3 shadow-xl">
            <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">Source Integrity Commitment: </span>
              Every role, competition, and technical training milestone displayed reflects verified achievements documented on CV and institutional records. No fictitious corporate positions or inflated responsibilities are added.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline with Scroll-Drawn Glowing Path */}
        <div ref={containerRef} className="relative ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          <div className="absolute -left-[1px] top-3 bottom-3 w-[2px] bg-dark-800" />

          <motion.div
            className="absolute -left-[1px] top-3 w-[2px] bg-gradient-to-b from-brand-400 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)] z-0"
            style={{ height: lineHeight }}
          />

          {milestonesData.map((milestone, idx) => (
            <ScrollReveal
              variant="slide-up"
              startY={25}
              duration={0.55}
              delay={idx * 0.08}
              key={idx}
            >
              <div className="relative group">
                <motion.div 
                  className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center group-hover:border-brand-500 transition-colors shadow-lg z-10"
                  whileHover={{ scale: 1.18 }}
                >
                  {typeIcons[milestone.type] || <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />}
                </motion.div>

                <motion.div 
                  className="bg-dark-900/80 border border-dark-750 rounded-2xl p-6 hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 shadow-xl backdrop-blur-xl"
                  whileHover={{ y: -3, scale: 1.01 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-brand-400">
                      {milestone.organization}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {milestone.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {milestone.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    {milestone.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-1" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-dark-850 text-slate-400 border border-dark-800">
                      {milestone.verifiedTag}
                    </span>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { educationData } from '../../data/education';
import { GraduationCap, MapPin } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { ScrollReveal } from '../ui/ScrollReveal';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-dark-900/30 border-b border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <SectionHeading
            pill="Academic Foundations"
            title="Education & Formal Training"
            description="Academic records and institutional coursework in Computer Science, Artificial Intelligence, and quantitative STEM foundations."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationData.map((edu, idx) => {
            const glowColor: 'brand' | 'sky' | 'indigo' = idx === 0 ? 'brand' : idx === 1 ? 'sky' : 'indigo';

            return (
              <ScrollReveal
                key={idx}
                variant="slide-up"
                startY={28}
                duration={0.55}
                delay={idx * 0.08}
                className="flex"
              >
                <TiltCard
                  className="w-full bg-dark-900/90 border border-dark-750 hover:border-dark-600 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl group"
                  tiltIntensity={6}
                  glareOpacity={0.07}
                  glowColor={glowColor}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-800">
                      <div className="p-2.5 rounded-2xl bg-dark-850 border border-dark-700 text-brand-400 group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-xl bg-dark-850 text-brand-400 border border-dark-700 font-bold shadow-sm">
                        {edu.score}
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs font-mono text-slate-400 block mb-1">
                        {edu.period}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-300 transition-colors">
                        {edu.institution}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{edu.location}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200">
                        {edu.degree}
                      </p>
                      {edu.specialization && (
                        <p className="text-xs text-brand-400/90 font-mono mt-0.5">
                          {edu.specialization}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {edu.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-400 leading-relaxed list-disc list-inside">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

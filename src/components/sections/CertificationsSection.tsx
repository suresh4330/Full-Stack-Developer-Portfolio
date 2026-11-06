import React from 'react';
import { certificationsData } from '../../data/certifications';
import { Award, CheckCircle } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { ScrollReveal } from '../ui/ScrollReveal';

export const CertificationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-dark-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-850 text-xs font-mono text-slate-300 mb-2 border border-dark-750">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Certifications & Industry Credentials
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Directly verified certifications covering cloud infrastructure, artificial intelligence foundations, and enterprise tools.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => {
            const certGlow: 'amber' | 'sky' | 'indigo' = idx === 0 ? 'amber' : idx === 1 ? 'sky' : 'indigo';
            return (
              <ScrollReveal
                key={cert.title}
                variant="slide-up"
                startY={28}
                duration={0.55}
                delay={idx * 0.08}
              >
                <TiltCard
                  className="w-full bg-dark-900/90 border border-dark-750 hover:border-dark-600 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl group"
                  tiltIntensity={6}
                  glareOpacity={0.07}
                  glowColor={certGlow}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-dark-800">
                      <span className="text-xs font-mono text-brand-400 font-semibold">
                        {cert.issuer}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-brand-300 transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {cert.verificationTopic}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-dark-850 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {cert.credentialId}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
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

export default CertificationsSection;

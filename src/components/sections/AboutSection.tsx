import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Code, Server, Database, ArrowUpRight, GraduationCap } from 'lucide-react';
import { profileData } from '../../data/profile';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TiltCard } from '../ui/TiltCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <SectionHeading
            pill="About Me"
            title="Full Stack Software Development & Problem Solving"
            description="Focused on engineering complete web applications—delivering fluid client experiences backed by reliable server APIs."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative */}
          <ScrollReveal
            variant="slide-up"
            startY={28}
            duration={0.65}
            delay={0.12}
            className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            <p>
              I am a Full Stack Developer currently pursuing a Bachelor of Technology in Computer Science and Engineering (Artificial Intelligence & Machine Learning) at <span className="text-white font-semibold">Lovely Professional University</span> (Class of 2027, 8.32 CGPA).
            </p>
            <p>
              My focus is building end-to-end web applications where frontend clarity and backend reliability reinforce each other. In my projects—including <span className="text-brand-400 font-mono font-medium">StockFlow</span>, the <span className="text-sky-400 font-mono font-medium">Medical Appointment Management System</span>, and the <span className="text-indigo-400 font-mono font-medium">Food Delivery Web Platform</span>—I write clean component architectures in React and TypeScript while architecting modular RESTful APIs in Node.js/Express and FastAPI with PostgreSQL and MongoDB.
            </p>
            <p>
              I believe great software stems from disciplined problem-solving: understanding user workflows, writing typed interfaces to catch runtime bugs early, modeling structured database schemas that safeguard data integrity, and conducting automated API integration testing before shipping.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <motion.a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-slate-500 text-xs font-mono text-slate-200 transition-all group"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <motion.a
                href={profileData.resumeUrl}
                download="Annamneedi_Suresh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-brand-500/40 text-xs font-mono text-brand-400 transition-all group"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <span>Verified Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Right: Core Engineering Highlights Card */}
          <ScrollReveal
            variant="slide-up"
            startY={35}
            duration={0.7}
            delay={0.2}
            className="lg:col-span-5"
          >
            <TiltCard
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4"
              tiltIntensity={6}
              glareOpacity={0.08}
              glowColor="brand"
            >
              <div className="text-xs font-mono text-slate-400 pb-3 border-b border-dark-800 flex items-center justify-between">
                <span className="font-bold text-white">Full Stack Engineering Pillars</span>
                <span className="text-brand-400">Class of 2027</span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-dark-950/60 border border-dark-800 hover:border-sky-500/40 transition-colors group">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">Frontend Precision</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Modular TypeScript, responsive interfaces, optimistic client state, and custom utility hooks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-dark-950/60 border border-dark-800 hover:border-brand-500/40 transition-colors group">
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">Reliable Server Architecture</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Stateless REST APIs in Node.js/Express and FastAPI, JWT token issuance, and RBAC middleware.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-dark-950/60 border border-dark-800 hover:border-indigo-500/40 transition-colors group">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">Data Integrity & Storage</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Relational schemas in PostgreSQL, document models in MongoDB, indexing, and migration pipelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-dark-950/60 border border-dark-800 hover:border-amber-500/40 transition-colors group">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">Academic Rigor & Algorithms</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      8.32 CGPA at LPU. Strong foundation in Data Structures, Algorithms in C++, and System Design.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Code, Server, Database, ArrowUpRight, GraduationCap } from 'lucide-react';
import { profileData } from '../../data/profile';
import { RevealWrapper } from '../ui/RevealWrapper';
import { TiltCard } from '../ui/TiltCard';
import { ParallaxElement } from '../ui/ParallaxElement';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          pill="About Me"
          title="Full Stack Software Development & Problem Solving"
          description="Focused on engineering complete web applications—delivering fluid client experiences backed by reliable server APIs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative - Slides from Left */}
          <RevealWrapper
            direction="right"
            duration={0.7}
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-slate-500 text-xs font-mono text-slate-200 transition-all"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-400" />
              </motion.a>
              <motion.a
                href={profileData.resumeUrl}
                download="Annamneedi_Suresh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-brand-500/40 text-xs font-mono text-brand-400 transition-all"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <span>Verified Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </RevealWrapper>

          {/* Right: Core Engineering Highlights Card - Slides from Right with 3D Tilt & Parallax */}
          <RevealWrapper
            direction="left"
            duration={0.7}
            delay={0.15}
            className="lg:col-span-5"
          >
            <ParallaxElement speed={0.1} scale={true}>
              <TiltCard
                className="bg-dark-900 border border-dark-750 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4"
                tiltIntensity={6}
                glareOpacity={0.08}
                glowColor="brand"
              >
                <div className="text-xs font-mono text-slate-400 pb-3 border-b border-dark-800 flex items-center justify-between">
                  <span className="font-bold text-white">Full Stack Engineering Pillars</span>
                  <span className="text-brand-400">Verified</span>
                </div>

                {[
                  {
                    icon: <Code className="w-4 h-4" />,
                    color: 'text-sky-400 bg-sky-500/10',
                    title: 'Frontend Craft',
                    desc: 'React 18, TypeScript, Tailwind CSS, Context API client stores, and mobile-first responsive layouts.',
                  },
                  {
                    icon: <Server className="w-4 h-4" />,
                    color: 'text-brand-400 bg-brand-500/10',
                    title: 'Backend APIs',
                    desc: 'Node.js/Express and Python/FastAPI RESTful services with stateless JWT authentication and RBAC.',
                  },
                  {
                    icon: <Database className="w-4 h-4" />,
                    color: 'text-indigo-400 bg-indigo-500/10',
                    title: 'Data Integrity',
                    desc: 'PostgreSQL relational models, MongoDB Atlas document schemas, and transaction safety.',
                  },
                  {
                    icon: <GraduationCap className="w-4 h-4" />,
                    color: 'text-amber-400 bg-amber-500/10',
                    title: 'Academic Standing',
                    desc: 'B.Tech CSE (AI & ML) at Lovely Professional University • 8.32 CGPA (Class of 2027).',
                  },
                ].map((pillar) => (
                  <motion.div
                    key={pillar.title}
                    className="p-3.5 rounded-2xl bg-dark-950/80 border border-dark-800/80 flex items-start gap-3 hover:border-dark-700 transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${pillar.color}`}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{pillar.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </TiltCard>
            </ParallaxElement>
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
};

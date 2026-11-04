import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { skillsCategories } from '../../data/skills';
import { Layout, Server, Code, Database, Wrench, Cpu } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend Development': <Layout className="w-4 h-4 text-sky-400" />,
  'Backend Development': <Server className="w-4 h-4 text-brand-400" />,
  'Programming Languages': <Code className="w-4 h-4 text-indigo-400" />,
  'Databases & Storage': <Database className="w-4 h-4 text-emerald-400" />,
  'Tools & Workflow': <Wrench className="w-4 h-4 text-amber-400" />,
  'Software Engineering Fundamentals': <Cpu className="w-4 h-4 text-purple-400" />,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...skillsCategories.map((c) => c.title)];

  const displayedCategories =
    activeCategory === 'All'
      ? skillsCategories
      : skillsCategories.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="py-24 bg-dark-900/40 border-b border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            pill="Technical Capabilities"
            title="Skills & Technologies"
            description="Verified technologies and engineering principles supported by my actual CV and production code repositories. Organized in an interactive Bento Grid."
          />
        </motion.div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.94 }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-brand-500/15 text-brand-400 border-brand-500/50 font-bold shadow-lg shadow-brand-500/15'
                  : 'bg-dark-900 text-slate-400 border-dark-800 hover:border-dark-700 hover:text-white'
              }`}
              data-interactive="true"
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Bento Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {displayedCategories.map((category, idx) => {
            // Frontend and Backend get wide 6-col spans; other categories take 6 or 4 cols
            const isWide = (category.title === 'Frontend Development' || category.title === 'Backend Development') && activeCategory === 'All';
            const colSpan = isWide ? 'lg:col-span-6' : 'lg:col-span-6';

            const categoryGlow: 'brand' | 'sky' | 'indigo' | 'amber' =
              category.title === 'Frontend Development'
                ? 'sky'
                : category.title === 'Programming Languages' || category.title === 'Software Engineering Fundamentals'
                ? 'indigo'
                : category.title === 'Tools & Workflow'
                ? 'amber'
                : 'brand';

            return (
              <motion.div
                key={category.title}
                className={`${colSpan} flex`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TiltCard
                  className="w-full bg-dark-900/85 border border-dark-750 hover:border-dark-600 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-colors backdrop-blur-xl"
                  tiltIntensity={6}
                  glareOpacity={0.06}
                  glowColor={categoryGlow}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-dark-800">
                      <div className="p-2.5 rounded-xl bg-dark-850 border border-dark-750">
                        {categoryIcons[category.title] || <Code className="w-4 h-4 text-brand-400" />}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-400 mb-4 leading-relaxed">
                      {category.tagline}
                    </p>

                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-3 rounded-xl bg-dark-950/70 border border-dark-800/80 hover:border-dark-700 transition-colors"
                        >
                          <div className="text-xs font-bold text-slate-200 mb-0.5">
                            {skill.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-snug">
                            {skill.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

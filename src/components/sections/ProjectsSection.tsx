import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, ArrowRight, Code, Server, Database, CheckCircle2, LayoutGrid, SlidersHorizontal, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';

type FilterType = 'All Projects' | 'Full Stack' | 'Frontend' | 'Backend' | 'Algorithms';
type ViewLayout = 'horizontal' | 'grid';

const filterOptions: FilterType[] = [
  'All Projects',
  'Full Stack',
  'Frontend',
  'Backend',
  'Algorithms',
];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewLayout, setViewLayout] = useState<ViewLayout>('horizontal');

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'All Projects') return true;
    if (activeFilter === 'Full Stack') return p.category === 'Full Stack';
    if (activeFilter === 'Frontend') return p.category === 'Frontend';
    if (activeFilter === 'Backend') return p.category === 'Backend' || p.category === 'Full Stack';
    if (activeFilter === 'Algorithms') return p.category === 'Algorithms';
    return true;
  });

  // Calculate horizontal shift: smoothly glide across filtered cards
  const totalCards = filteredProjects.length;
  const horizontalShift = Math.max(0, (totalCards - 1) * 78);
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${horizontalShift}%`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`border-b border-dark-800 relative bg-dark-900/40 ${
        viewLayout === 'horizontal' ? 'md:h-[280vh]' : 'py-24'
      }`}
    >
      {/* ============================================================== */}
      {/* 1. DESKTOP STICKY PINNED HORIZONTAL EXPERIENCE (md: and above) */}
      {/* ============================================================== */}
      {viewLayout === 'horizontal' ? (
        <div className="sticky top-0 h-screen hidden md:flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          
          {/* Top Control Header */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <SectionHeading
                pill="Horizontal Showcase"
                title="Featured Projects & Systems"
                description="Scroll down vertically to smoothly slide horizontally through verified production architectures."
                className="mb-0"
              />

              {/* View Layout Toggle */}
              <div className="flex items-center bg-dark-950 p-1 rounded-2xl border border-dark-800 shrink-0 text-xs font-mono">
                <button
                  onClick={() => setViewLayout('horizontal')}
                  className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-brand-500 text-dark-950 font-bold shadow-md shadow-brand-500/20"
                  data-interactive="true"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Horizontal</span>
                </button>
                <button
                  onClick={() => setViewLayout('grid')}
                  className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-slate-400 hover:text-white"
                  data-interactive="true"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Progress Track Bar */}
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-dark-800/80">
              <div className="flex flex-wrap items-center gap-2">
                {filterOptions.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      whileHover={{ y: -1, scale: 1.02 }}
                      whileTap={{ scale: 0.94 }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                        isActive
                          ? 'bg-brand-500/15 text-brand-400 border-brand-500/50 font-bold shadow-sm'
                          : 'bg-dark-950 text-slate-400 border-dark-800 hover:border-dark-700 hover:text-white'
                      }`}
                      data-interactive="true"
                    >
                      {filter}
                    </motion.button>
                  );
                })}
              </div>

              {/* Live Horizontal Progress Indicator */}
              <div className="hidden lg:flex items-center gap-3 shrink-0 text-xs font-mono text-slate-400">
                <span>Horizontal Slide Progress</span>
                <div className="w-32 h-1.5 bg-dark-950 rounded-full overflow-hidden border border-dark-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-400 via-sky-400 to-indigo-500 rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Pinned Horizontal Sliding Track */}
          <div className="relative overflow-visible py-4 my-auto">
            <motion.div style={{ x }} className="flex gap-8 items-stretch">
              {filteredProjects.map((project, idx) => {
                const glowColor =
                  project.category === 'Frontend'
                    ? 'sky'
                    : project.category === 'Algorithms'
                    ? 'indigo'
                    : 'brand';

                return (
                  <div
                    key={project.id}
                    className="w-[78vw] max-w-[840px] shrink-0 flex flex-col"
                  >
                    <TiltCard
                      className="w-full h-full bg-dark-900/95 border border-dark-750 hover:border-brand-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl flex flex-col justify-between group transition-colors duration-300"
                      tiltIntensity={6}
                      glareOpacity={0.08}
                      glowColor={glowColor}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        
                        {/* Left Details Column (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
                          <div>
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-dark-800">
                              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono font-semibold">
                                {project.category}
                              </span>
                              <span className="text-xs font-mono text-slate-400">
                                Project 0{idx + 1} of 0{totalCards} • {project.date}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-brand-300 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-xs font-mono text-brand-400 mb-3">
                              {project.subtitle}
                            </p>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                              {project.solution}
                            </p>
                          </div>

                          {/* Key Capabilities */}
                          <div className="space-y-1.5">
                            {project.keyCapabilities.slice(0, 2).map((cap, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                                <span className="truncate">{cap}</span>
                              </div>
                            ))}
                          </div>

                          {/* Stack summary */}
                          <div className="p-3 rounded-2xl bg-dark-950/80 border border-dark-800 space-y-1.5 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <Code className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                              <span className="text-slate-400">Frontend:</span>
                              <span className="text-slate-200 truncate">{project.frontendStack.slice(0, 3).join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Server className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                              <span className="text-slate-400">Backend:</span>
                              <span className="text-slate-200 truncate">{project.backendStack.slice(0, 3).join(', ')}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex flex-wrap items-center gap-2.5">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setSelectedProject(project)}
                              icon={<ArrowRight className="w-3.5 h-3.5" />}
                            >
                              Project Details
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              href={project.githubUrl}
                              external
                              icon={<Github className="w-3.5 h-3.5" />}
                            >
                              GitHub
                            </Button>
                            {project.liveUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                href={project.liveUrl}
                                external
                                icon={<ExternalLink className="w-3.5 h-3.5" />}
                              >
                                Live Demo
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Right Preview Image Column (5 cols) */}
                        <div className="lg:col-span-5 h-full flex flex-col justify-center">
                          {project.imageUrl && (
                            <div className="rounded-2xl overflow-hidden border border-dark-800 bg-dark-950 relative group/img aspect-[16/10] shadow-xl">
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover object-top filter brightness-90 group-hover/img:brightness-100 group-hover/img:scale-105 transition-all duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                                <span className="px-2 py-0.5 rounded bg-dark-900/90 border border-dark-750">
                                  Interactive Architecture
                                </span>
                                <span className="text-brand-400 font-semibold">
                                  Verified Repo
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </TiltCard>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Navigation Hint */}
          <div className="flex items-center justify-between pt-2 border-t border-dark-800/80 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-brand-400">
              <ArrowDown className="w-3 h-3 animate-bounce" />
              <span>Scroll down to slide horizontally across projects</span>
            </span>
            <span className="text-slate-400">
              Showing {filteredProjects.length} Verified Repositories
            </span>
          </div>

        </div>
      ) : null}

      {/* ============================================================== */}
      {/* 2. RESPONSIVE BENTO GRID (Mobile + Desktop Grid Mode)          */}
      {/* ============================================================== */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${viewLayout === 'horizontal' ? 'md:hidden py-16' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <SectionHeading
              pill="Project Showcase"
              title="Featured Projects & Systems"
              description="Production-ready full-stack and frontend applications verified directly from my GitHub repositories. Rendered in a modern interactive Bento Grid."
              className="mb-0"
            />

            {/* Desktop Switcher to return to Horizontal */}
            <div className="hidden md:flex items-center bg-dark-950 p-1 rounded-2xl border border-dark-800 shrink-0 text-xs font-mono">
              <button
                onClick={() => setViewLayout('horizontal')}
                className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-slate-400 hover:text-white"
                data-interactive="true"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Horizontal</span>
              </button>
              <button
                onClick={() => setViewLayout('grid')}
                className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-brand-500 text-dark-950 font-bold shadow-md shadow-brand-500/20"
                data-interactive="true"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ y: -1.5, scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-400 border-brand-500/50 font-bold shadow-lg shadow-brand-500/15'
                    : 'bg-dark-900 text-slate-400 border-dark-800 hover:border-dark-700 hover:text-white'
                }`}
                data-interactive="true"
              >
                {filter}
              </motion.button>
            );
          })}
        </div>

        {/* Modern Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isLargeBento = idx === 0 && activeFilter === 'All Projects';
              const colSpanClass = isLargeBento 
                ? 'lg:col-span-7' 
                : idx === 1 && activeFilter === 'All Projects'
                ? 'lg:col-span-5'
                : 'lg:col-span-6';

              const glowColor =
                project.category === 'Frontend'
                  ? 'sky'
                  : project.category === 'Algorithms'
                  ? 'indigo'
                  : 'brand';

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.35 }}
                  className={`${colSpanClass} flex`}
                >
                  <TiltCard
                    className="w-full bg-dark-900/85 border border-dark-750 hover:border-brand-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between group backdrop-blur-xl transition-colors duration-300"
                    tiltIntensity={7}
                    glareOpacity={0.07}
                    glowColor={glowColor}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-800">
                        <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono font-semibold">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {project.date}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-brand-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-brand-400 mb-4">
                        {project.subtitle}
                      </p>

                      {/* Optional Screenshot with Hover Zoom */}
                      {project.imageUrl && (
                        <div className="mb-4 rounded-2xl overflow-hidden border border-dark-800 bg-dark-950 relative group/img">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-44 sm:h-48 object-cover object-top filter brightness-90 group-hover/img:brightness-100 group-hover/img:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Solution Overview */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {project.solution}
                      </p>

                      {/* Verified Capabilities */}
                      <div className="mb-5 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Key Capabilities:
                        </div>
                        {project.keyCapabilities.slice(0, 3).map((cap, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stack Pills Breakdown */}
                      <div className="p-3.5 rounded-2xl bg-dark-950/80 border border-dark-800 mb-6 space-y-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Code className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="text-slate-400">Frontend:</span>
                          <span className="text-slate-200 truncate">{project.frontendStack.slice(0, 3).join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                          <span className="text-slate-400">Backend:</span>
                          <span className="text-slate-200 truncate">{project.backendStack.slice(0, 3).join(', ')}</span>
                        </div>
                        {project.databaseStack && (
                          <div className="flex items-center gap-2">
                            <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span className="text-slate-400">Database:</span>
                            <span className="text-slate-200 truncate">{project.databaseStack.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-dark-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Project Details
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          href={project.githubUrl}
                          external
                          icon={<Github className="w-3.5 h-3.5" />}
                        >
                          GitHub
                        </Button>
                      </div>
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          href={project.liveUrl}
                          external
                          icon={<ExternalLink className="w-3.5 h-3.5" />}
                        >
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import {
  Github,
  ExternalLink,
  ArrowRight,
  Code,
  Server,
  Database,
  CheckCircle2,
  Sparkles,
  Cpu,
  Bot,
  Workflow,
  Binary,
  Layers,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';
import { ScrollReveal } from '../ui/ScrollReveal';

export type FilterType =
  | 'All Projects'
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI / Machine Learning'
  | 'Deep Learning'
  | 'Generative AI'
  | 'DevOps'
  | 'Algorithms';

const filterOptions: FilterType[] = [
  'All Projects',
  'Full Stack',
  'Frontend',
  'Backend',
  'AI / Machine Learning',
  'Deep Learning',
  'Generative AI',
  'DevOps',
  'Algorithms',
];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const matchesFilter = (project: Project, filter: FilterType): boolean => {
    if (filter === 'All Projects') return true;
    if (project.category === filter) return true;
    if (project.tags && project.tags.includes(filter)) return true;
    if (filter === 'Backend' && project.category === 'Full Stack') return true;
    if (
      filter === 'AI / Machine Learning' &&
      (project.category === 'Deep Learning' || project.category === 'Generative AI')
    ) {
      return true;
    }
    return false;
  };

  const filteredProjects = projectsData.filter((p) => matchesFilter(p, activeFilter));

  const getColSpanClass = (idx: number, total: number, filter: FilterType) => {
    // When showing All Projects (14 projects):
    // Row 1 (idx 0, 1): StockFlow & Medical Appointment (6 + 6 = 12)
    // Row 2 (idx 2, 3): IntelliMoE & Edge-Deployment Compression (6 + 6 = 12)
    // Row 3 (idx 4, 5): CareerAI & Food Delivery (6 + 6 = 12)
    // Row 4 (idx 6, 7, 8): IP-SAKTI, MLPathfinder, Movie Recommender (4 + 4 + 4 = 12)
    // Row 5 (idx 9, 10, 11): Notification Router, Computer Vision DL, FitTracker (4 + 4 + 4 = 12)
    // Row 6 (idx 12, 13): Movie Booking & Route Optimization (6 + 6 = 12)
    if (filter === 'All Projects') {
      if (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4 || idx === 5 || idx === 12 || idx === 13) {
        return 'md:col-span-6 lg:col-span-6';
      }
      return 'md:col-span-6 lg:col-span-4';
    }

    // When filtered by category:
    if (total === 1) {
      return 'md:col-span-12 lg:col-span-8 lg:col-start-3';
    }
    if (total === 2) {
      return 'md:col-span-6 lg:col-span-6';
    }
    if (total === 3) {
      return 'md:col-span-6 lg:col-span-4';
    }
    if (total === 4) {
      return 'md:col-span-6 lg:col-span-6';
    }
    if (total === 5) {
      if (idx < 2) return 'md:col-span-6 lg:col-span-6';
      return 'md:col-span-6 lg:col-span-4';
    }
    if (total === 8) {
      if (idx < 2) return 'md:col-span-6 lg:col-span-6';
      return 'md:col-span-6 lg:col-span-4';
    }
    return 'md:col-span-6 lg:col-span-6';
  };

  const getCategoryVisuals = (category: string) => {
    switch (category) {
      case 'Generative AI':
        return {
          icon: Sparkles,
          pillClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          glowColor: 'purple' as const,
          accentText: 'text-purple-400',
          dotClass: 'bg-purple-400',
        };
      case 'Deep Learning':
        return {
          icon: Cpu,
          pillClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          glowColor: 'sky' as const,
          accentText: 'text-cyan-400',
          dotClass: 'bg-cyan-400',
        };
      case 'AI / Machine Learning':
        return {
          icon: Bot,
          pillClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          glowColor: 'emerald' as const,
          accentText: 'text-emerald-400',
          dotClass: 'bg-emerald-400',
        };
      case 'DevOps':
        return {
          icon: Workflow,
          pillClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          glowColor: 'amber' as const,
          accentText: 'text-amber-400',
          dotClass: 'bg-amber-400',
        };
      case 'Algorithms':
        return {
          icon: Binary,
          pillClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          glowColor: 'indigo' as const,
          accentText: 'text-indigo-400',
          dotClass: 'bg-indigo-400',
        };
      case 'Frontend':
        return {
          icon: Code,
          pillClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          glowColor: 'sky' as const,
          accentText: 'text-sky-400',
          dotClass: 'bg-sky-400',
        };
      case 'Full Stack':
      default:
        return {
          icon: Layers,
          pillClass: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
          glowColor: 'brand' as const,
          accentText: 'text-brand-400',
          dotClass: 'bg-brand-400',
        };
    }
  };

  const getStackLabels = (category: string) => {
    if (category === 'Generative AI' || category === 'Deep Learning' || category === 'AI / Machine Learning') {
      return {
        frontend: 'UI & Visualization:',
        frontendIcon: Code,
        backend: 'ML & Model Pipeline:',
        backendIcon: Cpu,
        database: 'Persistence & Embeddings:',
        databaseIcon: Database,
      };
    }
    if (category === 'DevOps') {
      return {
        frontend: 'Telemetry & UI:',
        frontendIcon: Code,
        backend: 'Orchestration & Services:',
        backendIcon: Server,
        database: 'Queues & Storage:',
        databaseIcon: Database,
      };
    }
    return {
      frontend: 'Frontend Stack:',
      frontendIcon: Code,
      backend: 'Backend Stack:',
      backendIcon: Server,
      database: 'Database & Storage:',
      databaseIcon: Database,
    };
  };

  return (
    <section id="projects" className="py-24 bg-dark-900/40 border-b border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <SectionHeading
            pill="Project Showcase"
            title="Featured Projects & Intelligent Systems"
            description="Production-grade Full Stack architectures, Generative AI Mixture-of-Experts, Deep Learning model benchmarks, and DevOps pipelines verified directly from my GitHub repositories. Displayed in a responsive, spacious Bento Grid."
          />
        </ScrollReveal>

        {/* Category Filter Pills (matching Skills & Technologies) */}
        <ScrollReveal variant="fade" duration={0.5} delay={0.12} className="w-full">
          <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((filter, idx) => {
              const isActive = activeFilter === filter;
              const count = projectsData.filter((p) => matchesFilter(p, filter)).length;

              return (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.94 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-400 border-brand-500/50 font-bold shadow-lg shadow-brand-500/15'
                      : 'bg-dark-900 text-slate-400 border-dark-800 hover:border-dark-700 hover:text-white'
                  }`}
                  data-interactive="true"
                >
                  <span>{filter}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-brand-400/20 text-brand-300' : 'bg-dark-850 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Spacious, Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const colSpanClass = getColSpanClass(idx, filteredProjects.length, activeFilter);
              const visuals = getCategoryVisuals(project.category);
              const CategoryIcon = visuals.icon;
              const labels = getStackLabels(project.category);
              const StackFrontendIcon = labels.frontendIcon;
              const StackBackendIcon = labels.backendIcon;
              const StackDatabaseIcon = labels.databaseIcon;

              return (
                <ScrollReveal
                  key={project.id}
                  className={`${colSpanClass} flex flex-col`}
                  variant="slide-up"
                  startY={28}
                  duration={0.55}
                  delay={idx * 0.05}
                >
                  <TiltCard
                    className="w-full h-full bg-dark-900/90 border border-dark-750 hover:border-brand-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between group backdrop-blur-xl transition-colors duration-300"
                    tiltIntensity={5}
                    glareOpacity={0.06}
                    glowColor={visuals.glowColor}
                  >
                    <div className="flex flex-col flex-1">
                      
                      {/* Card Header: Category & Date */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-800">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold ${visuals.pillClass}`}>
                            <CategoryIcon className="w-3.5 h-3.5" />
                            <span>{project.category}</span>
                          </span>
                          {project.featured && (
                            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-dark-950 text-slate-400 border border-dark-800 text-[10px] font-mono">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {project.date}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-brand-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-mono mb-4 leading-normal ${visuals.accentText}`}>
                        {project.subtitle}
                      </p>

                      {/* Visual Preview Image */}
                      {project.imageUrl && (
                        <div className="mb-5 rounded-2xl overflow-hidden border border-dark-800 bg-dark-950 relative aspect-[16/9] shadow-inner group/img">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover object-top filter brightness-90 group-hover/img:brightness-100 group-hover/img:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                            <span className="px-2 py-0.5 rounded bg-dark-900/90 border border-dark-750">
                              Production Architecture
                            </span>
                            <span className="text-brand-400 font-semibold">
                              Verified GitHub
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Detailed Solution / Summary */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {project.solution}
                      </p>

                      {/* Key Capabilities */}
                      <div className="mb-5 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Key Capabilities:
                        </div>
                        {project.keyCapabilities.slice(0, 3).map((cap, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Individual Technology Badges */}
                      <div className="p-3.5 rounded-2xl bg-dark-950/80 border border-dark-800 mb-6 space-y-3 text-xs font-mono">
                        <div>
                          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 text-[11px]">
                            <StackFrontendIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span>{labels.frontend}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.frontendStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-900 border border-dark-750 text-[11px] font-mono text-sky-300 font-medium hover:border-sky-500/40 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 text-[11px]">
                            <StackBackendIcon className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                            <span>{labels.backend}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.backendStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-900 border border-dark-750 text-[11px] font-mono text-brand-300 font-medium hover:border-brand-500/40 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.databaseStack && project.databaseStack.length > 0 && (
                          <div>
                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 text-[11px]">
                              <StackDatabaseIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span>{labels.database}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.databaseStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-900 border border-dark-750 text-[11px] font-mono text-indigo-300 font-medium hover:border-indigo-500/40 transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                  <span>{tech}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Footer Actions: Project Details, GitHub, Live Demo */}
                    <div className="pt-4 border-t border-dark-800/80 flex flex-wrap items-center gap-2.5">
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
                        GitHub Repo
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
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;

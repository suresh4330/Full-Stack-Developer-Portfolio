import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Layers,
  Code,
  Server,
  Database,
  Sparkles,
  Cpu,
  Bot,
  Workflow,
  Binary,
} from 'lucide-react';
import { Project } from '../../types';
import { Button } from '../ui/Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const getCategoryVisuals = (category: string) => {
    switch (category) {
      case 'Generative AI':
        return {
          icon: Sparkles,
          badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          dotClass: 'bg-purple-400',
        };
      case 'Deep Learning':
        return {
          icon: Cpu,
          badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          dotClass: 'bg-cyan-400',
        };
      case 'AI / Machine Learning':
        return {
          icon: Bot,
          badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          dotClass: 'bg-emerald-400',
        };
      case 'DevOps':
        return {
          icon: Workflow,
          badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dotClass: 'bg-amber-400',
        };
      case 'Algorithms':
        return {
          icon: Binary,
          badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          dotClass: 'bg-indigo-400',
        };
      case 'Frontend':
        return {
          icon: Code,
          badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          dotClass: 'bg-sky-400',
        };
      case 'Full Stack':
      default:
        return {
          icon: Layers,
          badgeClass: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
          dotClass: 'bg-brand-400',
        };
    }
  };

  const getStackLabels = (category: string) => {
    if (category === 'Generative AI' || category === 'Deep Learning' || category === 'AI / Machine Learning') {
      return {
        card1Title: 'Interface & Visualization',
        card1Color: 'text-sky-400',
        card2Title: 'AI & Model Architecture',
        card2Color: 'text-purple-400',
        card3Title: 'Embeddings & Persistence',
        card3Color: 'text-indigo-400',
      };
    }
    if (category === 'DevOps') {
      return {
        card1Title: 'Telemetry & Monitoring',
        card1Color: 'text-sky-400',
        card2Title: 'Orchestration & Microservices',
        card2Color: 'text-amber-400',
        card3Title: 'Queues & Persistence',
        card3Color: 'text-indigo-400',
      };
    }
    if (category === 'Algorithms') {
      return {
        card1Title: 'Algorithmic Visualizer',
        card1Color: 'text-sky-400',
        card2Title: 'Core Engine & Data Structures',
        card2Color: 'text-brand-400',
        card3Title: 'Memory & In-Memory Graph',
        card3Color: 'text-indigo-400',
      };
    }
    return {
      card1Title: 'Frontend Implementation',
      card1Color: 'text-sky-400',
      card2Title: 'Backend Implementation',
      card2Color: 'text-brand-400',
      card3Title: 'Database & Persistence',
      card3Color: 'text-indigo-400',
    };
  };

  return (
    <AnimatePresence>
      {project && (() => {
        const visuals = getCategoryVisuals(project.category);
        const CategoryIcon = visuals.icon;
        const labels = getStackLabels(project.category);

        return (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-dark-900 border border-dark-750 hover:border-brand-500/40 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl shadow-brand-500/10 relative text-left transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="sticky top-0 bg-dark-900/95 backdrop-blur-md px-6 py-4 border-b border-dark-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-xs font-semibold ${visuals.badgeClass}`}>
                    <CategoryIcon className="w-3.5 h-3.5" />
                    <span>{project.category}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.date} • {project.role}
                  </span>
                  {project.tags && project.tags.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-dark-850 text-slate-400 border border-dark-800 text-[10px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-dark-850 hover:bg-dark-800 border border-dark-750 hover:border-brand-500/50 transition-all group"
                  data-interactive="true"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-7">
                {/* Title & Headline */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5">
                    {project.title}
                  </h2>
                  <p className="text-sm font-medium text-brand-400 mb-4 font-mono">
                    {project.subtitle}
                  </p>

                  {/* Problem statement */}
                  <div className="p-4 rounded-xl bg-dark-950 border border-dark-800 text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    <span className="font-bold text-white">Problem Statement: </span>
                    {project.problemStatement}
                  </div>

                  {/* Image Preview if available */}
                  {project.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-dark-800 bg-dark-950 mb-4">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full max-h-72 object-cover object-top"
                      />
                    </div>
                  )}

                  {/* Solution Overview */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Technical Stack Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Card 1 */}
                  <div className="p-4 rounded-2xl bg-dark-850/80 border border-dark-750">
                    <div className={`flex items-center gap-2 mb-2.5 text-xs font-mono font-bold ${labels.card1Color}`}>
                      <Code className="w-4 h-4" />
                      <span>{labels.card1Title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.frontendStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-dark-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-2xl bg-dark-850/80 border border-dark-750">
                    <div className={`flex items-center gap-2 mb-2.5 text-xs font-mono font-bold ${labels.card2Color}`}>
                      <Server className="w-4 h-4" />
                      <span>{labels.card2Title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.backendStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-dark-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-2xl bg-dark-850/80 border border-dark-750">
                    <div className={`flex items-center gap-2 mb-2.5 text-xs font-mono font-bold ${labels.card3Color}`}>
                      <Database className="w-4 h-4" />
                      <span>{labels.card3Title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.databaseStack || ['In-Memory State Store']).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-dark-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architecture Summary */}
                <div className="p-4 rounded-2xl bg-dark-950 border border-dark-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>Architecture Summary</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.architectureSummary}
                  </p>
                </div>

                {/* Implemented Capabilities */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Verified Implemented Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {project.keyCapabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Engineering Challenges & Solutions</span>
                    </h4>
                    <div className="space-y-2.5">
                      {project.challenges.map((c, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-dark-850/90 border border-dark-750">
                          <div className="text-xs font-bold text-amber-300 mb-1">{c.title}</div>
                          <div className="text-xs text-slate-300 leading-relaxed">{c.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-dark-900/95 backdrop-blur-md px-6 py-4 border-t border-dark-800 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-mono text-slate-400">
                  Verified GitHub Repository
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    external
                    icon={<Github className="w-4 h-4" />}
                  >
                    View Repository
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.liveUrl}
                      external
                      icon={<ExternalLink className="w-4 h-4" />}
                    >
                      Live Demo
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

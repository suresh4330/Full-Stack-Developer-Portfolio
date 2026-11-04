import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { workflowSteps } from '../../data/workflow';
import { Compass, Layout, Code2, Server, Database, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

const stepIcons: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 text-sky-400" />,
  Layout: <Layout className="w-5 h-5 text-brand-400" />,
  Code2: <Code2 className="w-5 h-5 text-indigo-400" />,
  Server: <Server className="w-5 h-5 text-amber-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-teal-400" />,
};

export const WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = workflowSteps[activeStepIndex];

  return (
    <section id="workflow" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          pill="Engineering Process"
          title="How I Build Software"
          description="A disciplined, step-by-step full-stack engineering workflow from requirements analysis and interface design to API implementation and testing."
        />

        {/* Step Navigation Pills with Staggered Entrance */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {workflowSteps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <motion.button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-dark-900 border-brand-500/50 shadow-xl shadow-brand-500/10'
                    : 'bg-dark-900/60 border-dark-800 hover:border-dark-700 text-slate-400'
                }`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-dark-850 text-brand-400">
                    Step {step.step}
                  </span>
                  <div className="p-1 rounded bg-dark-850">
                    {stepIcons[step.icon]}
                  </div>
                </div>
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Step Detailed Card with 3D Tilt and AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <TiltCard
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
              tiltIntensity={5}
              glareOpacity={0.06}
              glowColor="brand"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-dark-800">
                    <div className="p-2.5 rounded-xl bg-dark-850 border border-dark-750">
                      {stepIcons[activeStep.icon]}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-brand-400">Phase 0{activeStep.step}</div>
                      <h3 className="text-xl font-bold text-white">{activeStep.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm font-mono text-slate-300">
                    Focus: {activeStep.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>

                {/* Right: Deliverables */}
                <div className="lg:col-span-5 bg-dark-950 p-5 rounded-2xl border border-dark-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Phase Deliverables & Standards</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeStep.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-3 border-t border-dark-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Standardized Full-Stack Flow</span>
                    <span className="text-brand-400">Step {activeStep.step} of {workflowSteps.length}</span>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Layout, ArrowRight, Server, Database, Globe, CheckCircle2 } from 'lucide-react';

interface LayerInfo {
  id: string;
  name: string;
  subtitle: string;
  technologies: string[];
  responsibilities: string[];
  dataFlowDescription: string;
  icon: React.ReactNode;
}

const layers: LayerInfo[] = [
  {
    id: 'frontend',
    name: 'Frontend Presentation',
    subtitle: 'React 18 • TypeScript • Tailwind CSS',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Context API'],
    responsibilities: [
      'Render responsive, accessible single-page user interfaces across all devices',
      'Manage client state, form validations, and optimistic UI mutations',
      'Handle user events and dispatch asynchronous HTTP requests to API endpoints',
    ],
    dataFlowDescription: 'Captures user intent and formats typed request payloads sent over HTTPS to the API layer.',
    icon: <Layout className="w-5 h-5 text-sky-400" />,
  },
  {
    id: 'api',
    name: 'REST API & Route Gateway',
    subtitle: 'HTTP Semantics • JSON Contracts • CORS',
    technologies: ['RESTful Routing', 'JSON Contracts', 'HTTP Status Codes', 'Input Validation'],
    responsibilities: [
      'Route incoming client requests to matching controller handlers',
      'Validate request bodies, query parameters, and header formats',
      'Enforce security policies, rate checks, and standardized error responses',
    ],
    dataFlowDescription: 'Validates structure and forwards sanitized payloads to business logic handlers.',
    icon: <Globe className="w-5 h-5 text-brand-400" />,
  },
  {
    id: 'backend',
    name: 'Backend Application Logic',
    subtitle: 'Node.js Express • Python FastAPI • JWT Auth',
    technologies: ['Node.js', 'Express.js', 'FastAPI', 'Stateless JWT', 'RBAC Middleware'],
    responsibilities: [
      'Execute core application business rules and data mutations',
      'Verify cryptographically signed JWT tokens and check user permissions',
      'Coordinate transactions and sanitize data before storage persistence',
    ],
    dataFlowDescription: 'Executes domain rules, checks permissions, and queries the database layer.',
    icon: <Server className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: 'database',
    name: 'Database Persistence Layer',
    subtitle: 'PostgreSQL • MongoDB Atlas',
    technologies: ['PostgreSQL', 'MongoDB Atlas', 'Mongoose ODM', 'Relational Schemas'],
    responsibilities: [
      'Persist structured user, appointment, and inventory records reliably',
      'Guarantee foreign key constraints, uniqueness, and transaction safety',
      'Execute optimized queries and return sanitized records to the backend',
    ],
    dataFlowDescription: 'Safely stores records and returns queried documents back to the backend service.',
    icon: <Database className="w-5 h-5 text-emerald-400" />,
  },
];

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<LayerInfo>(layers[0]);

  return (
    <section id="architecture" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          pill="Full Stack Architecture"
          title="Interactive Application Flow"
          description="How data flows through a clean, decoupled full-stack architecture—from user interactions in the client down to persistent database storage."
        />

        {/* Interactive 4-Node Architecture Diagram with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer.id === layer.id;
            return (
              <motion.div
                key={layer.id}
                onClick={() => setSelectedLayer(layer)}
                className={`cursor-pointer p-5 rounded-3xl border transition-all duration-300 relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-dark-900 border-brand-500/50 shadow-xl shadow-brand-500/10'
                    : 'bg-dark-900/60 border-dark-750 hover:border-dark-600 hover:bg-dark-900'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-dark-850 border border-dark-750 group-hover:scale-110 transition-transform">
                      {layer.icon}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    {layer.name}
                  </h3>
                  <p className="text-[11px] font-mono text-brand-400 mb-3">
                    {layer.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className={isSelected ? 'text-brand-400 font-semibold' : ''}>
                    {isSelected ? 'Active Layer' : 'Click to Inspect'}
                  </span>
                  {idx < layers.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden lg:inline group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Layer Details Panel with Smooth AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedLayer.id}
            className="bg-dark-900/90 border border-dark-750 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Responsibilities */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-dark-800">
                  <span className="p-2 rounded-xl bg-dark-850 text-brand-400">
                    {selectedLayer.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedLayer.name}</h3>
                    <p className="text-xs font-mono text-slate-400">{selectedLayer.subtitle}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Core Architectural Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedLayer.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-slate-300">
                  <span className="font-semibold text-white">Data Lifecycle: </span>
                  {selectedLayer.dataFlowDescription}
                </div>
              </div>

              {/* Right: Technologies Used */}
              <div className="lg:col-span-5 bg-dark-950 p-5 rounded-2xl border border-dark-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Verified Technologies in this Layer
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedLayer.technologies.map((t) => (
                    <motion.span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-dark-850 text-brand-400 border border-dark-750"
                      whileHover={{ scale: 1.05, y: -1 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
                <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                  Applied across production repositories (StockFlow, Medical Appointment System, Food Delivery Platform).
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

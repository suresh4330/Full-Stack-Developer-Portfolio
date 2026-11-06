import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Server, ShieldCheck, Database, KeyRound, Code2, Play, CheckCircle2, RotateCw, Copy, Check, Zap } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { ScrollReveal } from '../ui/ScrollReveal';

interface MockEndpoint {
  method: 'POST' | 'GET';
  path: string;
  description: string;
  status: number;
  headers: Record<string, string>;
  responsePayload: object;
}

const mockEndpoints: MockEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'Stateless user authentication generating signed JWT with role claim',
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    responsePayload: {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl85NDIxIiwicm9sZSI6IkRPQ1RPUiJ9...',
      user: {
        id: 'usr_9421',
        name: 'Suresh Kumar',
        role: 'DOCTOR',
        permissions: ['read:appointments', 'write:prescriptions'],
      },
      expiresIn: '24h',
    },
  },
  {
    method: 'POST',
    path: '/api/v1/appointments',
    description: 'Creates patient appointment with role verification and conflict avoidance',
    status: 201,
    headers: {
      'Authorization': 'Bearer <token>',
      'Content-Type': 'application/json',
    },
    responsePayload: {
      appointmentId: 'apt_5510',
      patientId: 'pat_8819',
      doctorId: 'doc_102',
      status: 'CONFIRMED',
      scheduledAt: '2026-11-04T10:30:00Z',
      conflictCheck: 'PASSED',
    },
  },
  {
    method: 'GET',
    path: '/api/v1/inventory/items',
    description: 'FastAPI relational query retrieving categorized stock and thresholds',
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    responsePayload: {
      count: 24,
      queryTimeMs: 14.2,
      items: [
        { id: 'sku_101', name: 'Standard Component', quantity: 180, reorderLevel: 25 },
        { id: 'sku_102', name: 'Micro Controller Unit', quantity: 42, reorderLevel: 50 },
      ],
    },
  },
];

export const BackendSection: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<MockEndpoint>(mockEndpoints[0]);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [latencyStats, setLatencyStats] = useState({
    dns: 2,
    handshake: 8,
    db: 14,
    total: 24,
    size: '412 B',
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedEndpoint.responsePayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleExecuteRequest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(1);

    setTimeout(() => {
      setSimulationStep(2);
      setTimeout(() => {
        setSimulationStep(3);
        setTimeout(() => {
          setSimulationStep(4);
          setIsSimulating(false);
          const dbTime = Math.floor(Math.random() * 5) + 11;
          const totalTime = 2 + 7 + dbTime;
          setLatencyStats({
            dns: 2,
            handshake: 7,
            db: dbTime,
            total: totalTime,
            size: selectedEndpoint.method === 'POST' ? '412 B' : '528 B',
          });
        }, 340);
      }, 260);
    }, 220);
  };

  const renderSyntaxHighlightedJSON = (jsonObj: object) => {
    const jsonStr = JSON.stringify(jsonObj, null, 2);
    return jsonStr.split('\n').map((line, idx) => {
      const keyMatch = line.match(/^(\s*)(".*?"):(.*)$/);
      if (keyMatch) {
        const indent = keyMatch[1];
        const key = keyMatch[2];
        const val = keyMatch[3];
        return (
          <div key={idx} className="font-mono text-[11px] sm:text-xs leading-relaxed">
            <span className="text-slate-600">{indent}</span>
            <span className="text-sky-300">{key}</span>:
            <span className={val.includes('"') ? 'text-emerald-300' : 'text-amber-300'}>{val}</span>
          </div>
        );
      }
      return (
        <div key={idx} className="font-mono text-[11px] sm:text-xs leading-relaxed text-slate-400">
          {line}
        </div>
      );
    });
  };

  return (
    <section id="backend" className="py-24 bg-dark-900/40 border-b border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="slide-up" startY={30} duration={0.6} delay={0.05}>
          <SectionHeading
            pill="Backend Engineering"
            title="Scalable Server Architecture & Data Management"
            description="Engineering stateless REST APIs, role-based authorization, and reliable data persistence across Node.js, Express, FastAPI, and structured databases."
          />
        </ScrollReveal>

        {/* 2-Column Showcase matching Frontend visual weight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Backend Engineering Pillars */}
          <div className="lg:col-span-6 space-y-4">
            
            <ScrollReveal variant="slide-up" startY={25} duration={0.6} delay={0.1}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-brand-500/40 transition-all duration-300 shadow-lg group"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                    <Server className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                    Stateless RESTful API Architecture
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Developing structured REST API routes across Node.js/Express and Python/FastAPI. Enforcing HTTP semantic standards, route validation, input sanitization, and centralized error-handling middleware.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Node.js', 'Express.js', 'FastAPI', 'RESTful Design', 'OpenAPI'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-brand-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" startY={25} duration={0.6} delay={0.16}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-indigo-500/40 transition-all duration-300 shadow-lg group"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Authentication & Role-Based Access Control
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Implementing cryptographic JWT token issuance, Bearer authentication headers, and granular authorization route guards to protect endpoints based on user roles (e.g., patient, doctor, administrator).
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Stateless JWT', 'RBAC Middleware', 'Route Guards', 'Password Hashing'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-indigo-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" startY={25} duration={0.6} delay={0.22}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-sky-500/40 transition-all duration-300 shadow-lg group"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    Relational & Document Database Persistence
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Structuring normalized relational schemas with foreign key integrity in PostgreSQL, as well as flexible document collections in MongoDB Atlas via Mongoose schema validators.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['PostgreSQL', 'MongoDB Atlas', 'Mongoose ODM', 'ACID Transactions'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-sky-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>

          </div>

          {/* Right Column: Interactive API Endpoint Simulator */}
          <ScrollReveal variant="slide-up" startY={35} duration={0.7} delay={0.15} className="lg:col-span-6">
            <TiltCard
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
              tiltIntensity={6}
              glareOpacity={0.06}
              glowColor="indigo"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Interactive API Request Simulator
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      Live contract dispatch with simulated latency trace
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-dark-950 border border-dark-800 text-brand-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                  <span>Live Simulator</span>
                </div>
              </div>

              {/* Endpoint Selector Tabs */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                {mockEndpoints.map((ep) => (
                  <motion.button
                    key={ep.path}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setSimulationStep(0);
                    }}
                    className={`flex-1 p-2.5 rounded-xl text-left font-mono transition-all border ${
                      selectedEndpoint.path === ep.path
                        ? 'bg-dark-850 border-brand-500/50 text-white shadow-md'
                        : 'bg-dark-950 border-dark-800 text-slate-400 hover:border-dark-700'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    data-interactive="true"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      <span className={ep.method === 'POST' ? 'text-amber-400' : 'text-sky-400'}>
                        {ep.method}
                      </span>
                      <span className="text-slate-300 truncate">{ep.path}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Dispatch Action Control Bar */}
              <div className="p-3 rounded-2xl bg-dark-950 border border-dark-800 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-dark-850 border border-dark-750 text-[11px] font-mono font-bold text-slate-300">
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-xs font-mono text-slate-200 truncate">
                    {selectedEndpoint.path}
                  </span>
                </div>

                <motion.button
                  onClick={handleExecuteRequest}
                  disabled={isSimulating}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-950 font-mono font-bold text-xs shadow-md shadow-brand-500/20 transition-all disabled:opacity-60"
                  data-interactive="true"
                >
                  {isSimulating ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : simulationStep === 4 ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Re-test Request</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Send Request</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Live Latency & Waterfall Status Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-dark-950 border border-dark-800 flex flex-col justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>HTTP {selectedEndpoint.status}</span>
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-dark-950 border border-dark-800 flex flex-col justify-between">
                  <span className="text-slate-500">Total Latency</span>
                  <span className="text-brand-400 font-bold mt-0.5">
                    {isSimulating ? 'Measuring...' : `${latencyStats.total}ms`}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-dark-950 border border-dark-800 flex flex-col justify-between">
                  <span className="text-slate-500">DB Execution</span>
                  <span className="text-indigo-400 font-bold mt-0.5">
                    {isSimulating ? 'Querying...' : `${latencyStats.db}ms`}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-dark-950 border border-dark-800 flex flex-col justify-between">
                  <span className="text-slate-500">Payload Size</span>
                  <span className="text-sky-400 font-bold mt-0.5">
                    {latencyStats.size}
                  </span>
                </div>
              </div>

              {/* Active Endpoint Spec Box */}
              <div className="bg-dark-950 rounded-2xl border border-dark-800 overflow-hidden mb-4 shadow-inner">
                <div className="px-3.5 py-2 bg-dark-850/90 border-b border-dark-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-brand-400" />
                    <span className="text-slate-300 text-[11px]">Response JSON Payload</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                    data-interactive="true"
                  >
                    {copiedPayload ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 overflow-x-auto max-h-[190px] select-text">
                  <AnimatePresence mode="wait">
                    {isSimulating ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400 font-mono text-xs"
                      >
                        <RotateCw className="w-5 h-5 text-brand-400 animate-spin" />
                        <span>
                          {simulationStep === 1
                            ? 'Resolving DNS & Handshake...'
                            : simulationStep === 2
                            ? 'Verifying JWT Cryptographic Claim...'
                            : 'Executing Parameterized SQL Query...'}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={selectedEndpoint.path}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderSyntaxHighlightedJSON(selectedEndpoint.responsePayload)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-850/60 border border-dark-800 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span>Stateless JWT auth • Parameterized queries • RBAC guards</span>
                </span>
                <span className="text-[10px] font-mono text-brand-400 shrink-0">Validated</span>
              </div>
            </TiltCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

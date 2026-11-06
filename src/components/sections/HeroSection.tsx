import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, FileText, Mail, Github, Linkedin, Code, Server, Layers, Clock } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';
import { TextReveal } from '../ui/TextReveal';

interface HeroSectionProps {
  isPageLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isPageLoaded = true }) => {
  const prefersReducedMotion = useReducedMotion();
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Staggered page-load reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: prefersReducedMotion ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[84vh] flex items-center pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Call to Actions */}
          <motion.div
            className="lg:col-span-7 text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isPageLoaded ? 'visible' : 'hidden'}
          >
            {/* Live IST Time & Availability Beacon */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-dark-750 text-xs font-mono shadow-sm">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-slate-400">IST (UTC+5:30):</span>
                <span className="text-brand-300 font-bold">{istTime || '11:00:00 PM'}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-emerald-400 font-medium">Available for Opportunities (2027)</span>
              </div>
            </motion.div>

            {/* Professional Role Pill */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900 border border-dark-750 text-xs font-mono shadow-sm hover:border-brand-500/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Full Stack Developer</span>
                <span className="text-dark-600">•</span>
                <span className="text-brand-400 font-semibold">Software Engineer</span>
              </div>
            </motion.div>

            {/* Candidate Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                <TextReveal text={profileData.name} delay={0.15} />
              </h1>
            </motion.div>

            {/* Expressive Headline with Shimmer Effect */}
            <motion.div variants={itemVariants}>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-200 leading-snug">
                Building Beautiful Interfaces.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-400 font-bold animate-shimmer">
                  Engineering Powerful Applications.
                </span>
              </p>
            </motion.div>

            {/* Concise Verified Summary */}
            <motion.div variants={itemVariants}>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {profileData.summary}
              </p>
            </motion.div>

            {/* Core Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <MagneticButton pullFactor={0.18}>
                <Button
                  variant="primary"
                  size="lg"
                  href="#projects"
                  icon={<ArrowDown className="w-4 h-4" />}
                >
                  Explore Projects
                </Button>
              </MagneticButton>

              <MagneticButton pullFactor={0.18}>
                <Button
                  variant="secondary"
                  size="lg"
                  href={profileData.resumeUrl}
                  download="Annamneedi_Suresh_Kumar_Resume.pdf"
                  icon={<FileText className="w-4 h-4" />}
                >
                  Download Resume
                </Button>
              </MagneticButton>

              <MagneticButton pullFactor={0.18}>
                <Button
                  variant="outline"
                  size="lg"
                  href="#contact"
                  icon={<Mail className="w-4 h-4" />}
                >
                  Contact Me
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Key Full-Stack Capabilities Bar */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 max-w-xl pt-6 border-t border-dark-800 text-xs font-mono text-slate-300">
              <motion.div 
                className="flex items-center gap-2 p-3 rounded-2xl bg-dark-900/60 border border-dark-800 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/15 transition-all cursor-default group"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Code className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Frontend Craft</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 p-3 rounded-2xl bg-dark-900/60 border border-dark-800 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/15 transition-all cursor-default group"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Server className="w-4 h-4 text-brand-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Backend APIs</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 p-3 rounded-2xl bg-dark-900/60 border border-dark-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/15 transition-all cursor-default group"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Layers className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Full Stack Flow</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Tilt Portrait Presentation Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={cardVariants}
            initial="hidden"
            animate={isPageLoaded ? 'visible' : 'hidden'}
          >
            <div className="w-full max-w-[300px] sm:max-w-[340px]">
              <TiltCard
                className="w-full rounded-3xl bg-dark-900/90 border border-dark-750 p-3.5 shadow-2xl backdrop-blur-xl"
                tiltIntensity={9}
                glareOpacity={0.12}
                glowColor="brand"
              >
                {/* Natural Photo Frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark-950 border border-dark-800 group/photo">
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover/photo:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Bottom title banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-white tracking-tight">
                          {profileData.shortName}
                        </h2>
                        <p className="text-[11px] font-mono text-brand-400">
                          Full Stack Developer
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MagneticButton pullFactor={0.25}>
                          <motion.a
                            href={profileData.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white transition-colors block border border-dark-750"
                            aria-label="GitHub"
                            data-interactive="true"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </motion.a>
                        </MagneticButton>
                        <MagneticButton pullFactor={0.25}>
                          <motion.a
                            href={profileData.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white transition-colors block border border-dark-750"
                            aria-label="LinkedIn"
                            data-interactive="true"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </motion.a>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

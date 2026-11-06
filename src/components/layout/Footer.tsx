import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profile';
import { ScrollReveal } from '../ui/ScrollReveal';
import { MagneticButton } from '../ui/MagneticButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      element.classList.remove('section-highlight');
      void element.offsetWidth;
      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 1500);
    }
  };

  return (
    <footer className="border-t border-dark-800 bg-dark-950 py-12 text-slate-400 text-xs sm:text-sm relative overflow-hidden">
      {/* Subtle top gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent pointer-events-none" />

      <ScrollReveal variant="slide-up" startY={25} duration={0.6} delay={0.05} className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-dark-850">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="font-semibold text-white text-base">
                {profileData.name}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {profileData.role} • Lovely Professional University (2027)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Frontend', href: '#frontend' },
                { name: 'Backend', href: '#backend' },
                { name: 'Projects', href: '#projects' },
                { name: 'Workflow', href: '#workflow' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-400 hover:text-brand-400 transition-colors"
                  data-interactive="true"
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton pullFactor={0.2}>
                <motion.a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 rounded-xl bg-dark-850 border border-dark-700 hover:border-slate-500 hover:text-white transition-colors block"
                  data-interactive="true"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              </MagneticButton>

              <MagneticButton pullFactor={0.2}>
                <motion.a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 rounded-xl bg-dark-850 border border-dark-700 hover:border-slate-500 hover:text-white transition-colors block"
                  data-interactive="true"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </MagneticButton>

              <MagneticButton pullFactor={0.2}>
                <motion.a
                  href={`mailto:${profileData.contact.email}`}
                  aria-label="Email"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 rounded-xl bg-dark-850 border border-dark-700 hover:border-slate-500 hover:text-white transition-colors block"
                  data-interactive="true"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </MagneticButton>

              <MagneticButton pullFactor={0.25}>
                <motion.button
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-dark-850 border border-dark-700 hover:border-brand-500/50 hover:text-brand-400 transition-colors ml-2 shadow-sm"
                  data-interactive="true"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              </MagneticButton>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p className="text-slate-500">
              © {new Date().getFullYear()} Annamneedi Suresh Kumar. All technical details verified from CV and repository inspection.
            </p>
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-slate-500">Built with React, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;

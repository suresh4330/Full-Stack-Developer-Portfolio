import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, FileText, Github, Linkedin, Search, Command } from 'lucide-react';
import { profileData } from '../../data/profile';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  isPageLoaded?: boolean;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Frontend', href: '#frontend' },
  { name: 'Backend', href: '#backend' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Projects', href: '#projects' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, isPageLoaded = true }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      setActiveSection(targetId);
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
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: prefersReducedMotion ? 0 : -60, opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ y: isPageLoaded ? 0 : -60, opacity: isPageLoaded ? 1 : 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-dark-800/80 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <MagneticButton pullFactor={0.15}>
            <motion.a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl p-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-9 h-9 rounded-xl bg-dark-900 border border-dark-750 flex items-center justify-center text-brand-400 font-mono font-bold text-xs group-hover:border-brand-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all">
                ASK
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-brand-400 transition-colors">
                  Annamneedi Suresh Kumar
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Full Stack Developer
                </span>
              </div>
            </motion.a>
          </MagneticButton>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-dark-900/60 p-1.5 rounded-full border border-dark-800/80 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 z-10 ${
                    isActive
                      ? 'text-dark-950 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-dark-800/50'
                  }`}
                  data-interactive="true"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-400 rounded-full z-[-1] shadow-md shadow-brand-500/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                  {link.name}
                </motion.a>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenCommandPalette && (
              <MagneticButton pullFactor={0.15}>
                <motion.button
                  onClick={onOpenCommandPalette}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-brand-500/50 text-slate-400 hover:text-white transition-all text-xs font-mono group"
                  aria-label="Open Command Palette (Ctrl+K)"
                  data-interactive="true"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline text-[11px] text-slate-300">Search</span>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-dark-850 border border-dark-700 text-[10px] text-slate-400 font-mono">
                    <Command className="w-2.5 h-2.5" />
                    <span>K</span>
                  </div>
                </motion.button>
              </MagneticButton>
            )}

            <MagneticButton pullFactor={0.2}>
              <motion.a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-850 rounded-xl border border-transparent hover:border-dark-750 transition-all inline-block"
                data-interactive="true"
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </MagneticButton>

            <MagneticButton pullFactor={0.2}>
              <motion.a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-850 rounded-xl border border-transparent hover:border-dark-750 transition-all inline-block"
                data-interactive="true"
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </MagneticButton>

            <MagneticButton pullFactor={0.15}>
              <motion.a
                href={profileData.resumeUrl}
                download="Annamneedi_Suresh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30 hover:bg-brand-500 hover:text-dark-950 transition-all duration-200 shadow-sm"
                data-interactive="true"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-900 rounded-lg border border-dark-800"
                aria-label="Search"
                data-interactive="true"
              >
                <Search className="w-4 h-4 text-brand-400" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-dark-900 rounded-lg border border-dark-800 transition-colors"
              aria-label="Toggle menu"
              data-interactive="true"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden bg-dark-950/95 border-b border-dark-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-400 font-bold'
                      : 'bg-dark-900 border-dark-800 text-slate-300 hover:border-dark-700'
                  }`}
                  data-interactive="true"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-dark-850">
              <a
                href={profileData.resumeUrl}
                download="Annamneedi_Suresh_Kumar_Resume.pdf"
                className="flex-1 py-2 rounded-xl text-xs font-mono font-semibold bg-brand-500 text-dark-950 flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
                data-interactive="true"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <div className="flex items-center gap-1">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-dark-900 border border-dark-800"
                  aria-label="GitHub"
                  data-interactive="true"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-dark-900 border border-dark-800"
                  aria-label="LinkedIn"
                  data-interactive="true"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

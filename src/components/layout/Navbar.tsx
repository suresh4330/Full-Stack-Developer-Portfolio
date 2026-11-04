import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Github, Linkedin, ArrowUpRight, Search, Command } from 'lucide-react';
import { profileData } from '../../data/profile';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
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

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
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
      // Add subtle section highlight pulse
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

      // Simple active section detection
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/80 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <MagneticButton pullFactor={0.15}>
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-dark-900 border border-dark-750 flex items-center justify-center text-brand-400 font-mono font-bold text-xs group-hover:border-brand-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
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
            </a>
          </MagneticButton>

          {/* Desktop Navigation with Animated layoutId Indicator */}
          <nav className="hidden xl:flex items-center gap-1 bg-dark-900/60 p-1.5 rounded-full border border-dark-800/80 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 z-10 ${
                    isActive ? 'text-dark-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                  data-interactive="true"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-400 rounded-full z-[-1] shadow-md shadow-brand-500/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Resume, Command Palette & Social */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenCommandPalette && (
              <MagneticButton pullFactor={0.15}>
                <button
                  onClick={onOpenCommandPalette}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-brand-500/50 text-slate-400 hover:text-white transition-all text-xs font-mono group"
                  aria-label="Open Command Palette (Ctrl+K)"
                  data-interactive="true"
                >
                  <Search className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline text-[11px] text-slate-300">Search</span>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-dark-850 border border-dark-700 text-[10px] text-slate-400 font-mono">
                    <Command className="w-2.5 h-2.5" />
                    <span>K</span>
                  </div>
                </button>
              </MagneticButton>
            )}

            <MagneticButton pullFactor={0.2}>
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-850 rounded-xl border border-transparent hover:border-dark-750 transition-colors inline-block"
                data-interactive="true"
              >
                <Github className="w-4 h-4" />
              </a>
            </MagneticButton>
            <MagneticButton pullFactor={0.2}>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-850 rounded-xl border border-transparent hover:border-dark-750 transition-colors inline-block"
                data-interactive="true"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton pullFactor={0.15}>
              <a
                href={profileData.resumeUrl}
                download="Annamneedi_Suresh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30 hover:bg-brand-500 hover:text-dark-950 transition-all duration-200 shadow-sm"
                data-interactive="true"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu & Command Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                aria-label="Open Command Palette"
                className="p-2 text-slate-300 hover:text-white bg-dark-900 hover:bg-dark-850 rounded-xl border border-dark-800 transition-colors"
                data-interactive="true"
              >
                <Search className="w-4 h-4 text-brand-400" />
              </button>
            )}
            <a
              href={profileData.resumeUrl}
              download="Annamneedi_Suresh_Kumar_Resume.pdf"
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-brand-500/10 text-brand-400 border border-brand-500/30"
            >
              <FileText className="w-3 h-3" />
              <span>CV</span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 text-slate-400 hover:text-white hover:bg-dark-850 rounded-xl border border-dark-800 transition-colors"
              data-interactive="true"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="xl:hidden mt-3 p-5 bg-dark-900/95 border border-dark-800 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col gap-1 pb-4 border-b border-dark-800">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-dark-850 rounded-xl transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </motion.a>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-2.5">
                <a
                  href={profileData.resumeUrl}
                  download="Annamneedi_Suresh_Kumar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-mono bg-brand-500 text-dark-950 font-bold"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Verified Resume</span>
                </a>
                <div className="flex gap-2">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-dark-850 border border-dark-750"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-dark-850 border border-dark-750"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

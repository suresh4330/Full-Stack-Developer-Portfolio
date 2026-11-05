import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Layers,
  FolderCode,
  Sparkles,
  Command,
  CornerDownLeft,
  X,
  Phone,
  Sliders,
  Wind,
  Zap,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { useAnimationConfig } from '../../context/AnimationContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Social & Links';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setMode, setIsControlPanelOpen } = useAnimationConfig();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
        element.classList.remove('section-highlight');
        void element.offsetWidth;
        element.classList.add('section-highlight');
        setTimeout(() => element.classList.remove('section-highlight'), 1500);
      }
    }, 100);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => {
      setCopiedNotification(null);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Me',
      subtitle: 'Full stack development & engineering mindset',
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      action: () => scrollToSection('about'),
      keywords: ['about', 'bio', 'education', 'suresh', 'annamneedi'],
    },
    {
      id: 'nav-frontend',
      category: 'Navigation',
      title: 'Frontend Engineering',
      subtitle: 'React 18, TypeScript, Tailwind, interactive sandbox',
      icon: <Sparkles className="w-4 h-4 text-sky-400" />,
      action: () => scrollToSection('frontend'),
      keywords: ['frontend', 'react', 'typescript', 'ui', 'components'],
    },
    {
      id: 'nav-backend',
      category: 'Navigation',
      title: 'Backend Engineering',
      subtitle: 'Node.js, Express, FastAPI, REST contracts',
      icon: <Layers className="w-4 h-4 text-brand-400" />,
      action: () => scrollToSection('backend'),
      keywords: ['backend', 'api', 'fastapi', 'express', 'node', 'jwt'],
    },
    {
      id: 'nav-architecture',
      category: 'Navigation',
      title: 'Architecture & System Flow',
      subtitle: '4-tier decoupled application flow',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection('architecture'),
      keywords: ['architecture', 'flow', 'layers', 'data', 'database'],
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Featured Projects',
      subtitle: 'Bento Grid showcase of verified repositories',
      icon: <FolderCode className="w-4 h-4 text-emerald-400" />,
      action: () => scrollToSection('projects'),
      keywords: ['projects', 'repos', 'github', 'work', 'code'],
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills & Capabilities',
      subtitle: 'Interactive Bento Grid of technical proficiencies',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => scrollToSection('skills'),
      keywords: ['skills', 'tech', 'stack', 'languages', 'tools'],
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Experience & Milestones',
      subtitle: 'Hackathons and technical training programs',
      icon: <Layers className="w-4 h-4 text-brand-400" />,
      action: () => scrollToSection('experience'),
      keywords: ['experience', 'hackathons', 'milestones', 'awards'],
    },
    {
      id: 'nav-education',
      category: 'Navigation',
      title: 'Education & Academics',
      subtitle: 'Lovely Professional University (8.32 CGPA, 2027)',
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      action: () => scrollToSection('education'),
      keywords: ['education', 'lpu', 'degree', 'cgpa', 'btech'],
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact Information',
      subtitle: 'Direct email and contact channels',
      icon: <Mail className="w-4 h-4 text-brand-400" />,
      action: () => scrollToSection('contact'),
      keywords: ['contact', 'email', 'phone', 'hire', 'message'],
    },

    // Projects Direct
    ...projectsData.map((project) => ({
      id: `project-${project.id}`,
      category: 'Projects' as const,
      title: project.title,
      subtitle: `${project.category} • ${project.subtitle}`,
      icon: <FolderCode className="w-4 h-4 text-brand-400" />,
      action: () => {
        onClose();
        if (onOpenProject) {
          onOpenProject(project.id);
        } else {
          scrollToSection('projects');
        }
      },
      keywords: [
        project.title.toLowerCase(),
        project.category.toLowerCase(),
        ...project.frontendStack.map((s) => s.toLowerCase()),
        ...project.backendStack.map((s) => s.toLowerCase()),
      ],
    })),

    // Actions
    {
      id: 'action-resume',
      category: 'Actions',
      title: 'Download Verified Resume (PDF)',
      subtitle: 'Static verified copy (Annamneedi_Suresh_Kumar_Resume.pdf)',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = profileData.resumeUrl;
        a.download = 'Annamneedi_Suresh_Kumar_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      keywords: ['resume', 'cv', 'pdf', 'download'],
    },
    {
      id: 'action-copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      subtitle: profileData.contact.email,
      icon: <Copy className="w-4 h-4 text-sky-400" />,
      action: () => copyToClipboard(profileData.contact.email, 'Email copied to clipboard!'),
      keywords: ['email', 'copy', 'mail', 'address'],
    },
    {
      id: 'action-copy-phone',
      category: 'Actions',
      title: 'Copy Mobile Number',
      subtitle: profileData.contact.mobile,
      icon: <Phone className="w-4 h-4 text-sky-400" />,
      action: () => copyToClipboard(profileData.contact.mobile, 'Phone copied to clipboard!'),
      keywords: ['phone', 'mobile', 'call', 'whatsapp'],
    },
    {
      id: 'action-atmosphere-controls',
      category: 'Actions',
      title: 'Open Atmosphere & Animation Controls',
      subtitle: 'Adjust cloud speed, bird flight, moon glow & ocean shimmer',
      icon: <Sliders className="w-4 h-4 text-brand-400" />,
      action: () => {
        onClose();
        setIsControlPanelOpen(true);
      },
      keywords: ['animation', 'controls', 'atmosphere', 'motion', 'sliders', 'settings'],
    },
    {
      id: 'action-anim-cinematic',
      category: 'Actions',
      title: 'Animation Mode: Cinematic',
      subtitle: 'Full motion with flying birds and ocean shimmer',
      icon: <Sparkles className="w-4 h-4 text-brand-400" />,
      action: () => {
        setMode('cinematic');
        onClose();
      },
      keywords: ['cinematic', 'animation', 'full', 'normal', 'birds'],
    },
    {
      id: 'action-anim-reduced',
      category: 'Actions',
      title: 'Animation Mode: Reduced Motion',
      subtitle: 'Accessible, minimal movement mode',
      icon: <Wind className="w-4 h-4 text-amber-400" />,
      action: () => {
        setMode('reduced');
        onClose();
      },
      keywords: ['reduced', 'motion', 'accessible', 'slow'],
    },
    {
      id: 'action-anim-static',
      category: 'Actions',
      title: 'Animation Mode: Static Background',
      subtitle: 'Zero continuous rendering loop (battery-saver)',
      icon: <Zap className="w-4 h-4 text-slate-400" />,
      action: () => {
        setMode('static');
        onClose();
      },
      keywords: ['static', 'pause', 'stop', 'battery'],
    },

    // Social Links
    {
      id: 'link-github',
      category: 'Social & Links',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/suresh4330',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => {
        onClose();
        window.open(profileData.contact.github, '_blank', 'noopener,noreferrer');
      },
      keywords: ['github', 'profile', 'git', 'repositories'],
    },
    {
      id: 'link-linkedin',
      category: 'Social & Links',
      title: 'Open LinkedIn Profile',
      subtitle: 'in/annamneedi-suresh-kumar',
      icon: <Linkedin className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        window.open(profileData.contact.linkedin, '_blank', 'noopener,noreferrer');
      },
      keywords: ['linkedin', 'profile', 'network', 'social'],
    },
  ];

  const filteredCommands = query.trim()
    ? commands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.title.toLowerCase().includes(q) ||
          (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
          cmd.category.toLowerCase().includes(q) ||
          (cmd.keywords && cmd.keywords.some((kw) => kw.includes(q)))
        );
      })
    : commands;

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Group filtered commands
  const groupedCategories = Array.from(
    new Set(filteredCommands.map((cmd) => cmd.category))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 p-4 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl bg-dark-900 border border-dark-750 hover:border-brand-500/40 rounded-3xl shadow-2xl shadow-brand-500/10 overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Developer Command Palette"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-800 bg-dark-950/80">
              <Search className="w-5 h-5 text-brand-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, project, technology, or action..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-dark-850 border border-dark-750 text-[10px] font-mono text-slate-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* Notification Toast if copied */}
            <AnimatePresence>
              {copiedNotification && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-500/10 border-b border-brand-500/20 px-5 py-2 text-xs font-mono text-brand-400 flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>{copiedNotification}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Command Results List */}
            <div className="max-h-[380px] sm:max-h-[440px] overflow-y-auto p-2.5 space-y-4">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm">No commands matching "{query}"</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Try searching for "StockFlow", "Resume", "FastAPI", or "Contact"
                  </p>
                </div>
              ) : (
                groupedCategories.map((category) => {
                  const categoryItems = filteredCommands.filter((c) => c.category === category);
                  return (
                    <div key={category}>
                      <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                        {category}
                      </div>
                      <div className="space-y-1">
                        {categoryItems.map((cmd) => {
                          const itemIndex = filteredCommands.indexOf(cmd);
                          const isSelected = itemIndex === selectedIndex;
                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all ${
                                isSelected
                                  ? 'bg-dark-850 text-white border border-brand-500/40 shadow-sm'
                                  : 'text-slate-300 hover:bg-dark-850/60 border border-transparent'
                              }`}
                              data-interactive="true"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`p-2 rounded-xl transition-colors ${
                                    isSelected
                                      ? 'bg-brand-500/15 border border-brand-500/30'
                                      : 'bg-dark-950 border border-dark-800'
                                  }`}
                                >
                                  {cmd.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs sm:text-sm font-semibold truncate">
                                    {cmd.title}
                                  </div>
                                  {cmd.subtitle && (
                                    <div className="text-[11px] font-mono text-slate-400 truncate">
                                      {cmd.subtitle}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                {cmd.category === 'Social & Links' ? (
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                ) : isSelected ? (
                                  <div className="flex items-center gap-1 text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/20">
                                    <span>Select</span>
                                    <CornerDownLeft className="w-3 h-3" />
                                  </div>
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / Keyboard hints */}
            <div className="px-5 py-3 border-t border-dark-800 bg-dark-950/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-dark-850 border border-dark-750 text-slate-300">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-dark-850 border border-dark-750 text-slate-300">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-dark-850 border border-dark-750 text-slate-300">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              <div className="text-brand-400/90 font-medium">
                Annamneedi Suresh Kumar
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


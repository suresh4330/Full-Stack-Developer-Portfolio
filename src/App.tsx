import { useState, useEffect } from 'react';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { HorizontalMarquee } from './components/ui/HorizontalMarquee';
import { CommandPalette } from './components/ui/CommandPalette';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FrontendSection } from './components/sections/FrontendSection';
import { BackendSection } from './components/sections/BackendSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { WorkflowSection } from './components/sections/WorkflowSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col font-sans selection:bg-brand-500/25 selection:text-brand-300 relative overflow-x-hidden">
      {/* 2025-2026 Interactive Preloader */}
      <Preloader onComplete={() => {}} />

      {/* Modern Fluid Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Global Mouse-Reactive Spotlight */}
      <CursorSpotlight />

      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Ambient Animated Gradient Background & Grid */}
      <AnimatedBackground />

      {/* Developer Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Navigation Header */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Sections with Scroll Transitions */}
      <main className="flex-1 relative z-10">
        <HeroSection />
        <HorizontalMarquee />
        <AboutSection />
        <FrontendSection />
        <BackendSection />
        <ArchitectureSection />
        <ProjectsSection />
        <WorkflowSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

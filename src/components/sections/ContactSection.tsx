import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '../../data/profile';
import { Mail, Phone, Github, Linkedin, Copy, Check, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';
import { RevealWrapper } from '../ui/RevealWrapper';
import { MagneticButton } from '../ui/MagneticButton';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.contact.mobile);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const mailtoLink = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
    subject || 'Software Engineering Inquiry'
  )}&body=${encodeURIComponent(message || 'Hello Suresh,\n\nI reviewed your portfolio and would like to discuss...')}`;

  return (
    <section id="contact" className="py-24 bg-dark-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          pill="Get In Touch"
          title="Direct Communication Channels"
          description="Interested in discussing software architecture, full-stack development, or engineering opportunities? Reach out directly through verified channels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Verified contact methods - Slides from Left */}
          <RevealWrapper direction="right" duration={0.6} className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <motion.div 
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 hover:border-dark-600 transition-colors shadow-xl"
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-brand-400 flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span>Primary Email</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
                  aria-label="Copy email"
                  data-interactive="true"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-brand-400 transition-colors break-all"
                data-interactive="true"
              >
                {profileData.contact.email}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Monitored daily for engineering inquiries and technical discussions.
              </p>
            </motion.div>

            {/* Mobile / Direct Line */}
            <motion.div 
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 hover:border-dark-600 transition-colors shadow-xl"
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>Direct Phone / WhatsApp</span>
                </span>
                <button
                  onClick={handleCopyPhone}
                  className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
                  aria-label="Copy phone"
                  data-interactive="true"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`tel:${profileData.contact.mobile}`}
                className="text-base sm:text-lg font-bold text-white hover:text-sky-400 transition-colors"
                data-interactive="true"
              >
                {profileData.contact.mobile}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Indian Standard Time (IST) • Punjab & Andhra Pradesh.
              </p>
            </motion.div>

            {/* Social Links Box */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl p-6 shadow-xl">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                Professional Networks
              </h4>
              <div className="space-y-3">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-750 text-slate-200 transition-all group"
                  data-interactive="true"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-white">GitHub Profile</div>
                      <div className="text-[11px] font-mono text-slate-400">github.com/suresh4330</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-750 text-slate-200 transition-all group"
                  data-interactive="true"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-white">LinkedIn Profile</div>
                      <div className="text-[11px] font-mono text-slate-400">in/annamneedi-suresh-kumar</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </RevealWrapper>

          {/* Right: Functional Direct Mailto Composer - Slides from Right with 3D Tilt */}
          <RevealWrapper direction="left" duration={0.6} delay={0.15} className="lg:col-span-7">
            <TiltCard
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
              tiltIntensity={5}
              glareOpacity={0.06}
              glowColor="brand"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-dark-800">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-brand-400" />
                  <h3 className="text-base font-bold text-white">
                    Direct Email Dispatcher
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Transparent Mailto Integration
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Write a draft message below. Clicking <span className="text-brand-400 font-semibold font-mono">Launch Email Client</span> directly opens your default mail application with pre-filled recipient, subject, and content without unverified third-party intermediate APIs.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = mailtoLink;
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Full-Stack Engineering Role / Technical Discussion"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-dark-950 border border-dark-750 text-slate-200 text-sm focus:outline-none focus:border-brand-500 font-sans placeholder:text-slate-600 transition-colors"
                    data-interactive="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Message Draft
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Write your note or question here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-dark-950 border border-dark-750 text-slate-200 text-sm focus:outline-none focus:border-brand-500 font-sans placeholder:text-slate-600 transition-colors"
                    data-interactive="true"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-dark-850/80 border border-dark-750 flex items-center gap-2.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>
                    Zero tracking, no backend database storage of your draft, directly dispatches to {profileData.contact.email}.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <MagneticButton pullFactor={0.15}>
                    <Button
                      variant="primary"
                      size="md"
                      type="submit"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Launch Email Client
                    </Button>
                  </MagneticButton>
                  <MagneticButton pullFactor={0.15}>
                    <Button
                      variant="secondary"
                      size="md"
                      type="button"
                      onClick={handleCopyEmail}
                      icon={copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    >
                      {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            </TiltCard>
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
};

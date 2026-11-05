import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  X,
  RotateCcw,
  Wind,
  MousePointer,
  Moon,
  Sparkles,
  Waves,
  Feather,
  Zap,
  Activity,
  Check,
} from 'lucide-react';
import { useAnimationConfig, AnimationMode } from '../../context/AnimationContext';

export const AnimationControlPanel: React.FC = () => {
  const {
    config,
    setMode,
    updateMotion,
    updateMouse,
    updateVisuals,
    resetDefaults,
    isControlPanelOpen,
    setIsControlPanelOpen,
  } = useAnimationConfig();

  const [activeTab, setActiveTab] = useState<'presets' | 'motion' | 'lighting' | 'mouse'>('presets');

  const modes: Array<{ id: AnimationMode; label: string; icon: React.ReactNode; desc: string }> = [
    {
      id: 'cinematic',
      label: 'Cinematic',
      icon: <Sparkles className="w-4 h-4 text-brand-400" />,
      desc: 'Full atmospheric depth, flying birds, and shimmering ocean waves',
    },
    {
      id: 'subtle',
      label: 'Subtle',
      icon: <Wind className="w-4 h-4 text-sky-400" />,
      desc: 'Calm, gentle drift with softened glow and lower speed',
    },
    {
      id: 'reduced',
      label: 'Reduced Motion',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
      desc: 'Accessible, minimal movement respecting motion sensitivity',
    },
    {
      id: 'static',
      label: 'Static',
      icon: <Zap className="w-4 h-4 text-slate-400" />,
      desc: 'Zero continuous rendering loop for maximum battery savings',
    },
  ];

  return (
    <>
      {/* Floating Toggle Pill (Discreet, Professional, Non-Intrusive) */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <motion.button
          onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg text-xs font-mono ${
            isControlPanelOpen
              ? 'bg-brand-500/20 border-brand-400/40 text-brand-300 shadow-brand-500/20'
              : 'bg-dark-900/80 hover:bg-dark-850/90 border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500/70 shadow-black/40'
          }`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          title="Adjust animation, lighting & motion controls"
        >
          <Sliders className="w-3.5 h-3.5 text-brand-400" />
          <span className="hidden sm:inline font-medium">Atmosphere Controls</span>
          <span className="inline sm:hidden font-medium">Controls</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
        </motion.button>
      </div>

      {/* Slide-Up Cinematic Glass Panel */}
      <AnimatePresence>
        {isControlPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-6 z-40 w-[92vw] sm:w-[420px] max-h-[80vh] overflow-y-auto rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-slate-700/70 shadow-2xl p-5 text-slate-200 font-sans select-none"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(51, 65, 85, 0.5) transparent',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    Atmosphere & Motion Controls
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Mode: <span className="text-brand-300 uppercase">{config.performance.mode}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={resetDefaults}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  title="Reset to default settings"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsControlPanelOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  title="Close controls"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-dark-950/70 rounded-xl mb-4 border border-slate-800/60">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'presets'
                    ? 'bg-slate-800/90 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Presets
              </button>
              <button
                onClick={() => setActiveTab('motion')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'motion'
                    ? 'bg-slate-800/90 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Motion
              </button>
              <button
                onClick={() => setActiveTab('lighting')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'lighting'
                    ? 'bg-slate-800/90 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lighting
              </button>
              <button
                onClick={() => setActiveTab('mouse')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'mouse'
                    ? 'bg-slate-800/90 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Interact
              </button>
            </div>

            {/* TAB CONTENT */}

            {/* 1. Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-2.5">
                {modes.map((m) => {
                  const isActive = config.performance.mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isActive
                          ? 'bg-brand-500/15 border-brand-500/40 text-white shadow-sm'
                          : 'bg-dark-850/60 hover:bg-dark-800/70 border-slate-800/70 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">{m.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{m.label}</span>
                          {isActive && <Check className="w-3.5 h-3.5 text-brand-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Motion Controls */}
            {activeTab === 'motion' && (
              <div className="space-y-4">
                {/* Bird Flight Speed */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Feather className="w-3.5 h-3.5 text-sky-400" /> Bird Flight Speed
                    </span>
                    <span className="font-mono text-slate-400">{config.motion.birdSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={config.motion.birdSpeed}
                    onChange={(e) => updateMotion({ birdSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Bird Flock Count */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Feather className="w-3.5 h-3.5 text-brand-400" /> Active Birds
                    </span>
                    <span className="font-mono text-slate-400">{config.motion.birdCount}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    step="1"
                    value={config.motion.birdCount}
                    onChange={(e) => updateMotion({ birdCount: parseInt(e.target.value, 10) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Ocean Wave Speed */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Waves className="w-3.5 h-3.5 text-teal-400" /> Ocean Wave Motion
                    </span>
                    <span className="font-mono text-slate-400">{config.motion.waveSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={config.motion.waveSpeed}
                    onChange={(e) => updateMotion({ waveSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Parallax Intensity */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Wind className="w-3.5 h-3.5 text-indigo-400" /> Layer Parallax Depth
                    </span>
                    <span className="font-mono text-slate-400">
                      {config.motion.parallaxIntensity.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.1"
                    value={config.motion.parallaxIntensity}
                    onChange={(e) => updateMotion({ parallaxIntensity: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Star Twinkle */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Star Twinkle Speed
                    </span>
                    <span className="font-mono text-slate-400">
                      {config.motion.starTwinkleSpeed.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={config.motion.starTwinkleSpeed}
                    onChange={(e) => updateMotion({ starTwinkleSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 3. Lighting & Visuals */}
            {activeTab === 'lighting' && (
              <div className="space-y-4">
                {/* Moon Glow Intensity */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Moon className="w-3.5 h-3.5 text-sky-300" /> Moon Atmospheric Glow
                    </span>
                    <span className="font-mono text-slate-400">{config.visuals.moonGlow.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.1"
                    value={config.visuals.moonGlow}
                    onChange={(e) => updateVisuals({ moonGlow: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Ocean Reflection Shimmer */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Waves className="w-3.5 h-3.5 text-teal-300" /> Ocean Shimmer Brightness
                    </span>
                    <span className="font-mono text-slate-400">
                      {config.visuals.reflectionBrightness.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.1"
                    value={config.visuals.reflectionBrightness}
                    onChange={(e) => updateVisuals({ reflectionBrightness: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Background Luminance */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-300" /> Night Sky Brightness
                    </span>
                    <span className="font-mono text-slate-400">
                      {config.visuals.brightness.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.4"
                    step="0.05"
                    value={config.visuals.brightness}
                    onChange={(e) => updateVisuals({ brightness: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Star Density */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Starfield Density
                    </span>
                    <span className="font-mono text-slate-400">{config.visuals.starDensity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.1"
                    value={config.visuals.starDensity}
                    onChange={(e) => updateVisuals({ starDensity: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 4. Mouse Interaction */}
            {activeTab === 'mouse' && (
              <div className="space-y-4">
                {/* Mouse Tracking Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-850/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <MousePointer className="w-4 h-4 text-brand-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Mouse Reaction</div>
                      <div className="text-[11px] text-slate-400">Parallax & cursor atmospheric response</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateMouse({ enabled: !config.mouse.enabled })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      config.mouse.enabled ? 'bg-brand-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        config.mouse.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Interaction Sensitivity */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Cursor Parallax Sensitivity</span>
                    <span className="font-mono text-slate-400">{config.mouse.intensity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.1"
                    disabled={!config.mouse.enabled}
                    value={config.mouse.intensity}
                    onChange={(e) => updateMouse({ intensity: parseFloat(e.target.value) })}
                    className="w-full accent-brand-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer disabled:opacity-40"
                  />
                </div>

                {/* Moon Glow Reactivity */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-850/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Moon Cursor Bloom</div>
                      <div className="text-[11px] text-slate-400">Subtle glow when cursor approaches moon</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateMouse({ reactToMoon: !config.mouse.reactToMoon })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      config.mouse.reactToMoon ? 'bg-brand-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        config.mouse.reactToMoon ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Footer with Performance Status */}
            <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Auto-pauses on inactive tab
              </span>
              <span>60 FPS Optimized</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

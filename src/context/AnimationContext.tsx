import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AnimationMode = 'cinematic' | 'subtle' | 'reduced' | 'static';

export interface MotionConfig {
  cloudSpeed: number; // 0.0 to 3.0 (default 1.0)
  birdSpeed: number; // 0.2 to 2.5 (default 1.0)
  birdCount: number; // 0 to 16 (default 9)
  waveSpeed: number; // 0.2 to 2.5 (default 1.0)
  parallaxIntensity: number; // 0.0 to 2.0 (default 1.0)
  starTwinkleSpeed: number; // 0.2 to 2.5 (default 1.0)
}

export interface MouseConfig {
  enabled: boolean; // default true
  intensity: number; // 0.0 to 2.0 (default 1.0)
  reactToMoon: boolean; // default true
  reactToWater: boolean; // default true
}

export interface ScrollConfig {
  enabled: boolean; // default true
  intensity: number; // 0.0 to 2.0 (default 1.0)
  sectionTransitions: boolean; // default true
}

export interface VisualsConfig {
  brightness: number; // 0.5 to 1.5 (default 1.0)
  moonGlow: number; // 0.2 to 2.0 (default 1.0)
  reflectionBrightness: number; // 0.2 to 2.0 (default 1.0)
  starDensity: number; // 0.3 to 2.0 (default 1.0)
  vignetteStrength: number; // 0.2 to 1.0 (default 0.6)
}

export interface PerformanceConfig {
  mode: AnimationMode; // 'cinematic' | 'subtle' | 'reduced' | 'static'
  pauseWhenHidden: boolean; // default true
  isTabVisible: boolean; // managed automatically
}

export interface AnimationConfig {
  motion: MotionConfig;
  mouse: MouseConfig;
  scroll: ScrollConfig;
  visuals: VisualsConfig;
  performance: PerformanceConfig;
}

const DEFAULT_CONFIG: AnimationConfig = {
  motion: {
    cloudSpeed: 1.0,
    birdSpeed: 1.0,
    birdCount: 9,
    waveSpeed: 1.0,
    parallaxIntensity: 1.0,
    starTwinkleSpeed: 1.0,
  },
  mouse: {
    enabled: true,
    intensity: 1.0,
    reactToMoon: true,
    reactToWater: true,
  },
  scroll: {
    enabled: true,
    intensity: 1.0,
    sectionTransitions: true,
  },
  visuals: {
    brightness: 1.0,
    moonGlow: 1.0,
    reflectionBrightness: 1.0,
    starDensity: 1.0,
    vignetteStrength: 0.6,
  },
  performance: {
    mode: 'cinematic',
    pauseWhenHidden: true,
    isTabVisible: true,
  },
};

interface AnimationContextValue {
  config: AnimationConfig;
  setMode: (mode: AnimationMode) => void;
  updateMotion: (updates: Partial<MotionConfig>) => void;
  updateMouse: (updates: Partial<MouseConfig>) => void;
  updateScroll: (updates: Partial<ScrollConfig>) => void;
  updateVisuals: (updates: Partial<VisualsConfig>) => void;
  updatePerformance: (updates: Partial<PerformanceConfig>) => void;
  resetDefaults: () => void;
  isControlPanelOpen: boolean;
  setIsControlPanelOpen: (isOpen: boolean) => void;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

const STORAGE_KEY = 'portfolio_animation_config_v2';

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AnimationConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          performance: {
            ...DEFAULT_CONFIG.performance,
            ...parsed.performance,
            isTabVisible: true,
          },
        };
      }
    } catch {
      // LocalStorage unavailable
    }
    return DEFAULT_CONFIG;
  });

  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  // Synchronize Tab Visibility (Performance Optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setConfig((prev) => ({
        ...prev,
        performance: {
          ...prev.performance,
          isTabVisible: isVisible,
        },
      }));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // System prefers-reduced-motion listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches && config.performance.mode === 'cinematic') {
        setConfig((prev) => ({
          ...prev,
          performance: { ...prev.performance, mode: 'reduced' },
          motion: { ...prev.motion, birdSpeed: 0.4, waveSpeed: 0.4 },
        }));
      }
    };

    handleReducedMotion(mediaQuery);
    const listener = (e: MediaQueryListEvent) => handleReducedMotion(e);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [config.performance.mode]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const setMode = useCallback((mode: AnimationMode) => {
    setConfig((prev) => {
      switch (mode) {
        case 'static':
          return {
            ...prev,
            performance: { ...prev.performance, mode: 'static' },
            motion: { ...prev.motion, cloudSpeed: 0, birdSpeed: 0, waveSpeed: 0, starTwinkleSpeed: 0 },
            mouse: { ...prev.mouse, enabled: false },
          };
        case 'reduced':
          return {
            ...prev,
            performance: { ...prev.performance, mode: 'reduced' },
            motion: { ...prev.motion, cloudSpeed: 0.25, birdSpeed: 0.4, waveSpeed: 0.35, starTwinkleSpeed: 0.3 },
            mouse: { ...prev.mouse, enabled: true, intensity: 0.3 },
          };
        case 'subtle':
          return {
            ...prev,
            performance: { ...prev.performance, mode: 'subtle' },
            motion: { ...prev.motion, cloudSpeed: 0.6, birdSpeed: 0.65, waveSpeed: 0.65, starTwinkleSpeed: 0.7 },
            mouse: { ...prev.mouse, enabled: true, intensity: 0.6 },
          };
        case 'cinematic':
        default:
          return {
            ...prev,
            performance: { ...prev.performance, mode: 'cinematic' },
            motion: { ...DEFAULT_CONFIG.motion },
            mouse: { ...DEFAULT_CONFIG.mouse },
          };
      }
    });
  }, []);

  const updateMotion = useCallback((updates: Partial<MotionConfig>) => {
    setConfig((prev) => ({ ...prev, motion: { ...prev.motion, ...updates } }));
  }, []);

  const updateMouse = useCallback((updates: Partial<MouseConfig>) => {
    setConfig((prev) => ({ ...prev, mouse: { ...prev.mouse, ...updates } }));
  }, []);

  const updateScroll = useCallback((updates: Partial<ScrollConfig>) => {
    setConfig((prev) => ({ ...prev, scroll: { ...prev.scroll, ...updates } }));
  }, []);

  const updateVisuals = useCallback((updates: Partial<VisualsConfig>) => {
    setConfig((prev) => ({ ...prev, visuals: { ...prev.visuals, ...updates } }));
  }, []);

  const updatePerformance = useCallback((updates: Partial<PerformanceConfig>) => {
    setConfig((prev) => ({ ...prev, performance: { ...prev.performance, ...updates } }));
  }, []);

  const resetDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        config,
        setMode,
        updateMotion,
        updateMouse,
        updateScroll,
        updateVisuals,
        updatePerformance,
        resetDefaults,
        isControlPanelOpen,
        setIsControlPanelOpen,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationConfig = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationConfig must be used within an AnimationProvider');
  }
  return context;
};

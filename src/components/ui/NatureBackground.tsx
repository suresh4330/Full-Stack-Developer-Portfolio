import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Cinematic Night Sky with Realistic Aurora Borealis, Volumetric Clouds,
 * Crescent Moon & Distant Birds.
 *
 * Exact visual match to the reference artwork:
 * - Deep midnight / twilight navy sky with smooth atmospheric color grading.
 * - Twinkling starfield with subtle diamond & cool-blue stellar points.
 * - Glowing waxing crescent moon with soft volumetric lunar scattering & corona.
 * - Multi-curtain Aurora Borealis ribbons:
 *     * Vivid Emerald & Electric Cyan primary drapery undulating across upper-right/mid sky.
 *     * Ethereal Magenta & Violet crest dancing atop the emerald curtain.
 *     * Lower Horizon Emerald River glowing between the cumulus cloud bank.
 *     * Whispering teal stream near the moon.
 * - Volumetric moonlit clouds:
 *     * Wispy mid-altitude stratocumulus drifting under the moon with silver rim lighting.
 *     * Photorealistic dark horizon cumulus cloud bank silhouetted against the lower aurora.
 * - Realistic distant birds with natural flap/glide aerodynamics and gentle banking.
 * - Mouse parallax & scroll-driven nocturnal mood transitions.
 */
export const NatureBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initClouds();
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // -------------------------------------------------------------
    // 1. MOUSE TRACKING & PARALLAX SMOOTHING
    // -------------------------------------------------------------
    let mouseX = width * 0.5;
    let mouseY = height * 0.35;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVx = 0;
    let mouseVy = 0;
    let mouseSpeed = 0;

    let smoothMouseNormX = 0; // [-1, 1]
    let smoothMouseNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      mouseVx = cx - prevMouseX;
      mouseVy = cy - prevMouseY;
      mouseSpeed = Math.min(Math.hypot(mouseVx, mouseVy), 30);
      prevMouseX = mouseX = cx;
      prevMouseY = mouseY = cy;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseVx = touch.clientX - prevMouseX;
        mouseVy = touch.clientY - prevMouseY;
        mouseSpeed = Math.min(Math.hypot(mouseVx, mouseVy), 30);
        prevMouseX = mouseX = touch.clientX;
        prevMouseY = mouseY = touch.clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // -------------------------------------------------------------
    // 2. SKY THEMES (Nocturnal Palette Transitions via Scroll)
    // -------------------------------------------------------------
    interface SkyTheme {
      top: string;
      mid: string;
      bottom: string;
      horizonGlow: string;
      auroraIntensity: number;
      magentaBoost: number;
    }

    const skyThemes: Array<{ threshold: number; theme: SkyTheme }> = [
      {
        threshold: 0.0, // Hero: Deep Cosmic Midnight with Peak Aurora
        theme: {
          top: '#020612',
          mid: '#06162d',
          bottom: '#092442',
          horizonGlow: 'rgba(6, 40, 52, 0.4)',
          auroraIntensity: 1.0,
          magentaBoost: 1.0,
        },
      },
      {
        threshold: 0.33, // Frontend/Backend: Electric Cyan Nocturne
        theme: {
          top: '#020917',
          mid: '#051b36',
          bottom: '#0a2e50',
          horizonGlow: 'rgba(8, 52, 66, 0.45)',
          auroraIntensity: 0.95,
          magentaBoost: 0.85,
        },
      },
      {
        threshold: 0.68, // Projects/Workflow: Cosmic Violet & Emerald
        theme: {
          top: '#05071a',
          mid: '#091535',
          bottom: '#12254a',
          horizonGlow: 'rgba(18, 38, 70, 0.4)',
          auroraIntensity: 0.9,
          magentaBoost: 1.15,
        },
      },
      {
        threshold: 1.0, // Experience/Contact: Deep Celestial Twilight
        theme: {
          top: '#01040f',
          mid: '#041026',
          bottom: '#081c3c',
          horizonGlow: 'rgba(4, 32, 45, 0.35)',
          auroraIntensity: 0.85,
          magentaBoost: 0.9,
        },
      },
    ];

    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    const lerpColor = (c1: string, c2: string, t: number) => {
      const rgb1 = hexToRgb(c1);
      const rgb2 = hexToRgb(c2);
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
      return `rgb(${r}, ${g}, ${b})`;
    };

    // -------------------------------------------------------------
    // 3. TWINKLING STARFIELD
    // -------------------------------------------------------------
    interface Star {
      xRatio: number;
      yRatio: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
      hasSpike: boolean;
    }

    let stars: Star[] = [];
    const initStars = () => {
      const count = Math.floor(Math.min(width, 1920) * 0.12); // ~180-230 stars
      const starColors = [
        'rgba(255, 255, 255,',
        'rgba(219, 234, 254,', // Ice blue
        'rgba(186, 230, 253,', // Cool cyan
        'rgba(233, 213, 255,', // Soft violet
      ];

      stars = [];
      for (let i = 0; i < count; i++) {
        // Bias y toward upper and middle sky (stars fade near horizon haze)
        const yRatio = Math.pow(Math.random(), 1.25) * 0.82;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const size = Math.random() < 0.12 ? 1.4 + Math.random() * 0.8 : 0.6 + Math.random() * 0.7;
        const hasSpike = size > 1.8 && Math.random() < 0.35;

        stars.push({
          xRatio: Math.random(),
          yRatio,
          size,
          baseAlpha: 0.3 + Math.random() * 0.6,
          twinkleSpeed: 0.015 + Math.random() * 0.035,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          hasSpike,
        });
      }
    };
    initStars();

    // -------------------------------------------------------------
    // 4. REALISTIC DISTANT BIRDS
    // -------------------------------------------------------------
    interface DistantBird {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSpeedX: number;
      scale: number;
      flapRate: number;
      flapPhase: number;
      isGliding: boolean;
      glideDuration: number;
      glideTimer: number;
      opacity: number;
      bodyAngle: number;
      reactionTimer: number;
    }

    const birdCount = 6;
    const birds: DistantBird[] = [];
    for (let i = 0; i < birdCount; i++) {
      const speedX = 0.95 + Math.random() * 0.75;
      birds.push({
        x: Math.random() * width,
        y: 80 + Math.random() * (height * 0.52),
        vx: speedX,
        vy: (Math.random() - 0.5) * 0.25,
        baseSpeedX: speedX,
        scale: 0.35 + Math.random() * 0.32, // Distant scale
        flapRate: 0.08 + Math.random() * 0.03,
        flapPhase: Math.random() * Math.PI * 2,
        isGliding: Math.random() > 0.4,
        glideDuration: 80 + Math.random() * 120,
        glideTimer: 0,
        opacity: 0.45 + Math.random() * 0.25,
        bodyAngle: 0,
        reactionTimer: 0,
      });
    }

    // -------------------------------------------------------------
    // 5. VOLUMETRIC MOONLIT CLOUDS & HORIZON CUMULUS BANK
    // -------------------------------------------------------------
    interface CloudPuff {
      dx: number;
      dy: number;
      radiusX: number;
      radiusY: number;
      tilt: number;
    }

    interface MidCloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speedX: number;
      opacity: number;
      layer: number;
      puffs: CloudPuff[];
    }

    let midClouds: MidCloud[] = [];

    // Helper: Generate natural volumetric cloud puff clusters
    const createPuffCluster = (w: number, h: number, count: number): CloudPuff[] => {
      const puffs: CloudPuff[] = [];
      for (let i = 0; i < count; i++) {
        const ratio = i / (count - 1);
        const dx = (ratio - 0.5) * (w * 0.85);
        const centerDist = 1 - Math.abs(ratio - 0.5) * 1.6;
        const dy = (Math.sin(ratio * Math.PI) - 0.5) * (h * 0.35) + (Math.random() - 0.5) * (h * 0.2);
        const radiusX = (h * 0.55 + Math.random() * (h * 0.45)) * Math.max(0.4, centerDist);
        const radiusY = radiusX * (0.45 + Math.random() * 0.25);
        const tilt = (Math.random() - 0.5) * 0.15;
        puffs.push({ dx, dy, radiusX, radiusY, tilt });
      }
      return puffs;
    };

    const initClouds = () => {
      midClouds = [
        // Cloud 1: Drifts right beneath / across the moon (matches reference)
        {
          x: width * 0.14,
          y: height * 0.48,
          width: 480,
          height: 120,
          speedX: 0.08,
          opacity: 0.42,
          layer: 2,
          puffs: createPuffCluster(480, 120, 7),
        },
        // Cloud 2: Upper left wispy cloud
        {
          x: width * 0.02,
          y: height * 0.26,
          width: 520,
          height: 110,
          speedX: 0.06,
          opacity: 0.32,
          layer: 1,
          puffs: createPuffCluster(520, 110, 8),
        },
        // Cloud 3: Mid-sky soft cloud picking up aurora glow
        {
          x: width * 0.48,
          y: height * 0.38,
          width: 560,
          height: 130,
          speedX: 0.09,
          opacity: 0.35,
          layer: 2,
          puffs: createPuffCluster(560, 130, 8),
        },
        // Cloud 4: Upper-right wispy layer interweaving with aurora
        {
          x: width * 0.72,
          y: height * 0.18,
          width: 440,
          height: 95,
          speedX: 0.05,
          opacity: 0.28,
          layer: 1,
          puffs: createPuffCluster(440, 95, 6),
        },
      ];
    };
    initClouds();

    // Pre-calculate Horizon Cumulus Bank Silhouettes (Bottom 25% of viewport)
    interface HorizonCumulusPuff {
      xRatio: number;
      baseYOffset: number;
      rx: number;
      ry: number;
    }

    const horizonPuffs: HorizonCumulusPuff[] = [];
    const puffSteps = 28;
    for (let i = 0; i <= puffSteps; i++) {
      const xRatio = i / puffSteps;
      const rx = 55 + Math.sin(i * 1.8) * 25 + Math.cos(i * 3.4) * 15;
      const ry = 42 + Math.cos(i * 2.1) * 18 + Math.sin(i * 4.2) * 10;
      const baseYOffset = 18 + Math.sin(i * 0.9) * 22 + Math.cos(i * 2.7) * 14;
      horizonPuffs.push({ xRatio, baseYOffset, rx, ry });
    }

    // -------------------------------------------------------------
    // 6. MAIN SIMULATION & RENDER LOOP
    // -------------------------------------------------------------
    let currentScroll = 0;
    let targetScroll = 0;

    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      targetScroll = latest;
    });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse smoothing & inertia decay
      mouseSpeed *= 0.94;
      mouseVx *= 0.88;
      mouseVy *= 0.88;

      const targetNormX = (mouseX / width - 0.5) * 2;
      const targetNormY = (mouseY / height - 0.5) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.06;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.06;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.065;
      const scrollPixelOffset = currentScroll * height * 0.85;

      // -----------------------------------------------------------
      // A. COMPUTE SKY THEME (Dynamic scroll transitions)
      // -----------------------------------------------------------
      let themeIdx = 0;
      for (let i = 0; i < skyThemes.length - 1; i++) {
        if (currentScroll >= skyThemes[i].threshold && currentScroll <= skyThemes[i + 1].threshold) {
          themeIdx = i;
          break;
        }
      }

      const st1 = skyThemes[themeIdx];
      const st2 = skyThemes[Math.min(themeIdx + 1, skyThemes.length - 1)];
      const span = st2.threshold - st1.threshold || 0.01;
      const progressInSpan = Math.min(Math.max((currentScroll - st1.threshold) / span, 0), 1);

      const curSkyTop = lerpColor(st1.theme.top, st2.theme.top, progressInSpan);
      const curSkyMid = lerpColor(st1.theme.mid, st2.theme.mid, progressInSpan);
      const curSkyBottom = lerpColor(st1.theme.bottom, st2.theme.bottom, progressInSpan);
      const curAuroraIntensity =
        st1.theme.auroraIntensity +
        (st2.theme.auroraIntensity - st1.theme.auroraIntensity) * progressInSpan;
      const curMagentaBoost =
        st1.theme.magentaBoost +
        (st2.theme.magentaBoost - st1.theme.magentaBoost) * progressInSpan;

      // Render Base Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, curSkyTop);
      skyGrad.addColorStop(0.42, curSkyMid);
      skyGrad.addColorStop(0.82, curSkyBottom);
      skyGrad.addColorStop(1, '#030a16');

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------
      // B. TWINKLING STARFIELD
      // -----------------------------------------------------------
      ctx.save();
      const starParallaxX = smoothMouseNormX * 5;
      const starParallaxY = smoothMouseNormY * 4 - currentScroll * 25;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = star.xRatio * width + starParallaxX;
        const sy = (star.yRatio * height + starParallaxY + height) % height;

        // Oscillating twinkling brightness
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const alpha = Math.max(0.12, Math.min(1.0, star.baseAlpha + twinkle * 0.35));

        ctx.fillStyle = `${star.color} ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle 4-point cross diffraction spike on select bright stars
        if (star.hasSpike && alpha > 0.6) {
          ctx.strokeStyle = `${star.color} ${alpha * 0.45})`;
          ctx.lineWidth = 0.6;
          const spikeLen = star.size * 2.8;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }
      }
      ctx.restore();

      // -----------------------------------------------------------
      // C. REALISTIC AURORA BOREALIS (The Northern Lights)
      // -----------------------------------------------------------
      // Rendered with additive / screen blending for luminous atmospheric curtains
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const mouseWaveInfluence = smoothMouseNormX * 22;

      // --- Ribbon 1: Upper-Right & Mid-Sky Vivid Emerald & Teal Curtain ---
      const ribbon1BaseY = height * 0.28 - currentScroll * 40 + smoothMouseNormY * 12;
      const rayCount1 = Math.floor(width / 11);
      for (let r = 0; r < rayCount1; r++) {
        const rx = (r / rayCount1) * (width + 120) - 60;
        const xNorm = rx / width;

        // Only span from 20% to right edge (matching reference image)
        if (xNorm < 0.18) continue;
        const envelope = Math.sin(Math.min(1, Math.max(0, (xNorm - 0.18) / 0.82)) * Math.PI);

        // Multi-frequency harmonic wave
        const wave =
          Math.sin(rx * 0.0024 + time * 0.38) * 38 +
          Math.sin(rx * 0.0052 - time * 0.24) * 22 +
          Math.cos(rx * 0.0012 + time * 0.16) * 16 +
          mouseWaveInfluence * (xNorm - 0.5);

        const yBase = ribbon1BaseY + wave;
        const rayH = (140 + Math.sin(rx * 0.009 + time * 0.7) * 45) * envelope * curAuroraIntensity;

        if (rayH <= 4) continue;

        const rayGrad = ctx.createLinearGradient(rx, yBase, rx, yBase - rayH);
        rayGrad.addColorStop(0, 'rgba(5, 150, 105, 0.0)');
        rayGrad.addColorStop(0.2, 'rgba(16, 215, 168, 0.18)'); // Vivid Emerald
        rayGrad.addColorStop(0.55, 'rgba(34, 211, 238, 0.22)'); // Electric Cyan
        rayGrad.addColorStop(0.85, 'rgba(56, 189, 248, 0.12)'); // Sky Cyan
        rayGrad.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(rx - 7, yBase - rayH, 15, rayH);
      }

      // --- Ribbon 2: Ethereal Magenta & Violet Upper Crest ---
      // Positioned on the upper-right, dancing atop the emerald curtain
      const ribbon2BaseY = height * 0.21 - currentScroll * 35 + smoothMouseNormY * 8;
      const rayCount2 = Math.floor(width / 14);
      for (let r = 0; r < rayCount2; r++) {
        const rx = (r / rayCount2) * (width + 100) - 50;
        const xNorm = rx / width;

        if (xNorm < 0.45) continue; // Upper-right concentration
        const envelope = Math.sin(Math.min(1, Math.max(0, (xNorm - 0.45) / 0.55)) * Math.PI);

        const wave =
          Math.sin(rx * 0.0031 + time * 0.32 + 1.2) * 32 +
          Math.cos(rx * 0.0061 - time * 0.21) * 18 +
          mouseWaveInfluence * 0.8;

        const yBase = ribbon2BaseY + wave;
        const rayH = (160 + Math.sin(rx * 0.008 + time * 0.55) * 50) * envelope * curMagentaBoost;

        if (rayH <= 4) continue;

        const rayGrad = ctx.createLinearGradient(rx, yBase, rx, yBase - rayH);
        rayGrad.addColorStop(0, 'rgba(99, 102, 241, 0.0)');
        rayGrad.addColorStop(0.25, 'rgba(168, 85, 247, 0.18)'); // Radiant Violet
        rayGrad.addColorStop(0.65, 'rgba(236, 72, 153, 0.17)'); // Luminous Magenta
        rayGrad.addColorStop(0.9, 'rgba(244, 114, 182, 0.09)');  // Rose Pink
        rayGrad.addColorStop(1, 'rgba(217, 70, 239, 0.0)');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(rx - 8, yBase - rayH, 17, rayH);
      }

      // --- Ribbon 3: Lower Horizon Emerald Aurora River ---
      // Glowing green band weaving right above the bottom cumulus cloud bank
      const ribbon3BaseY = height * 0.74 - currentScroll * 15 + smoothMouseNormY * 6;
      const rayCount3 = Math.floor(width / 13);
      for (let r = 0; r < rayCount3; r++) {
        const rx = (r / rayCount3) * (width + 80) - 40;
        const envelope = Math.sin(Math.min(1, Math.max(0, rx / width)) * Math.PI);

        const wave =
          Math.sin(rx * 0.0028 + time * 0.26 + 2.5) * 24 +
          Math.cos(rx * 0.0055 - time * 0.19) * 14;

        const yBase = ribbon3BaseY + wave;
        const rayH = (75 + Math.sin(rx * 0.007 + time * 0.45) * 25) * envelope * curAuroraIntensity;

        const rayGrad = ctx.createLinearGradient(rx, yBase, rx, yBase - rayH);
        rayGrad.addColorStop(0, 'rgba(5, 150, 105, 0.0)');
        rayGrad.addColorStop(0.3, 'rgba(16, 215, 168, 0.16)'); // Emerald
        rayGrad.addColorStop(0.7, 'rgba(20, 184, 166, 0.14)'); // Teal
        rayGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(rx - 8, yBase - rayH, 18, rayH);
      }

      // --- Ribbon 4: Whispering Teal Stream in Upper-Left Near Moon ---
      const ribbon4BaseY = height * 0.36 - currentScroll * 30 + smoothMouseNormY * 8;
      const rayCount4 = Math.floor(width / 16);
      for (let r = 0; r < rayCount4; r++) {
        const rx = (r / rayCount4) * (width * 0.52);
        const xNorm = rx / (width * 0.52);
        const envelope = Math.sin(xNorm * Math.PI);

        const wave = Math.sin(rx * 0.0035 + time * 0.22) * 22;
        const yBase = ribbon4BaseY + wave;
        const rayH = (65 + Math.sin(rx * 0.01 + time * 0.4) * 20) * envelope * curAuroraIntensity;

        if (rayH <= 4) continue;

        const rayGrad = ctx.createLinearGradient(rx, yBase, rx, yBase - rayH);
        rayGrad.addColorStop(0, 'rgba(6, 182, 212, 0.0)');
        rayGrad.addColorStop(0.4, 'rgba(20, 184, 166, 0.12)');
        rayGrad.addColorStop(1, 'rgba(13, 148, 136, 0.0)');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(rx - 9, yBase - rayH, 19, rayH);
      }

      ctx.restore(); // Exit screen composite operation

      // -----------------------------------------------------------
      // D. REALISTIC WAXING MOON & VOLUMETRIC LUNAR SCATTERING
      // -----------------------------------------------------------
      // Mid-left position exactly like reference screenshot
      const moonX = (width < 640 ? width * 0.28 : width * 0.22) + smoothMouseNormX * 8;
      const moonY =
        (width < 640 ? height * 0.32 : height * 0.45) -
        scrollPixelOffset * 0.05 +
        smoothMouseNormY * 6;
      const moonRadius = width < 640 ? 13 : 16;

      ctx.save();

      // 1. Large Atmospheric Lunar Scattering Halo (Outer mist)
      const outerHalo = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.5,
        moonX,
        moonY,
        moonRadius * 16
      );
      outerHalo.addColorStop(0, 'rgba(186, 230, 253, 0.12)');
      outerHalo.addColorStop(0.25, 'rgba(147, 197, 253, 0.06)');
      outerHalo.addColorStop(0.65, 'rgba(56, 189, 248, 0.02)');
      outerHalo.addColorStop(1, 'transparent');
      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 16, 0, Math.PI * 2);
      ctx.fill();

      // 2. Bright Inner Lunar Corona
      const innerCorona = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.2,
        moonX,
        moonY,
        moonRadius * 4.2
      );
      innerCorona.addColorStop(0, 'rgba(240, 249, 255, 0.45)');
      innerCorona.addColorStop(0.35, 'rgba(219, 234, 254, 0.18)');
      innerCorona.addColorStop(1, 'transparent');
      ctx.fillStyle = innerCorona;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 4.2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Shaded Dark Lunar Disc (Ash body)
      ctx.fillStyle = 'rgba(15, 25, 42, 0.88)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Luminous Waxing Crescent / Gibbous Rim (Bright side on right, matching reference)
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, -Math.PI / 2, Math.PI / 2, false);
      // Elliptical terminator back to top
      ctx.ellipse(moonX, moonY, moonRadius * 0.32, moonRadius, 0, Math.PI / 2, -Math.PI / 2, false);
      ctx.closePath();

      const moonFaceGrad = ctx.createLinearGradient(
        moonX - moonRadius * 0.3,
        moonY - moonRadius,
        moonX + moonRadius,
        moonY + moonRadius
      );
      moonFaceGrad.addColorStop(0, '#ffffff');
      moonFaceGrad.addColorStop(0.5, '#e0f2fe');
      moonFaceGrad.addColorStop(0.85, '#bae6fd');
      moonFaceGrad.addColorStop(1, '#93c5fd');

      ctx.fillStyle = moonFaceGrad;
      ctx.shadowColor = 'rgba(224, 242, 254, 0.9)';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.restore();

      // Subtle surface crater variation on bright face
      ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
      ctx.beginPath();
      ctx.arc(moonX + moonRadius * 0.35, moonY - moonRadius * 0.2, moonRadius * 0.22, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.5, moonY + moonRadius * 0.25, moonRadius * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // -----------------------------------------------------------
      // E. VOLUMETRIC MOONLIT CLOUDS (Mid-Altitude Layers)
      // -----------------------------------------------------------
      midClouds.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.x += cloud.speedX + smoothMouseNormX * 0.08;
          if (cloud.x > width + cloud.width * 0.6) {
            cloud.x = -cloud.width * 0.6;
          }
        }

        const cx = cloud.x + smoothMouseNormX * cloud.layer * 10;
        const cy = cloud.y - scrollPixelOffset * (cloud.layer * 0.12) + smoothMouseNormY * 8;

        ctx.save();
        ctx.globalAlpha = cloud.opacity;

        cloud.puffs.forEach((puff, idx) => {
          const px = cx + puff.dx;
          const py = cy + puff.dy;
          const rx = puff.radiusX;
          const ry = puff.radiusY;

          // Moonlit edge lighting from upper-left
          const lightOffsetX = px - rx * 0.22;
          const lightOffsetY = py - ry * 0.32;

          const puffGrad = ctx.createRadialGradient(
            lightOffsetX,
            lightOffsetY,
            rx * 0.08,
            px,
            py,
            rx * 1.05
          );

          // Top edge catch moonlight & subtle aurora scatter
          puffGrad.addColorStop(0, 'rgba(215, 235, 255, 0.24)');
          puffGrad.addColorStop(0.35, 'rgba(147, 197, 253, 0.12)');
          puffGrad.addColorStop(0.7, 'rgba(15, 28, 48, 0.45)'); // Dark atmospheric core
          puffGrad.addColorStop(1, 'rgba(6, 12, 22, 0.0)');

          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.ellipse(px, py, rx, ry, puff.tilt + (idx % 2 === 0 ? 0.06 : -0.06), 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      // -----------------------------------------------------------
      // F. REALISTIC DISTANT BIRDS
      // -----------------------------------------------------------
      birds.forEach((bird) => {
        if (!prefersReducedMotion) {
          // Subtle mouse avoidance
          const dx = bird.x - mouseX;
          const dy = bird.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < 180 && dist > 1) {
            const push = (1 - dist / 180) * 0.65;
            bird.vx += (dx / dist) * push;
            bird.vy += (dy / dist) * push;
            bird.reactionTimer = 40;
          }

          if (bird.reactionTimer > 0) {
            bird.reactionTimer--;
            bird.isGliding = false;
            bird.flapPhase += bird.flapRate * 1.5;
          } else {
            bird.glideTimer++;
            if (bird.glideTimer > bird.glideDuration) {
              bird.isGliding = !bird.isGliding;
              bird.glideTimer = 0;
              bird.glideDuration = bird.isGliding
                ? 90 + Math.random() * 140
                : 60 + Math.random() * 90;
            }

            if (!bird.isGliding) {
              bird.flapPhase += bird.flapRate;
            }
          }

          // Damping back to peaceful horizontal flight
          bird.vx += (bird.baseSpeedX - bird.vx) * 0.035;
          bird.vy += (0 - bird.vy) * 0.035;

          bird.x += bird.vx;
          bird.y += bird.vy + Math.sin(time * 1.2 + bird.x * 0.008) * 0.18;

          // Aerodynamic banking
          const targetAngle = Math.atan2(bird.vy, bird.vx);
          bird.bodyAngle += (targetAngle - bird.bodyAngle) * 0.1;

          // Screen wrap
          if (bird.x > width + 60) {
            bird.x = -60;
            bird.y = 70 + Math.random() * (height * 0.48);
            bird.vx = bird.baseSpeedX = 0.95 + Math.random() * 0.75;
          }
        }

        // Draw Bird
        const bx = bird.x + smoothMouseNormX * 10;
        const by = bird.y - scrollPixelOffset * 0.14 + smoothMouseNormY * 6;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(bird.bodyAngle);
        ctx.scale(bird.scale, bird.scale);

        const flapAngle = bird.isGliding ? 0.08 : Math.sin(bird.flapPhase) * 0.72;

        ctx.fillStyle = `rgba(186, 210, 235, ${bird.opacity})`;
        ctx.strokeStyle = `rgba(186, 210, 235, ${bird.opacity * 0.85})`;
        ctx.lineWidth = 1.2;

        // Slender bird body
        ctx.beginPath();
        ctx.ellipse(0, 0, 4.8, 1.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Left aerodynamic curved wing
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.quadraticCurveTo(-10, flapAngle * 14 - 3, -20, flapAngle * 17);
        ctx.quadraticCurveTo(-11, flapAngle * 10 - 2, 0, 0);
        ctx.fill();
        ctx.stroke();

        // Right aerodynamic curved wing
        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.quadraticCurveTo(10, flapAngle * 14 - 3, 20, flapAngle * 17);
        ctx.quadraticCurveTo(11, flapAngle * 10 - 2, 0, 0);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // -----------------------------------------------------------
      // G. PHOTOREALISTIC HORIZON CUMULUS CLOUD BANK (Bottom of screen)
      // Exact match to reference screenshot's dark silhouette clouds
      // -----------------------------------------------------------
      ctx.save();
      const horizonY = height * 0.84 - scrollPixelOffset * 0.04;

      // Dark silhouette fill from cloud tops down to bottom
      horizonPuffs.forEach((puff) => {
        const px = puff.xRatio * width + smoothMouseNormX * 6;
        const py = horizonY - puff.baseYOffset;

        // Radial puff with subtle silver/teal rim lighting from lower aurora & moon
        const hGrad = ctx.createRadialGradient(
          px,
          py - puff.ry * 0.35,
          puff.rx * 0.05,
          px,
          py,
          puff.rx
        );
        hGrad.addColorStop(0, 'rgba(16, 32, 54, 0.95)'); // Soft dark slate top
        hGrad.addColorStop(0.4, 'rgba(8, 18, 32, 0.98)');
        hGrad.addColorStop(1, 'rgba(3, 7, 16, 1.0)');

        ctx.fillStyle = hGrad;
        ctx.beginPath();
        ctx.ellipse(px, py, puff.rx * 1.25, puff.ry * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle edge highlight along the top rim
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(
          px,
          py,
          puff.rx * 1.25,
          puff.ry * 1.1,
          0,
          Math.PI * 1.1,
          Math.PI * 1.9
        );
        ctx.stroke();
      });

      // Deep solid anchor at bottom
      const bottomCover = ctx.createLinearGradient(0, horizonY + 20, 0, height);
      bottomCover.addColorStop(0, 'rgba(5, 10, 20, 0.92)');
      bottomCover.addColorStop(1, 'rgba(2, 5, 12, 0.99)');
      ctx.fillStyle = bottomCover;
      ctx.fillRect(0, horizonY + 15, width, height - horizonY);

      ctx.restore();

      // -----------------------------------------------------------
      // H. CINEMATIC VIGNETTE (Readability & Professional Depth)
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.38,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, 'rgba(2, 6, 14, 0.15)');
      vignette.addColorStop(1, 'rgba(2, 5, 12, 0.72)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      unsubscribeScroll();
    };
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{ display: 'block' }}
    />
  );
};

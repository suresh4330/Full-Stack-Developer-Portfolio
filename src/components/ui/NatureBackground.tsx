import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Immersive Moonlit Ocean Background with Realistic Volumetric Clouds,
 * Glowing Full Moon, Ascending Flying Birds Flock, and Animated Water Reflections.
 *
 * Exact visual match to the reference artwork:
 * - Glowing luminous full moon in the upper-right sky with volumetric corona & halo.
 * - Deep navy, midnight blue, and rich cobalt sky gradient with twinkling stars.
 * - Massive volumetric moonlit cumulus cloud banks with silver-blue rim lighting.
 * - Flying flock of silver-white birds in an ascending diagonal curve formation.
 * - Realistic animated dark ocean with rolling waves and a glittering moonlight reflection corridor.
 * - Parallax depth with smooth mouse & scroll responsiveness while preserving text readability.
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
      initWaterGlints();
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

    let smoothMouseNormX = 0; // [-1, 1]
    let smoothMouseNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      mouseVx = cx - prevMouseX;
      mouseVy = cy - prevMouseY;
      prevMouseX = mouseX = cx;
      prevMouseY = mouseY = cy;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseVx = touch.clientX - prevMouseX;
        mouseVy = touch.clientY - prevMouseY;
        prevMouseX = mouseX = touch.clientX;
        prevMouseY = mouseY = touch.clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // -------------------------------------------------------------
    // 2. NOCTURNAL SKY PALETTE & SCROLL TRANSITIONS
    // -------------------------------------------------------------
    interface OceanTheme {
      skyTop: string;
      skyMid: string;
      skyHorizon: string;
      waterHorizon: string;
      waterDeep: string;
      moonGlow: string;
      glintIntensity: number;
    }

    const oceanThemes: Array<{ threshold: number; theme: OceanTheme }> = [
      {
        threshold: 0.0, // Hero: Pure Moonlit Deep Cobalt Night
        theme: {
          skyTop: '#020718',
          skyMid: '#071d44',
          skyHorizon: '#0b2f64',
          waterHorizon: '#0a2348',
          waterDeep: '#020916',
          moonGlow: 'rgba(186, 224, 255, 0.16)',
          glintIntensity: 1.0,
        },
      },
      {
        threshold: 0.33, // Frontend/Backend: Deep Indigo Ocean
        theme: {
          skyTop: '#010514',
          skyMid: '#061738',
          skyHorizon: '#092652',
          waterHorizon: '#081e3e',
          waterDeep: '#020712',
          moonGlow: 'rgba(165, 215, 255, 0.15)',
          glintIntensity: 0.95,
        },
      },
      {
        threshold: 0.68, // Projects/Workflow: Midnight Sapphire Abyss
        theme: {
          skyTop: '#02081a',
          skyMid: '#08214a',
          skyHorizon: '#0e376e',
          waterHorizon: '#0c2852',
          waterDeep: '#030b1a',
          moonGlow: 'rgba(191, 230, 255, 0.18)',
          glintIntensity: 1.05,
        },
      },
      {
        threshold: 1.0, // Contact/Footer: Celestial Twilight Calm
        theme: {
          skyTop: '#010410',
          skyMid: '#04122b',
          skyHorizon: '#071e40',
          waterHorizon: '#061934',
          waterDeep: '#01050e',
          moonGlow: 'rgba(160, 210, 250, 0.14)',
          glintIntensity: 0.9,
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
    // 3. TWINKLING STARFIELD (Upper sky / around clouds)
    // -------------------------------------------------------------
    interface Star {
      xRatio: number;
      yRatio: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      hasSpike: boolean;
    }

    let stars: Star[] = [];
    const initStars = () => {
      const count = Math.floor(Math.min(width, 1920) * 0.1);
      stars = [];
      for (let i = 0; i < count; i++) {
        // Concentrated in upper sky above the ocean horizon
        const yRatio = Math.pow(Math.random(), 1.4) * 0.65;
        const size = Math.random() < 0.1 ? 1.6 + Math.random() * 0.8 : 0.6 + Math.random() * 0.7;
        const hasSpike = size > 1.8 && Math.random() < 0.4;
        stars.push({
          xRatio: Math.random(),
          yRatio,
          size,
          baseAlpha: 0.35 + Math.random() * 0.55,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinklePhase: Math.random() * Math.PI * 2,
          hasSpike,
        });
      }
    };
    initStars();

    // -------------------------------------------------------------
    // 4. VOLUMETRIC MOONLIT CLOUD FORMATIONS
    // -------------------------------------------------------------
    interface CloudPuff {
      dx: number;
      dy: number;
      rx: number;
      ry: number;
      tilt: number;
    }

    interface CloudCluster {
      xRatio: number;
      yRatio: number;
      width: number;
      height: number;
      speedX: number;
      opacity: number;
      puffs: CloudPuff[];
      isMajorBank?: boolean;
    }

    let cloudClusters: CloudCluster[] = [];

    const generatePuffBank = (w: number, h: number, count: number): CloudPuff[] => {
      const puffs: CloudPuff[] = [];
      for (let i = 0; i < count; i++) {
        const ratio = i / (count - 1);
        const dx = (ratio - 0.5) * (w * 0.85);
        const centerCurve = Math.sin(ratio * Math.PI);
        const dy = (0.5 - centerCurve) * (h * 0.4) + (Math.random() - 0.5) * (h * 0.25);
        const rx = (h * 0.55 + Math.random() * (h * 0.45)) * (0.6 + centerCurve * 0.6);
        const ry = rx * (0.5 + Math.random() * 0.25);
        const tilt = (Math.random() - 0.5) * 0.12;
        puffs.push({ dx, dy, rx, ry, tilt });
      }
      return puffs;
    };

    const initClouds = () => {
      cloudClusters = [
        // Bank 1: Massive left/center cumulus bank (Hero feature from reference photo)
        {
          xRatio: 0.28,
          yRatio: 0.34,
          width: Math.min(width * 0.75, 780),
          height: 240,
          speedX: 0.05,
          opacity: 0.88,
          isMajorBank: true,
          puffs: generatePuffBank(Math.min(width * 0.75, 780), 240, 14),
        },
        // Bank 2: Mid-level horizontal stratocumulus band extending under the moon
        {
          xRatio: 0.58,
          yRatio: 0.46,
          width: Math.min(width * 0.85, 920),
          height: 150,
          speedX: 0.07,
          opacity: 0.75,
          puffs: generatePuffBank(Math.min(width * 0.85, 920), 150, 12),
        },
        // Bank 3: Lower horizon cloud layer just above the ocean surface
        {
          xRatio: 0.4,
          yRatio: 0.63,
          width: Math.min(width * 0.9, 980),
          height: 110,
          speedX: 0.04,
          opacity: 0.7,
          puffs: generatePuffBank(Math.min(width * 0.9, 980), 110, 10),
        },
        // Bank 4: Upper-right wispy clouds floating above/past the moon
        {
          xRatio: 0.84,
          yRatio: 0.1,
          width: Math.min(width * 0.55, 520),
          height: 90,
          speedX: 0.06,
          opacity: 0.55,
          puffs: generatePuffBank(Math.min(width * 0.55, 520), 90, 8),
        },
      ];
    };
    initClouds();

    // -------------------------------------------------------------
    // 5. ASCENDING FLOCK OF BIRDS (Diagonal Flight Formation)
    // -------------------------------------------------------------
    interface FlockBird {
      offsetOrder: number; // Position along the ascending flight curve
      relX: number;
      relY: number;
      scale: number;
      flapRate: number;
      flapPhase: number;
      isGliding: boolean;
      glideTimer: number;
      glideDuration: number;
    }

    // Anchor position for the whole bird flock (ascending toward upper-left)
    let flockBaseX = width * 0.22;
    let flockBaseY = height * 0.28;
    const flockCount = 9;
    const flockBirds: FlockBird[] = [];

    for (let i = 0; i < flockCount; i++) {
      // Diagonal curve path: x goes left to right, y descends down to the right
      const relX = (i - 4) * 28;
      const relY = (i - 4) * 16 + Math.sin(i * 0.4) * 6;
      flockBirds.push({
        offsetOrder: i,
        relX,
        relY,
        scale: 0.38 - i * 0.015, // Distant birds slightly smaller
        flapRate: 0.09 + Math.random() * 0.02,
        flapPhase: i * 0.55,
        isGliding: false,
        glideTimer: 0,
        glideDuration: 80 + Math.random() * 60,
      });
    }

    // -------------------------------------------------------------
    // 6. OCEAN WATER GLINTS (Moonlight reflection glade on water)
    // -------------------------------------------------------------
    interface WaterGlint {
      relDepth: number; // [0, 1] from horizon to screen bottom
      xOffsetNorm: number; // Normalized offset within the moon column
      width: number;
      height: number;
      sparklePhase: number;
      sparkleSpeed: number;
      alphaFactor: number;
    }

    let waterGlints: WaterGlint[] = [];
    const initWaterGlints = () => {
      const glintCount = Math.floor(Math.min(width, 1920) * 0.22); // ~200-350 glints
      waterGlints = [];
      for (let i = 0; i < glintCount; i++) {
        const relDepth = Math.pow(Math.random(), 1.35); // Distributed naturally toward horizon
        // Trapezoid corridor: wider near bottom, narrow at horizon
        const corridorWidth = 0.12 + relDepth * 0.22;
        const xOffsetNorm = (Math.random() - 0.5) * corridorWidth * (Math.random() < 0.6 ? 0.65 : 1.0);

        const glintW = (12 + relDepth * 38) * (0.6 + Math.random() * 0.8);
        const glintH = 1.0 + relDepth * 2.2;

        waterGlints.push({
          relDepth,
          xOffsetNorm,
          width: glintW,
          height: glintH,
          sparklePhase: Math.random() * Math.PI * 2,
          sparkleSpeed: 0.04 + Math.random() * 0.06,
          alphaFactor: 0.4 + Math.random() * 0.6,
        });
      }
    };
    initWaterGlints();

    // -------------------------------------------------------------
    // 7. MAIN RENDERING LOOP
    // -------------------------------------------------------------
    let currentScroll = 0;
    let targetScroll = 0;

    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      targetScroll = latest;
    });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse decay & smoothing
      mouseVx *= 0.9;
      mouseVy *= 0.9;
      const targetNormX = (mouseX / width - 0.5) * 2;
      const targetNormY = (mouseY / height - 0.5) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.06;
      const scrollPixelOffset = currentScroll * height * 0.65;

      // -----------------------------------------------------------
      // A. COMPUTE SKY & OCEAN THEME
      // -----------------------------------------------------------
      let themeIdx = 0;
      for (let i = 0; i < oceanThemes.length - 1; i++) {
        if (currentScroll >= oceanThemes[i].threshold && currentScroll <= oceanThemes[i + 1].threshold) {
          themeIdx = i;
          break;
        }
      }

      const t1 = oceanThemes[themeIdx];
      const t2 = oceanThemes[Math.min(themeIdx + 1, oceanThemes.length - 1)];
      const span = t2.threshold - t1.threshold || 0.01;
      const progressInSpan = Math.min(Math.max((currentScroll - t1.threshold) / span, 0), 1);

      const curSkyTop = lerpColor(t1.theme.skyTop, t2.theme.skyTop, progressInSpan);
      const curSkyMid = lerpColor(t1.theme.skyMid, t2.theme.skyMid, progressInSpan);
      const curSkyHorizon = lerpColor(t1.theme.skyHorizon, t2.theme.skyHorizon, progressInSpan);
      const curWaterHorizon = lerpColor(t1.theme.waterHorizon, t2.theme.waterHorizon, progressInSpan);
      const curWaterDeep = lerpColor(t1.theme.waterDeep, t2.theme.waterDeep, progressInSpan);
      const curGlintIntensity =
        t1.theme.glintIntensity +
        (t2.theme.glintIntensity - t1.theme.glintIntensity) * progressInSpan;

      const oceanHorizonY = height * 0.7 - scrollPixelOffset * 0.06 + smoothMouseNormY * 6;

      // -----------------------------------------------------------
      // B. RENDER SKY GRADIENT
      // -----------------------------------------------------------
      const skyGrad = ctx.createLinearGradient(0, 0, 0, oceanHorizonY);
      skyGrad.addColorStop(0, curSkyTop);
      skyGrad.addColorStop(0.48, curSkyMid);
      skyGrad.addColorStop(0.92, curSkyHorizon);
      skyGrad.addColorStop(1, '#0c2e5c');

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, oceanHorizonY);

      // -----------------------------------------------------------
      // C. TWINKLING STARS IN UPPER SKY
      // -----------------------------------------------------------
      ctx.save();
      const starParallaxX = smoothMouseNormX * 6;
      const starParallaxY = smoothMouseNormY * 4;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = star.xRatio * width + starParallaxX;
        const sy = star.yRatio * oceanHorizonY + starParallaxY;

        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const alpha = Math.max(0.15, Math.min(1.0, star.baseAlpha + twinkle * 0.35));

        ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.hasSpike && alpha > 0.65) {
          ctx.strokeStyle = `rgba(224, 242, 254, ${alpha * 0.5})`;
          ctx.lineWidth = 0.6;
          const spk = star.size * 2.6;
          ctx.beginPath();
          ctx.moveTo(sx - spk, sy);
          ctx.lineTo(sx + spk, sy);
          ctx.moveTo(sx, sy - spk);
          ctx.lineTo(sx, sy + spk);
          ctx.stroke();
        }
      }
      ctx.restore();

      // -----------------------------------------------------------
      // D. THE GLOWING FULL MOON (Upper Right - exact reference match)
      // -----------------------------------------------------------
      const moonX = (width < 640 ? width * 0.78 : width * 0.82) + smoothMouseNormX * 10;
      const moonY =
        (width < 640 ? height * 0.16 : height * 0.19) -
        scrollPixelOffset * 0.04 +
        smoothMouseNormY * 6;
      const moonRadius = width < 640 ? 24 : 32;

      ctx.save();

      // 1. Huge Volumetric Atmospheric Light Scatter Halo
      const outerMoonHalo = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.4,
        moonX,
        moonY,
        moonRadius * 12
      );
      outerMoonHalo.addColorStop(0, 'rgba(191, 226, 255, 0.25)');
      outerMoonHalo.addColorStop(0.25, 'rgba(147, 203, 253, 0.11)');
      outerMoonHalo.addColorStop(0.65, 'rgba(56, 150, 248, 0.03)');
      outerMoonHalo.addColorStop(1, 'transparent');

      ctx.fillStyle = outerMoonHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 12, 0, Math.PI * 2);
      ctx.fill();

      // 2. Intense Bright Moon Corona
      const innerMoonCorona = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.2,
        moonX,
        moonY,
        moonRadius * 3.2
      );
      innerMoonCorona.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      innerMoonCorona.addColorStop(0.35, 'rgba(219, 239, 254, 0.28)');
      innerMoonCorona.addColorStop(1, 'transparent');

      ctx.fillStyle = innerMoonCorona;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Moon Disc with Surface Texture & Silver Rim
      const moonDiscGrad = ctx.createRadialGradient(
        moonX - moonRadius * 0.25,
        moonY - moonRadius * 0.25,
        moonRadius * 0.1,
        moonX,
        moonY,
        moonRadius
      );
      moonDiscGrad.addColorStop(0, '#ffffff');
      moonDiscGrad.addColorStop(0.55, '#e0f2fe');
      moonDiscGrad.addColorStop(0.85, '#bae6fd');
      moonDiscGrad.addColorStop(1, '#93c5fd');

      ctx.fillStyle = moonDiscGrad;
      ctx.shadowColor = 'rgba(224, 245, 255, 0.95)';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle maria/crater shadings inside disc
      ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.3, moonY + moonRadius * 0.2, moonRadius * 0.32, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.2, moonY - moonRadius * 0.25, moonRadius * 0.28, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.35, moonRadius * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // -----------------------------------------------------------
      // E. VOLUMETRIC MOONLIT CLOUDS (Dramatic Cumulus Banks)
      // -----------------------------------------------------------
      cloudClusters.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.xRatio += (cloud.speedX * 0.016) / 45;
          if (cloud.xRatio > 1.4) cloud.xRatio = -0.4;
        }

        const cx = cloud.xRatio * width + smoothMouseNormX * 14;
        const cy = cloud.yRatio * height - scrollPixelOffset * 0.08 + smoothMouseNormY * 8;

        ctx.save();
        ctx.globalAlpha = cloud.opacity;

        cloud.puffs.forEach((puff, pidx) => {
          const px = cx + puff.dx;
          const py = cy + puff.dy;
          const rx = puff.rx;
          const ry = puff.ry;

          // Light source is at upper-right moon!
          // So highlights are on top and right edges
          const lightOffsetX = px + rx * 0.32;
          const lightOffsetY = py - ry * 0.38;

          const puffGrad = ctx.createRadialGradient(
            lightOffsetX,
            lightOffsetY,
            rx * 0.05,
            px,
            py,
            rx * 1.08
          );

          // Top/right edge illuminated with bright icy-blue moonlight
          puffGrad.addColorStop(0, 'rgba(215, 238, 255, 0.38)');
          puffGrad.addColorStop(0.28, 'rgba(165, 212, 255, 0.22)');
          // Deep rich midnight cobalt core/underside
          puffGrad.addColorStop(0.68, 'rgba(10, 28, 62, 0.65)');
          puffGrad.addColorStop(1, 'rgba(4, 14, 34, 0.0)');

          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.ellipse(px, py, rx, ry, puff.tilt + (pidx % 2 === 0 ? 0.05 : -0.05), 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      // -----------------------------------------------------------
      // F. ASCENDING FLOCK OF BIRDS (Upper-Left Diagonal Formation)
      // -----------------------------------------------------------
      if (!prefersReducedMotion) {
        flockBaseX += 0.55 + smoothMouseNormX * 0.15;
        flockBaseY += Math.sin(time * 0.8) * 0.12;

        if (flockBaseX > width + 140) {
          flockBaseX = -140;
          flockBaseY = height * 0.22 + Math.random() * (height * 0.15);
        }
      }

      flockBirds.forEach((b) => {
        if (!prefersReducedMotion) {
          b.glideTimer++;
          if (b.glideTimer > b.glideDuration) {
            b.isGliding = !b.isGliding;
            b.glideTimer = 0;
            b.glideDuration = b.isGliding ? 70 + Math.random() * 90 : 80 + Math.random() * 110;
          }

          if (!b.isGliding) {
            b.flapPhase += b.flapRate;
          }
        }

        const bx = flockBaseX + b.relX + smoothMouseNormX * 8;
        const by = flockBaseY + b.relY - scrollPixelOffset * 0.12 + smoothMouseNormY * 6;

        ctx.save();
        ctx.translate(bx, by);
        // Ascending diagonal flight angle (banking up toward upper-left)
        ctx.rotate(-0.24);
        ctx.scale(b.scale, b.scale);

        const flapAngle = b.isGliding ? 0.08 : Math.sin(b.flapPhase) * 0.72;

        // Luminous white/silver bird silhouette catching moonlight
        ctx.fillStyle = 'rgba(240, 248, 255, 0.88)';
        ctx.strokeStyle = 'rgba(240, 248, 255, 0.95)';
        ctx.lineWidth = 1.3;

        // Slender curved body
        ctx.beginPath();
        ctx.ellipse(0, 0, 5.2, 1.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Left aerodynamic gull wing
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.quadraticCurveTo(-11, flapAngle * 15 - 3, -22, flapAngle * 18);
        ctx.quadraticCurveTo(-12, flapAngle * 11 - 2, 0, 0);
        ctx.fill();
        ctx.stroke();

        // Right aerodynamic gull wing
        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.quadraticCurveTo(11, flapAngle * 15 - 3, 22, flapAngle * 18);
        ctx.quadraticCurveTo(12, flapAngle * 11 - 2, 0, 0);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // -----------------------------------------------------------
      // G. ANIMATED DARK OCEAN & WATER SURFACE
      // -----------------------------------------------------------
      ctx.save();

      // 1. Deep Ocean Base Water Gradient
      const oceanGrad = ctx.createLinearGradient(0, oceanHorizonY, 0, height);
      oceanGrad.addColorStop(0, curWaterHorizon);
      oceanGrad.addColorStop(0.28, '#061a38');
      oceanGrad.addColorStop(0.7, '#041228');
      oceanGrad.addColorStop(1, curWaterDeep);

      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, oceanHorizonY, width, height - oceanHorizonY);

      // 2. Horizon Line Moonlight Sheen (Right below the moon)
      const horizonSheen = ctx.createLinearGradient(
        moonX - 220,
        oceanHorizonY,
        moonX + 220,
        oceanHorizonY
      );
      horizonSheen.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
      horizonSheen.addColorStop(0.35, 'rgba(219, 239, 254, 0.55)');
      horizonSheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
      horizonSheen.addColorStop(0.65, 'rgba(219, 239, 254, 0.55)');
      horizonSheen.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

      ctx.strokeStyle = horizonSheen;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(moonX - 260, oceanHorizonY);
      ctx.lineTo(moonX + 260, oceanHorizonY);
      ctx.stroke();

      // 3. Animated Rolling Waves (Perspective from horizon down to foreground)
      const waveBands = 18;
      for (let w = 0; w < waveBands; w++) {
        const t = (w + 1) / waveBands; // [0, 1]
        const waveBaseY = oceanHorizonY + Math.pow(t, 1.7) * (height - oceanHorizonY);
        const waveAmp = (1.2 + t * 5.5) * (prefersReducedMotion ? 0.3 : 1.0);
        const waveFreq = 0.012 - t * 0.005;
        const waveSpeed = 0.8 + t * 1.2;

        ctx.beginPath();
        ctx.moveTo(0, waveBaseY);

        for (let x = 0; x <= width; x += 18) {
          const waveY =
            waveBaseY +
            Math.sin(x * waveFreq + time * waveSpeed + w * 1.3) * waveAmp +
            Math.cos(x * waveFreq * 2.1 - time * waveSpeed * 0.8) * (waveAmp * 0.35);
          ctx.lineTo(x, waveY);
        }

        // Wave crest highlight
        const crestAlpha = (0.08 + t * 0.16) * curGlintIntensity;
        ctx.strokeStyle = `rgba(186, 224, 255, ${crestAlpha})`;
        ctx.lineWidth = 1.0 + t * 1.2;
        ctx.stroke();
      }

      // -----------------------------------------------------------
      // H. MOONLIGHT REFLECTION CORRIDOR (Glittering Water Glade)
      // -----------------------------------------------------------
      // Directly underneath the moon, sparkling down across the water
      const oceanH = height - oceanHorizonY;

      waterGlints.forEach((glint) => {
        const d = glint.relDepth;
        const gy = oceanHorizonY + Math.pow(d, 1.6) * oceanH;

        // Corridor expands downward in perspective
        const corridorSpread = (110 + d * 320) * 0.5;
        const gx = moonX + glint.xOffsetNorm * corridorSpread * 2 + smoothMouseNormX * 8;

        // Sparkling intensity oscillation
        const sparkle = Math.sin(time * 60 * glint.sparkleSpeed + glint.sparklePhase);
        const glintAlpha =
          Math.max(0.05, Math.min(1.0, 0.45 + sparkle * 0.55)) *
          glint.alphaFactor *
          curGlintIntensity;

        if (glintAlpha <= 0.08) return;

        // Horizontal specular highlight dash on wave crest
        const glintGrad = ctx.createLinearGradient(
          gx - glint.width * 0.5,
          gy,
          gx + glint.width * 0.5,
          gy
        );
        glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        glintGrad.addColorStop(0.5, `rgba(255, 255, 255, ${glintAlpha * 0.95})`);
        glintGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        ctx.fillStyle = glintGrad;
        ctx.fillRect(gx - glint.width * 0.5, gy - glint.height * 0.5, glint.width, glint.height);

        // Soft icy-blue halo around bright foreground glints
        if (d > 0.4 && glintAlpha > 0.6) {
          ctx.fillStyle = `rgba(186, 230, 253, ${glintAlpha * 0.25})`;
          ctx.beginPath();
          ctx.ellipse(gx, gy, glint.width * 0.4, glint.height * 2.2, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();

      // -----------------------------------------------------------
      // I. VIGNETTE OVERLAY (Readability & Professional Depth)
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.82
      );
      vignette.addColorStop(0, 'rgba(2, 6, 18, 0.14)');
      vignette.addColorStop(1, 'rgba(2, 5, 16, 0.76)');

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

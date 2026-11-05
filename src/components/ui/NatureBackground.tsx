import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Photorealistic Moonlit Ocean Background with Living Water Shimmer,
 * Crisp Moon Corona, Drifting Atmospheric Mist, and Flying Birds Flock.
 *
 * Implements the authentic moonlit ocean environment:
 * - Uses the high-fidelity moonlit ocean artwork as the foundational visual asset layer.
 * - Crisp, highly-detailed moon with subtle breathing corona (no artificial blur).
 * - Photorealistic clouds with natural fractal edges and genuine silver rim highlights.
 * - Real ocean wave textures with continuous shimmering moonlight specular reflections.
 * - Ascending flock of silver-white birds with aerodynamic flap/glide physics.
 * - Smooth mouse parallax and scroll-driven color grading with high-contrast text readability.
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

    // Load authentic high-resolution moonlit ocean asset
    const bgImage = new Image();
    bgImage.src = '/moonlit-ocean.jpg';
    let imageLoaded = false;
    bgImage.onload = () => {
      imageLoaded = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initWaterShimmer();
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
    // 2. NOCTURNAL COLOR GRADING THEMES (Scroll-Responsive)
    // -------------------------------------------------------------
    interface ColorTheme {
      skyOverlay: string;
      oceanTint: string;
      moonCoronaAlpha: number;
      shimmerBoost: number;
    }

    const themes: Array<{ threshold: number; theme: ColorTheme }> = [
      {
        threshold: 0.0, // Hero: Pure Moonlit Deep Cobalt Night
        theme: {
          skyOverlay: 'rgba(2, 7, 24, 0.12)',
          oceanTint: 'rgba(2, 9, 26, 0.18)',
          moonCoronaAlpha: 0.24,
          shimmerBoost: 1.0,
        },
      },
      {
        threshold: 0.33, // Frontend/Backend: Deep Indigo Ocean
        theme: {
          skyOverlay: 'rgba(3, 8, 30, 0.16)',
          oceanTint: 'rgba(2, 8, 22, 0.22)',
          moonCoronaAlpha: 0.22,
          shimmerBoost: 0.95,
        },
      },
      {
        threshold: 0.68, // Projects/Workflow: Midnight Sapphire
        theme: {
          skyOverlay: 'rgba(4, 10, 36, 0.14)',
          oceanTint: 'rgba(3, 10, 28, 0.2)',
          moonCoronaAlpha: 0.26,
          shimmerBoost: 1.05,
        },
      },
      {
        threshold: 1.0, // Contact/Footer: Celestial Deep Abyss
        theme: {
          skyOverlay: 'rgba(1, 5, 18, 0.2)',
          oceanTint: 'rgba(1, 6, 20, 0.25)',
          moonCoronaAlpha: 0.2,
          shimmerBoost: 0.9,
        },
      },
    ];

    // -------------------------------------------------------------
    // 3. TWINKLING STARS IN UPPER-LEFT SKY
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
      const count = Math.floor(Math.min(width, 1920) * 0.075);
      stars = [];
      for (let i = 0; i < count; i++) {
        // Concentrated in upper-left and upper sky
        const xRatio = Math.random() < 0.75 ? Math.random() * 0.55 : Math.random();
        const yRatio = Math.pow(Math.random(), 1.5) * 0.42;
        const size = Math.random() < 0.12 ? 1.6 + Math.random() * 0.6 : 0.6 + Math.random() * 0.6;
        const hasSpike = size > 1.7 && Math.random() < 0.35;
        stars.push({
          xRatio,
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
    // 4. LIVING WATER SHIMMER GLINTS (Moonlight reflection glade)
    // -------------------------------------------------------------
    interface ShimmerGlint {
      depthRatio: number; // [0, 1] from horizon to ocean bottom
      corridorOffset: number; // [-0.5, 0.5] within the reflection path
      length: number;
      thickness: number;
      speed: number;
      phase: number;
      alpha: number;
    }

    let shimmerGlints: ShimmerGlint[] = [];
    const initWaterShimmer = () => {
      const count = Math.floor(Math.min(width, 1920) * 0.22); // ~180-320 glints
      shimmerGlints = [];
      for (let i = 0; i < count; i++) {
        const depthRatio = Math.pow(Math.random(), 1.35);
        // Concentrated along moon reflection column with natural scatter
        const corridorOffset = (Math.random() - 0.5) * (Math.random() < 0.65 ? 0.6 : 1.0);
        const length = (10 + depthRatio * 34) * (0.6 + Math.random() * 0.8);
        const thickness = 0.8 + depthRatio * 1.8;
        const speed = 0.03 + Math.random() * 0.05;
        const phase = Math.random() * Math.PI * 2;
        const alpha = 0.35 + Math.random() * 0.65;

        shimmerGlints.push({
          depthRatio,
          corridorOffset,
          length,
          thickness,
          speed,
          phase,
          alpha,
        });
      }
    };
    initWaterShimmer();

    // -------------------------------------------------------------
    // 5. ASCENDING FLOCK OF FLYING BIRDS
    // -------------------------------------------------------------
    interface Bird {
      order: number;
      relX: number;
      relY: number;
      scale: number;
      flapRate: number;
      flapPhase: number;
      isGliding: boolean;
      glideTimer: number;
      glideDuration: number;
    }

    let flockBaseX = width * 0.18;
    let flockBaseY = height * 0.22;
    const birdCount = 9;
    const birds: Bird[] = [];

    for (let i = 0; i < birdCount; i++) {
      const relX = (i - 4) * 26;
      const relY = (i - 4) * 15 + Math.sin(i * 0.45) * 5;
      birds.push({
        order: i,
        relX,
        relY,
        scale: 0.34 - i * 0.012,
        flapRate: 0.085 + Math.random() * 0.02,
        flapPhase: i * 0.6,
        isGliding: false,
        glideTimer: 0,
        glideDuration: 80 + Math.random() * 70,
      });
    }

    // -------------------------------------------------------------
    // 6. SUBTLE DRIFTING MIST (Atmospheric depth)
    // -------------------------------------------------------------
    interface DriftingMist {
      xRatio: number;
      yRatio: number;
      wRatio: number;
      hRatio: number;
      speedX: number;
      opacity: number;
    }

    const driftingMists: DriftingMist[] = [
      { xRatio: 0.15, yRatio: 0.32, wRatio: 0.55, hRatio: 0.18, speedX: 0.04, opacity: 0.09 },
      { xRatio: 0.45, yRatio: 0.44, wRatio: 0.65, hRatio: 0.14, speedX: 0.05, opacity: 0.07 },
      { xRatio: 0.75, yRatio: 0.22, wRatio: 0.45, hRatio: 0.12, speedX: 0.03, opacity: 0.08 },
    ];

    // -------------------------------------------------------------
    // 7. MAIN SIMULATION & RENDERING LOOP
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
      const scrollPixelOffset = currentScroll * height * 0.55;

      // Current Theme Interpolation
      let themeIdx = 0;
      for (let i = 0; i < themes.length - 1; i++) {
        if (currentScroll >= themes[i].threshold && currentScroll <= themes[i + 1].threshold) {
          themeIdx = i;
          break;
        }
      }
      const curTheme = themes[themeIdx].theme;

      // -----------------------------------------------------------
      // A. DRAW FOUNDATIONAL MOONLIT OCEAN ARTWORK
      // -----------------------------------------------------------
      if (imageLoaded) {
        // High-fidelity cover-fit calculations with parallax headroom
        const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
        const canvasRatio = width / height;
        let baseW = width;
        let baseH = height;

        if (canvasRatio > imgRatio) {
          baseW = width * 1.06;
          baseH = baseW / imgRatio;
        } else {
          baseH = height * 1.06;
          baseW = baseH * imgRatio;
        }

        const drawX = (width - baseW) / 2 + smoothMouseNormX * 14;
        const drawY = (height - baseH) / 2 + smoothMouseNormY * 9 - scrollPixelOffset * 0.04;

        ctx.drawImage(bgImage, drawX, drawY, baseW, baseH);

        // Calculate key physical anchor points from the artwork
        const oceanHorizonY = drawY + baseH * 0.68;
        const oceanH = height - oceanHorizonY;
        const moonX = drawX + baseW * 0.828;
        const moonY = drawY + baseH * 0.256;
        const moonRadius = baseW * 0.051;

        // ---------------------------------------------------------
        // B. CRISP MOON CORONA & ATMOSPHERIC BREATHING HALO
        // ---------------------------------------------------------
        ctx.save();
        // Distance from cursor to moon determines subtle luminous bloom
        const distToMoon = Math.hypot(mouseX - moonX, mouseY - moonY);
        const moonBloom = Math.max(0, 1 - distToMoon / 600) * 0.08;
        const coronaRadius = moonRadius * (2.4 + Math.sin(time * 0.6) * 0.15);

        const coronaGrad = ctx.createRadialGradient(
          moonX,
          moonY,
          moonRadius * 0.75,
          moonX,
          moonY,
          coronaRadius
        );
        coronaGrad.addColorStop(0, `rgba(224, 242, 254, ${curTheme.moonCoronaAlpha + moonBloom})`);
        coronaGrad.addColorStop(0.45, `rgba(186, 230, 253, ${(curTheme.moonCoronaAlpha + moonBloom) * 0.45})`);
        coronaGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = coronaGrad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, coronaRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // ---------------------------------------------------------
        // C. TWINKLING STARS IN DARK SKY PATCHES
        // ---------------------------------------------------------
        ctx.save();
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const sx = star.xRatio * width + smoothMouseNormX * 5;
          const sy = star.yRatio * oceanHorizonY + smoothMouseNormY * 3;

          const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
          const alpha = Math.max(0.12, Math.min(0.95, star.baseAlpha + twinkle * 0.35));

          ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();

          if (star.hasSpike && alpha > 0.65) {
            ctx.strokeStyle = `rgba(224, 242, 254, ${alpha * 0.45})`;
            ctx.lineWidth = 0.55;
            const spk = star.size * 2.4;
            ctx.beginPath();
            ctx.moveTo(sx - spk, sy);
            ctx.lineTo(sx + spk, sy);
            ctx.moveTo(sx, sy - spk);
            ctx.lineTo(sx, sy + spk);
            ctx.stroke();
          }
        }
        ctx.restore();

        // ---------------------------------------------------------
        // D. SUBTLE DRIFTING ATMOSPHERIC MIST
        // ---------------------------------------------------------
        ctx.save();
        driftingMists.forEach((mist) => {
          if (!prefersReducedMotion) {
            mist.xRatio += (mist.speedX * 0.016) / 45;
            if (mist.xRatio > 1.3) mist.xRatio = -0.3;
          }

          const mx = mist.xRatio * width + smoothMouseNormX * 10;
          const my = mist.yRatio * height - scrollPixelOffset * 0.05 + smoothMouseNormY * 5;
          const mw = mist.wRatio * width;
          const mh = mist.hRatio * height;

          const mistGrad = ctx.createRadialGradient(mx, my, mh * 0.1, mx, my, mw * 0.5);
          mistGrad.addColorStop(0, `rgba(186, 224, 255, ${mist.opacity})`);
          mistGrad.addColorStop(0.5, `rgba(147, 197, 253, ${mist.opacity * 0.4})`);
          mistGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = mistGrad;
          ctx.beginPath();
          ctx.ellipse(mx, my, mw * 0.5, mh * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        // ---------------------------------------------------------
        // E. ASCENDING FLOCK OF BIRDS
        // ---------------------------------------------------------
        if (!prefersReducedMotion) {
          flockBaseX += 0.45 + smoothMouseNormX * 0.1;
          flockBaseY += Math.sin(time * 0.7) * 0.1;

          if (flockBaseX > width + 120) {
            flockBaseX = -120;
            flockBaseY = height * 0.18 + Math.random() * (height * 0.12);
          }
        }

        birds.forEach((b) => {
          if (!prefersReducedMotion) {
            b.glideTimer++;
            if (b.glideTimer > b.glideDuration) {
              b.isGliding = !b.isGliding;
              b.glideTimer = 0;
              b.glideDuration = b.isGliding ? 70 + Math.random() * 80 : 80 + Math.random() * 100;
            }

            if (!b.isGliding) {
              b.flapPhase += b.flapRate;
            }
          }

          const bx = flockBaseX + b.relX + smoothMouseNormX * 7;
          const by = flockBaseY + b.relY - scrollPixelOffset * 0.08 + smoothMouseNormY * 5;

          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(-0.24); // Ascending diagonal orientation
          ctx.scale(b.scale, b.scale);

          const flapAngle = b.isGliding ? 0.08 : Math.sin(b.flapPhase) * 0.72;

          ctx.fillStyle = 'rgba(240, 248, 255, 0.88)';
          ctx.strokeStyle = 'rgba(240, 248, 255, 0.95)';
          ctx.lineWidth = 1.25;

          // Slender body
          ctx.beginPath();
          ctx.ellipse(0, 0, 5.0, 1.5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Left gull wing
          ctx.beginPath();
          ctx.moveTo(-1, 0);
          ctx.quadraticCurveTo(-10, flapAngle * 14 - 3, -20, flapAngle * 17);
          ctx.quadraticCurveTo(-11, flapAngle * 10 - 2, 0, 0);
          ctx.fill();
          ctx.stroke();

          // Right gull wing
          ctx.beginPath();
          ctx.moveTo(1, 0);
          ctx.quadraticCurveTo(10, flapAngle * 14 - 3, 20, flapAngle * 17);
          ctx.quadraticCurveTo(11, flapAngle * 10 - 2, 0, 0);
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        });

        // ---------------------------------------------------------
        // F. LIVING WATER SHIMMER & MOONLIGHT REFLECTIONS
        // ---------------------------------------------------------
        ctx.save();
        // Horizon subtle sheen line directly under the moon
        const sheenW = 280;
        const horizonSheenGrad = ctx.createLinearGradient(
          moonX - sheenW * 0.5,
          oceanHorizonY,
          moonX + sheenW * 0.5,
          oceanHorizonY
        );
        horizonSheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        horizonSheenGrad.addColorStop(0.35, 'rgba(224, 242, 254, 0.45)');
        horizonSheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
        horizonSheenGrad.addColorStop(0.65, 'rgba(224, 242, 254, 0.45)');
        horizonSheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        ctx.strokeStyle = horizonSheenGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(moonX - sheenW * 0.5, oceanHorizonY);
        ctx.lineTo(moonX + sheenW * 0.5, oceanHorizonY);
        ctx.stroke();

        // Shimmering specular glints along the ocean reflection glade
        shimmerGlints.forEach((glint) => {
          const d = glint.depthRatio;
          const gy = oceanHorizonY + Math.pow(d, 1.55) * oceanH;

          // Corridor expands toward foreground in perspective
          const corridorSpread = 90 + d * 280;
          const gx = moonX + glint.corridorOffset * corridorSpread + smoothMouseNormX * 7;

          // Natural harmonic wave sparkle
          const sparkle = Math.sin(time * 60 * glint.speed + glint.phase);
          const glintAlpha =
            Math.max(0.04, Math.min(1.0, 0.45 + sparkle * 0.55)) *
            glint.alpha *
            curTheme.shimmerBoost;

          if (glintAlpha <= 0.06) return;

          const glintGrad = ctx.createLinearGradient(
            gx - glint.length * 0.5,
            gy,
            gx + glint.length * 0.5,
            gy
          );
          glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
          glintGrad.addColorStop(0.5, `rgba(255, 255, 255, ${glintAlpha * 0.95})`);
          glintGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

          ctx.fillStyle = glintGrad;
          ctx.fillRect(
            gx - glint.length * 0.5,
            gy - glint.thickness * 0.5,
            glint.length,
            glint.thickness
          );

          // Subtle cyan-blue specular halo on prominent foreground glints
          if (d > 0.45 && glintAlpha > 0.65) {
            ctx.fillStyle = `rgba(186, 230, 253, ${glintAlpha * 0.2})`;
            ctx.beginPath();
            ctx.ellipse(gx, gy, glint.length * 0.4, glint.thickness * 2.0, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.restore();
      } else {
        // Fallback dark gradient before image loads
        const fallbackGrad = ctx.createLinearGradient(0, 0, 0, height);
        fallbackGrad.addColorStop(0, '#020718');
        fallbackGrad.addColorStop(0.65, '#071d44');
        fallbackGrad.addColorStop(1, '#020916');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------
      // G. CALIBRATED VIGNETTE (Readability & Professional Depth)
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, 'rgba(2, 6, 18, 0.16)');
      vignette.addColorStop(1, 'rgba(2, 5, 16, 0.72)');

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

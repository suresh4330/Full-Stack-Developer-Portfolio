import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Refined Cinematic Moonlit Ocean Environment
 *
 * Implements user's exact polish specifications:
 * 1. Reduced background brightness and excessive blue saturation (deep midnight navy grade).
 * 2. Smaller, sharper, naturally illuminated moon (tight natural rim, no blurry bloom).
 * 3. Crisp, realistic cloud textures without any blurry mist blobs.
 * 4. Smaller, realistic, subtle birds (distant flock with natural flight physics).
 * 5. Dark navy atmospheric depth overlay ensuring background is visually secondary.
 * 6. Subtle, realistic, delicate moonlight reflections on the dark ocean.
 * 7. Smooth, natural environmental motion with mouse parallax & scroll transitions.
 * 8. All portfolio content, navigation, typography, and buttons remain 100% sharp and readable.
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

    // Foundational high-fidelity artwork asset
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
    // 2. SCROLL THEMES & NOCTURNAL COLOR GRADING
    // -------------------------------------------------------------
    interface ThemeProfile {
      navyOverlayAlpha: number;
      oceanShimmerAlpha: number;
    }

    const themes: Array<{ threshold: number; profile: ThemeProfile }> = [
      {
        threshold: 0.0, // Hero: Deep Midnight Navy
        profile: {
          navyOverlayAlpha: 0.38,
          oceanShimmerAlpha: 0.85,
        },
      },
      {
        threshold: 0.33, // Frontend/Backend: Deep Indigo Calm
        profile: {
          navyOverlayAlpha: 0.42,
          oceanShimmerAlpha: 0.78,
        },
      },
      {
        threshold: 0.68, // Projects/Workflow: Midnight Sapphire
        profile: {
          navyOverlayAlpha: 0.39,
          oceanShimmerAlpha: 0.88,
        },
      },
      {
        threshold: 1.0, // Contact/Footer: Celestial Deep Nocturne
        profile: {
          navyOverlayAlpha: 0.45,
          oceanShimmerAlpha: 0.75,
        },
      },
    ];

    // -------------------------------------------------------------
    // 3. SUBTLE TWINKLING STARS IN DARK SKY PATCHES
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
      const count = Math.floor(Math.min(width, 1920) * 0.065); // Subtle count
      stars = [];
      for (let i = 0; i < count; i++) {
        const xRatio = Math.random() < 0.8 ? Math.random() * 0.52 : Math.random();
        const yRatio = Math.pow(Math.random(), 1.6) * 0.4;
        const size = Math.random() < 0.1 ? 1.4 + Math.random() * 0.5 : 0.5 + Math.random() * 0.5;
        const hasSpike = size > 1.6 && Math.random() < 0.3;
        stars.push({
          xRatio,
          yRatio,
          size,
          baseAlpha: 0.25 + Math.random() * 0.45,
          twinkleSpeed: 0.018 + Math.random() * 0.035,
          twinklePhase: Math.random() * Math.PI * 2,
          hasSpike,
        });
      }
    };
    initStars();

    // -------------------------------------------------------------
    // 4. SUBTLE, REALISTIC MOONLIGHT WATER REFLECTION GLINTS
    // -------------------------------------------------------------
    interface SubtleGlint {
      depthRatio: number; // [0, 1] from horizon to ocean bottom
      corridorOffset: number; // Offset inside reflection corridor
      length: number;
      thickness: number;
      speed: number;
      phase: number;
      baseAlpha: number;
    }

    let waterGlints: SubtleGlint[] = [];
    const initWaterShimmer = () => {
      const count = Math.floor(Math.min(width, 1920) * 0.16); // Refined count
      waterGlints = [];
      for (let i = 0; i < count; i++) {
        const depthRatio = Math.pow(Math.random(), 1.45);
        const corridorOffset = (Math.random() - 0.5) * (Math.random() < 0.7 ? 0.55 : 0.95);
        // Slender, delicate wave glints
        const length = (6 + depthRatio * 20) * (0.6 + Math.random() * 0.8);
        const thickness = 0.6 + depthRatio * 1.1;
        const speed = 0.025 + Math.random() * 0.04;
        const phase = Math.random() * Math.PI * 2;
        const baseAlpha = 0.22 + Math.random() * 0.45;

        waterGlints.push({
          depthRatio,
          corridorOffset,
          length,
          thickness,
          speed,
          phase,
          baseAlpha,
        });
      }
    };
    initWaterShimmer();

    // -------------------------------------------------------------
    // 5. SMALL, REALISTIC & SUBTLE DISTANT BIRDS
    // -------------------------------------------------------------
    interface SmallBird {
      order: number;
      relX: number;
      relY: number;
      scale: number;
      flapRate: number;
      flapPhase: number;
      isGliding: boolean;
      glideTimer: number;
      glideDuration: number;
      opacity: number;
    }

    let flockBaseX = width * 0.16;
    let flockBaseY = height * 0.2;
    const birdCount = 8;
    const smallBirds: SmallBird[] = [];

    for (let i = 0; i < birdCount; i++) {
      const relX = (i - 3.5) * 22;
      const relY = (i - 3.5) * 12 + Math.sin(i * 0.5) * 4;
      smallBirds.push({
        order: i,
        relX,
        relY,
        scale: 0.16 - i * 0.006, // Smaller, subtle scale
        flapRate: 0.08 + Math.random() * 0.02,
        flapPhase: i * 0.55,
        isGliding: false,
        glideTimer: 0,
        glideDuration: 90 + Math.random() * 80,
        opacity: 0.48 + Math.random() * 0.18,
      });
    }

    // -------------------------------------------------------------
    // 6. MAIN SIMULATION & RENDERING LOOP
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
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.04;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.04;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.055;
      const scrollPixelOffset = currentScroll * height * 0.45;

      // Current Theme Profile
      let themeIdx = 0;
      for (let i = 0; i < themes.length - 1; i++) {
        if (currentScroll >= themes[i].threshold && currentScroll <= themes[i + 1].threshold) {
          themeIdx = i;
          break;
        }
      }
      const curProfile = themes[themeIdx].profile;

      // -----------------------------------------------------------
      // A. DRAW FOUNDATIONAL MOONLIT OCEAN ARTWORK
      // -----------------------------------------------------------
      if (imageLoaded) {
        const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
        const canvasRatio = width / height;
        let baseW = width;
        let baseH = height;

        if (canvasRatio > imgRatio) {
          baseW = width * 1.05;
          baseH = baseW / imgRatio;
        } else {
          baseH = height * 1.05;
          baseW = baseH * imgRatio;
        }

        const drawX = (width - baseW) / 2 + smoothMouseNormX * 10;
        const drawY = (height - baseH) / 2 + smoothMouseNormY * 7 - scrollPixelOffset * 0.035;

        // Draw the photorealistic artwork
        ctx.drawImage(bgImage, drawX, drawY, baseW, baseH);

        // ---------------------------------------------------------
        // B. DEEP MIDNIGHT NAVY COLOR-GRADE LAYER
        // Reduces excessive brightness and harsh electric blue saturation
        // ---------------------------------------------------------
        ctx.save();
        // Deep indigo/navy toning overlay to desaturate and darken
        ctx.fillStyle = `rgba(3, 8, 22, ${curProfile.navyOverlayAlpha})`;
        ctx.fillRect(drawX, drawY, baseW, baseH);

        // Subtle nocturnal cyan-indigo gradient to enrich night ambiance
        const toneGrad = ctx.createLinearGradient(0, drawY, 0, drawY + baseH);
        toneGrad.addColorStop(0, 'rgba(2, 6, 18, 0.42)');
        toneGrad.addColorStop(0.55, 'rgba(3, 10, 26, 0.22)');
        toneGrad.addColorStop(1, 'rgba(1, 4, 14, 0.48)');
        ctx.fillStyle = toneGrad;
        ctx.fillRect(drawX, drawY, baseW, baseH);
        ctx.restore();

        // Physical coordinates from artwork
        const oceanHorizonY = drawY + baseH * 0.68;
        const oceanH = height - oceanHorizonY;
        const moonX = drawX + baseW * 0.828;
        const moonY = drawY + baseH * 0.256;
        const moonRadius = baseW * 0.042; // Naturally proportioned & compact

        // ---------------------------------------------------------
        // C. CRISP, SHARP & NATURALLY ILLUMINATED MOON
        // Tight, subtle natural rim halo — NO oversized blurry bloom!
        // ---------------------------------------------------------
        ctx.save();
        // Delicate, tight natural atmospheric rim (radius only 1.25x)
        const haloRadius = moonRadius * 1.25;
        const tightHalo = ctx.createRadialGradient(
          moonX,
          moonY,
          moonRadius * 0.9,
          moonX,
          moonY,
          haloRadius
        );
        tightHalo.addColorStop(0, 'rgba(235, 245, 255, 0.16)');
        tightHalo.addColorStop(0.5, 'rgba(186, 224, 255, 0.06)');
        tightHalo.addColorStop(1, 'transparent');

        ctx.fillStyle = tightHalo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp illuminated silver outer limb accent
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 0.98, -Math.PI * 0.3, Math.PI * 0.7);
        ctx.stroke();
        ctx.restore();

        // ---------------------------------------------------------
        // D. SUBTLE TWINKLING STARS
        // ---------------------------------------------------------
        ctx.save();
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const sx = star.xRatio * width + smoothMouseNormX * 4;
          const sy = star.yRatio * oceanHorizonY + smoothMouseNormY * 2.5;

          const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
          const alpha = Math.max(0.1, Math.min(0.85, star.baseAlpha + twinkle * 0.28));

          ctx.fillStyle = `rgba(224, 238, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();

          if (star.hasSpike && alpha > 0.55) {
            ctx.strokeStyle = `rgba(224, 238, 255, ${alpha * 0.35})`;
            ctx.lineWidth = 0.5;
            const spk = star.size * 2.0;
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
        // E. SMALL, DISTANT & SUBTLE FLYING BIRDS
        // ---------------------------------------------------------
        if (!prefersReducedMotion) {
          flockBaseX += 0.35 + smoothMouseNormX * 0.08;
          flockBaseY += Math.sin(time * 0.6) * 0.08;

          if (flockBaseX > width + 100) {
            flockBaseX = -100;
            flockBaseY = height * 0.16 + Math.random() * (height * 0.12);
          }
        }

        smallBirds.forEach((b) => {
          if (!prefersReducedMotion) {
            b.glideTimer++;
            if (b.glideTimer > b.glideDuration) {
              b.isGliding = !b.isGliding;
              b.glideTimer = 0;
              b.glideDuration = b.isGliding ? 80 + Math.random() * 80 : 80 + Math.random() * 100;
            }

            if (!b.isGliding) {
              b.flapPhase += b.flapRate;
            }
          }

          const bx = flockBaseX + b.relX + smoothMouseNormX * 5;
          const by = flockBaseY + b.relY - scrollPixelOffset * 0.06 + smoothMouseNormY * 4;

          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(-0.24); // Graceful ascending diagonal orientation
          ctx.scale(b.scale, b.scale);

          const flapAngle = b.isGliding ? 0.06 : Math.sin(b.flapPhase) * 0.68;

          // Subtle, natural silver bird silhouette
          ctx.fillStyle = `rgba(235, 245, 255, ${b.opacity})`;
          ctx.strokeStyle = `rgba(235, 245, 255, ${b.opacity * 0.9})`;
          ctx.lineWidth = 0.9;

          // Tiny slender body
          ctx.beginPath();
          ctx.ellipse(0, 0, 4.4, 1.3, 0, 0, Math.PI * 2);
          ctx.fill();

          // Left gull wing
          ctx.beginPath();
          ctx.moveTo(-1, 0);
          ctx.quadraticCurveTo(-9, flapAngle * 12 - 2.5, -17, flapAngle * 15);
          ctx.quadraticCurveTo(-10, flapAngle * 9 - 1.5, 0, 0);
          ctx.fill();
          ctx.stroke();

          // Right gull wing
          ctx.beginPath();
          ctx.moveTo(1, 0);
          ctx.quadraticCurveTo(9, flapAngle * 12 - 2.5, 17, flapAngle * 15);
          ctx.quadraticCurveTo(10, flapAngle * 9 - 1.5, 0, 0);
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        });

        // ---------------------------------------------------------
        // F. SUBTLE, REALISTIC MOONLIGHT REFLECTIONS ON OCEAN
        // ---------------------------------------------------------
        ctx.save();
        // Delicate horizon shimmer line
        const sheenW = 220;
        const horizonSheen = ctx.createLinearGradient(
          moonX - sheenW * 0.5,
          oceanHorizonY,
          moonX + sheenW * 0.5,
          oceanHorizonY
        );
        horizonSheen.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        horizonSheen.addColorStop(0.35, 'rgba(219, 239, 254, 0.35)');
        horizonSheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
        horizonSheen.addColorStop(0.65, 'rgba(219, 239, 254, 0.35)');
        horizonSheen.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        ctx.strokeStyle = horizonSheen;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(moonX - sheenW * 0.5, oceanHorizonY);
        ctx.lineTo(moonX + sheenW * 0.5, oceanHorizonY);
        ctx.stroke();

        // Subtle water glints
        waterGlints.forEach((glint) => {
          const d = glint.depthRatio;
          const gy = oceanHorizonY + Math.pow(d, 1.5) * oceanH;

          const corridorSpread = 70 + d * 220;
          const gx = moonX + glint.corridorOffset * corridorSpread + smoothMouseNormX * 5;

          const sparkle = Math.sin(time * 60 * glint.speed + glint.phase);
          const glintAlpha =
            Math.max(0.04, Math.min(1.0, 0.35 + sparkle * 0.45)) *
            glint.baseAlpha *
            curProfile.oceanShimmerAlpha;

          if (glintAlpha <= 0.05) return;

          const glintGrad = ctx.createLinearGradient(
            gx - glint.length * 0.5,
            gy,
            gx + glint.length * 0.5,
            gy
          );
          glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
          glintGrad.addColorStop(0.5, `rgba(240, 248, 255, ${glintAlpha * 0.85})`);
          glintGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

          ctx.fillStyle = glintGrad;
          ctx.fillRect(
            gx - glint.length * 0.5,
            gy - glint.thickness * 0.5,
            glint.length,
            glint.thickness
          );
        });
        ctx.restore();
      } else {
        // Fallback dark midnight gradient before image loads
        const fallbackGrad = ctx.createLinearGradient(0, 0, 0, height);
        fallbackGrad.addColorStop(0, '#020512');
        fallbackGrad.addColorStop(0.65, '#05132b');
        fallbackGrad.addColorStop(1, '#01040d');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------
      // G. CALIBRATED VIGNETTE (Readability & Professional Depth)
      // Ensures background remains visually secondary to hero content
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.4,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.88
      );
      vignette.addColorStop(0, 'rgba(2, 5, 16, 0.22)');
      vignette.addColorStop(1, 'rgba(1, 4, 12, 0.82)');

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

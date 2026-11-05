import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Photorealistic Moonlit Ocean Background with Living, Continuously Flying Birds,
 * Shimmering Ocean Wave Reflections, Crisp Glowing Moon, and Parallax Clouds.
 *
 * All original visual elements, atmosphere, and layout are preserved.
 * Fixes:
 * - Birds continuously fly across the background with independent paths, speeds, and altitudes.
 * - Realistic wing-flapping and aerodynamic gliding physics.
 * - Birds enter naturally from offscreen and respawn seamlessly.
 * - Distant birds are smaller, slower, and have perspective depth.
 * - Independent continuous motion that never freezes during scrolling or section changes.
 * - Softly blends over static wallpaper marks so only living dynamic birds are visible.
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
    // 2. SCROLL THEMES
    // -------------------------------------------------------------
    interface ThemeProfile {
      moonCoronaAlpha: number;
      shimmerBoost: number;
    }

    const themes: Array<{ threshold: number; theme: ThemeProfile }> = [
      { threshold: 0.0, theme: { moonCoronaAlpha: 0.24, shimmerBoost: 1.0 } },
      { threshold: 0.33, theme: { moonCoronaAlpha: 0.22, shimmerBoost: 0.95 } },
      { threshold: 0.68, theme: { moonCoronaAlpha: 0.26, shimmerBoost: 1.05 } },
      { threshold: 1.0, theme: { moonCoronaAlpha: 0.2, shimmerBoost: 0.9 } },
    ];

    // -------------------------------------------------------------
    // 3. TWINKLING STARS IN UPPER SKY
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
      const count = Math.floor(Math.min(width, 1920) * 0.22);
      shimmerGlints = [];
      for (let i = 0; i < count; i++) {
        const depthRatio = Math.pow(Math.random(), 1.35);
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
    // 5. LIVING, AUTONOMOUS CONTINUOUSLY FLYING BIRDS
    // Multiple independent birds at varying depths, speeds & paths
    // -------------------------------------------------------------
    interface AutonomousBird {
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      scale: number;
      opacity: number;
      flapPhase: number;
      flapRate: number;
      isGliding: boolean;
      glideTimer: number;
      glideDuration: number;
      flapDuration: number;
      altitudeWanderPhase: number;
      altitudeWanderRate: number;
      altitudeWanderAmp: number;
      bodyAngle: number;
    }

    const birdCount = 10;
    const birds: AutonomousBird[] = [];

    // Helper to spawn or reset an autonomous bird
    const createBird = (id: number, initialScatter = false): AutonomousBird => {
      const depth = Math.random(); // 0 = far distance, 1 = closer
      // Depth perspective: distant birds are smaller & slower
      const scale = 0.16 + depth * 0.22;
      const speedX = 1.4 + depth * 1.6 + (Math.random() - 0.5) * 0.35;
      const opacity = 0.55 + depth * 0.4;

      const x = initialScatter
        ? (id / birdCount) * (width + 240) - 120 + (Math.random() - 0.5) * 100
        : -40 - Math.random() * 180;

      const y = height * 0.08 + Math.random() * (height * 0.44);

      return {
        id,
        x,
        y,
        vx: speedX,
        vy: (Math.random() - 0.5) * 0.2,
        scale,
        opacity,
        flapPhase: Math.random() * Math.PI * 2,
        flapRate: 0.11 + (1 - depth) * 0.08 + Math.random() * 0.03,
        isGliding: Math.random() > 0.4,
        glideTimer: Math.floor(Math.random() * 60),
        glideDuration: 60 + Math.floor(Math.random() * 100),
        flapDuration: 45 + Math.floor(Math.random() * 65),
        altitudeWanderPhase: Math.random() * Math.PI * 2,
        altitudeWanderRate: 0.015 + Math.random() * 0.02,
        altitudeWanderAmp: 8 + depth * 18,
        bodyAngle: -0.15,
      };
    };

    // Initialize all birds scattered across mid-flight
    for (let i = 0; i < birdCount; i++) {
      birds.push(createBird(i, true));
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
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.06;
      const scrollPixelOffset = currentScroll * height * 0.55;

      // Current Theme
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

        // Softly conceal any static baked-in wallpaper marks so only living birds are visible
        ctx.save();
        const patchX = drawX + baseW * 0.22;
        const patchY = drawY + baseH * 0.31;
        const patchR = baseW * 0.085;
        const cloudPatch = ctx.createRadialGradient(patchX, patchY, patchR * 0.05, patchX, patchY, patchR);
        cloudPatch.addColorStop(0, 'rgba(12, 32, 70, 0.94)');
        cloudPatch.addColorStop(0.55, 'rgba(14, 36, 78, 0.75)');
        cloudPatch.addColorStop(1, 'transparent');
        ctx.fillStyle = cloudPatch;
        ctx.beginPath();
        ctx.arc(patchX, patchY, patchR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Key coordinates
        const oceanHorizonY = drawY + baseH * 0.68;
        const oceanH = height - oceanHorizonY;
        const moonX = drawX + baseW * 0.828;
        const moonY = drawY + baseH * 0.256;
        const moonRadius = baseW * 0.051;

        // ---------------------------------------------------------
        // B. MOON ATMOSPHERIC CORONA & HALO
        // ---------------------------------------------------------
        ctx.save();
        const distToMoon = Math.hypot(mouseX - moonX, mouseY - moonY);
        const moonBloom = Math.max(0, 1 - distToMoon / 600) * 0.08;
        const coronaRadius = moonRadius * (2.2 + Math.sin(time * 0.6) * 0.12);

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
        // D. CONTINUOUSLY FLYING BIRDS (Autonomous & Dynamic)
        // ---------------------------------------------------------
        birds.forEach((bird) => {
          if (!prefersReducedMotion) {
            // Glide & flap state cycle
            bird.glideTimer++;
            if (bird.isGliding) {
              if (bird.glideTimer > bird.glideDuration) {
                bird.isGliding = false;
                bird.glideTimer = 0;
              }
            } else {
              bird.flapPhase += bird.flapRate;
              if (bird.glideTimer > bird.flapDuration) {
                bird.isGliding = true;
                bird.glideTimer = 0;
              }
            }

            // Natural altitude undulation
            bird.altitudeWanderPhase += bird.altitudeWanderRate;
            const wanderVy = Math.cos(bird.altitudeWanderPhase) * (bird.altitudeWanderAmp * 0.035);

            // Move continuously across the sky!
            bird.x += bird.vx;
            bird.y += bird.vy + wanderVy;

            // Smooth aerodynamic banking angle
            const targetAngle = Math.atan2(bird.vy + wanderVy, bird.vx);
            bird.bodyAngle += (targetAngle - bird.bodyAngle) * 0.08;

            // Seamless continuous respawn: when flying off the right side, respawn on the left!
            if (bird.x > width + 60) {
              const freshBird = createBird(bird.id, false);
              Object.assign(bird, freshBird);
            }
          }

          // Render bird with depth perspective
          const bx = bird.x + smoothMouseNormX * (bird.scale * 15);
          const by = bird.y - scrollPixelOffset * (bird.scale * 0.05) + smoothMouseNormY * (bird.scale * 8);

          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(bird.bodyAngle);
          ctx.scale(bird.scale, bird.scale);

          const flapAngle = bird.isGliding
            ? 0.06 + Math.sin(time * 2 + bird.id) * 0.02
            : Math.sin(bird.flapPhase) * 0.74;

          // Crisp silver-white gull silhouette
          ctx.fillStyle = `rgba(240, 248, 255, ${bird.opacity})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${bird.opacity * 0.95})`;
          ctx.lineWidth = 1.25;

          // Slender body
          ctx.beginPath();
          ctx.ellipse(0, 0, 5.0, 1.5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Left articulated gull wing
          ctx.beginPath();
          ctx.moveTo(-1, 0);
          ctx.quadraticCurveTo(-10, flapAngle * 14 - 3, -20, flapAngle * 17);
          ctx.quadraticCurveTo(-11, flapAngle * 10 - 2, 0, 0);
          ctx.fill();
          ctx.stroke();

          // Right articulated gull wing
          ctx.beginPath();
          ctx.moveTo(1, 0);
          ctx.quadraticCurveTo(10, flapAngle * 14 - 3, 20, flapAngle * 17);
          ctx.quadraticCurveTo(11, flapAngle * 10 - 2, 0, 0);
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        });

        // ---------------------------------------------------------
        // E. LIVING WATER SHIMMER & MOONLIGHT REFLECTIONS
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

          const corridorSpread = 90 + d * 280;
          const gx = moonX + glint.corridorOffset * corridorSpread + smoothMouseNormX * 7;

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
      // F. CALIBRATED VIGNETTE (Readability & Professional Depth)
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

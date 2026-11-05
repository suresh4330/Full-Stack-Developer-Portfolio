import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Cinematic Moonlit Ocean Environment — Perfectly Balanced Visibility
 *
 * Implements the user's specific corrections:
 * 1. Clouds are clearly visible with realistic moonlit blue textures.
 * 2. Moon is restored with crisp contours and a subtle, realistic atmospheric glow.
 * 3. Flying birds are clearly visible, elegant, and proportional in ascending flight.
 * 4. Ocean waves and shimmering moonlight reflections are restored and vibrant.
 * 5. Balanced lighting: layered dark navy, midnight blue, and soft moonlit blue (neither pitch-black nor overly bright).
 * 6. Subtle atmospheric glow around the moon and clouds.
 * 7. Background remains visually secondary behind portfolio text, cards, and profile photo.
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

    // Foundational high-fidelity moonlit ocean asset
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
    // 2. SCROLL-DRIVEN NOCTURNAL COLOR PROFILE
    // -------------------------------------------------------------
    interface AtmosphereProfile {
      moonGlowAlpha: number;
      waterShimmerAlpha: number;
      oceanTintAlpha: number;
    }

    const themes: Array<{ threshold: number; profile: AtmosphereProfile }> = [
      {
        threshold: 0.0, // Hero: Pure Moonlit Cobalt Night
        profile: {
          moonGlowAlpha: 0.35,
          waterShimmerAlpha: 1.0,
          oceanTintAlpha: 0.15,
        },
      },
      {
        threshold: 0.33, // Frontend/Backend: Deep Indigo Ocean
        profile: {
          moonGlowAlpha: 0.32,
          waterShimmerAlpha: 0.95,
          oceanTintAlpha: 0.18,
        },
      },
      {
        threshold: 0.68, // Projects/Workflow: Midnight Sapphire
        profile: {
          moonGlowAlpha: 0.38,
          waterShimmerAlpha: 1.05,
          oceanTintAlpha: 0.16,
        },
      },
      {
        threshold: 1.0, // Contact/Footer: Celestial Deep Nocturne
        profile: {
          moonGlowAlpha: 0.3,
          waterShimmerAlpha: 0.9,
          oceanTintAlpha: 0.2,
        },
      },
    ];

    // -------------------------------------------------------------
    // 3. TWINKLING STARS IN DARK SKY PATCHES
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
      const count = Math.floor(Math.min(width, 1920) * 0.08);
      stars = [];
      for (let i = 0; i < count; i++) {
        const xRatio = Math.random() < 0.75 ? Math.random() * 0.55 : Math.random();
        const yRatio = Math.pow(Math.random(), 1.5) * 0.45;
        const size = Math.random() < 0.12 ? 1.6 + Math.random() * 0.6 : 0.6 + Math.random() * 0.7;
        const hasSpike = size > 1.8 && Math.random() < 0.35;
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
    // 4. ANIMATED MOONLIGHT WATER REFLECTIONS (Glittering Glade)
    // -------------------------------------------------------------
    interface WaterShimmer {
      depthRatio: number; // [0, 1] from horizon to ocean bottom
      corridorOffset: number; // Offset inside reflection corridor
      length: number;
      thickness: number;
      speed: number;
      phase: number;
      baseAlpha: number;
    }

    let waterGlints: WaterShimmer[] = [];
    const initWaterShimmer = () => {
      const count = Math.floor(Math.min(width, 1920) * 0.22); // ~200-350 glints
      waterGlints = [];
      for (let i = 0; i < count; i++) {
        const depthRatio = Math.pow(Math.random(), 1.35);
        const corridorOffset = (Math.random() - 0.5) * (Math.random() < 0.65 ? 0.6 : 1.0);
        const length = (8 + depthRatio * 28) * (0.6 + Math.random() * 0.8);
        const thickness = 0.8 + depthRatio * 1.5;
        const speed = 0.03 + Math.random() * 0.05;
        const phase = Math.random() * Math.PI * 2;
        const baseAlpha = 0.35 + Math.random() * 0.55;

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
    // 5. VISIBLE & ELEGANT FLYING BIRDS (Ascending Diagonal Flight)
    // -------------------------------------------------------------
    interface FlockBird {
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

    let flockBaseX = width * 0.18;
    let flockBaseY = height * 0.22;
    const birdCount = 9;
    const flockBirds: FlockBird[] = [];

    for (let i = 0; i < birdCount; i++) {
      const relX = (i - 4) * 25;
      const relY = (i - 4) * 14 + Math.sin(i * 0.45) * 5;
      flockBirds.push({
        order: i,
        relX,
        relY,
        scale: 0.22 - i * 0.008, // Clearly visible, elegant & proportional
        flapRate: 0.085 + Math.random() * 0.02,
        flapPhase: i * 0.55,
        isGliding: false,
        glideTimer: 0,
        glideDuration: 80 + Math.random() * 80,
        opacity: 0.82 - i * 0.02, // Clearly visible white silhouettes
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
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.06;
      const scrollPixelOffset = currentScroll * height * 0.5;

      // Theme interpolation
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

        const drawX = (width - baseW) / 2 + smoothMouseNormX * 12;
        const drawY = (height - baseH) / 2 + smoothMouseNormY * 8 - scrollPixelOffset * 0.04;

        // 1. Draw the authentic high-resolution artwork
        ctx.drawImage(bgImage, drawX, drawY, baseW, baseH);

        // 2. Balanced nocturnal color grading:
        // Soft atmospheric tint that keeps clouds, moon, and ocean clearly visible
        ctx.save();
        const atmosphericGrad = ctx.createLinearGradient(0, drawY, 0, drawY + baseH);
        atmosphericGrad.addColorStop(0, 'rgba(2, 6, 18, 0.16)'); // Subtle upper sky tone
        atmosphericGrad.addColorStop(0.35, 'rgba(2, 6, 20, 0.04)'); // Clouds & Moon completely unblocked!
        atmosphericGrad.addColorStop(0.68, 'rgba(3, 9, 24, 0.12)'); // Horizon transition
        atmosphericGrad.addColorStop(1, `rgba(1, 4, 14, ${curProfile.oceanTintAlpha})`); // Ocean deep anchor
        ctx.fillStyle = atmosphericGrad;
        ctx.fillRect(drawX, drawY, baseW, baseH);
        ctx.restore();

        // Physical coordinates from artwork
        const oceanHorizonY = drawY + baseH * 0.68;
        const oceanH = height - oceanHorizonY;
        const moonX = drawX + baseW * 0.828;
        const moonY = drawY + baseH * 0.256;
        const moonRadius = baseW * 0.048;

        // ---------------------------------------------------------
        // B. RESTORED MOON WITH CRISP DISC & REALISTIC GLOW
        // ---------------------------------------------------------
        ctx.save();
        // Distance from cursor to moon creates subtle living breathing response
        const distToMoon = Math.hypot(mouseX - moonX, mouseY - moonY);
        const moonInteractive = Math.max(0, 1 - distToMoon / 600) * 0.08;

        // 1. Outer Soft Atmospheric Moonlit Halo (subtle & cinematic)
        const outerGlowRadius = moonRadius * (3.2 + Math.sin(time * 0.6) * 0.18);
        const outerGlow = ctx.createRadialGradient(
          moonX,
          moonY,
          moonRadius * 0.8,
          moonX,
          moonY,
          outerGlowRadius
        );
        outerGlow.addColorStop(0, `rgba(219, 239, 254, ${curProfile.moonGlowAlpha * 0.45 + moonInteractive})`);
        outerGlow.addColorStop(0.4, `rgba(186, 224, 255, ${curProfile.moonGlowAlpha * 0.2})`);
        outerGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, outerGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Crisp Inner Corona
        const coronaRadius = moonRadius * 1.5;
        const coronaGrad = ctx.createRadialGradient(
          moonX,
          moonY,
          moonRadius * 0.6,
          moonX,
          moonY,
          coronaRadius
        );
        coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        coronaGrad.addColorStop(0.5, 'rgba(219, 239, 254, 0.2)');
        coronaGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = coronaGrad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, coronaRadius, 0, Math.PI * 2);
        ctx.fill();

        // 3. Crisp Silver Limb Contour
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 0.96, -Math.PI * 0.4, Math.PI * 0.8);
        ctx.stroke();

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
            const spk = star.size * 2.2;
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
        // D. VISIBLE & ELEGANT FLYING BIRDS (Ascending Formation)
        // ---------------------------------------------------------
        if (!prefersReducedMotion) {
          flockBaseX += 0.45 + smoothMouseNormX * 0.1;
          flockBaseY += Math.sin(time * 0.7) * 0.1;

          if (flockBaseX > width + 120) {
            flockBaseX = -120;
            flockBaseY = height * 0.18 + Math.random() * (height * 0.12);
          }
        }

        flockBirds.forEach((b) => {
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

          const bx = flockBaseX + b.relX + smoothMouseNormX * 6;
          const by = flockBaseY + b.relY - scrollPixelOffset * 0.08 + smoothMouseNormY * 5;

          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(-0.24); // Ascending diagonal orientation
          ctx.scale(b.scale, b.scale);

          const flapAngle = b.isGliding ? 0.08 : Math.sin(b.flapPhase) * 0.72;

          // Crisp silver-white bird silhouette catching moonlight
          ctx.fillStyle = `rgba(245, 250, 255, ${b.opacity})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.95})`;
          ctx.lineWidth = 1.1;

          // Slender body
          ctx.beginPath();
          ctx.ellipse(0, 0, 4.8, 1.5, 0, 0, Math.PI * 2);
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
        // E. RESTORED OCEAN WAVES & SHIMMERING MOONLIGHT REFLECTIONS
        // ---------------------------------------------------------
        ctx.save();
        // 1. Horizon Moonlight Sheen line directly under the moon
        const sheenW = 260;
        const horizonSheen = ctx.createLinearGradient(
          moonX - sheenW * 0.5,
          oceanHorizonY,
          moonX + sheenW * 0.5,
          oceanHorizonY
        );
        horizonSheen.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        horizonSheen.addColorStop(0.35, 'rgba(224, 242, 254, 0.5)');
        horizonSheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.88)');
        horizonSheen.addColorStop(0.65, 'rgba(224, 242, 254, 0.5)');
        horizonSheen.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        ctx.strokeStyle = horizonSheen;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(moonX - sheenW * 0.5, oceanHorizonY);
        ctx.lineTo(moonX + sheenW * 0.5, oceanHorizonY);
        ctx.stroke();

        // 2. Sparkling specular glints along the water reflection corridor
        waterGlints.forEach((glint) => {
          const d = glint.depthRatio;
          const gy = oceanHorizonY + Math.pow(d, 1.55) * oceanH;

          // Corridor expands toward foreground
          const corridorSpread = 85 + d * 260;
          const gx = moonX + glint.corridorOffset * corridorSpread + smoothMouseNormX * 6;

          const sparkle = Math.sin(time * 60 * glint.speed + glint.phase);
          const glintAlpha =
            Math.max(0.06, Math.min(1.0, 0.45 + sparkle * 0.55)) *
            glint.baseAlpha *
            curProfile.waterShimmerAlpha;

          if (glintAlpha <= 0.08) return;

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
            ctx.fillStyle = `rgba(186, 230, 253, ${glintAlpha * 0.22})`;
            ctx.beginPath();
            ctx.ellipse(gx, gy, glint.length * 0.4, glint.thickness * 1.8, 0, 0, Math.PI * 2);
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
      // F. SUBTLE PERIPHERAL VIGNETTE (Readability & Professional Depth)
      // Delicate edge falloff ensuring text stays crisp while background is clearly visible
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.45,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.9
      );
      vignette.addColorStop(0, 'rgba(2, 6, 18, 0.06)');
      vignette.addColorStop(1, 'rgba(1, 4, 14, 0.58)');

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

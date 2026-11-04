import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Interactive NatureBackground
 * A living, breathing natural environment with real-time mouse, cursor wake,
 * and scroll-driven physics.
 *
 * Real-time Interactions:
 * 1. Interactive Birds:
 *    - Real-time steering away from or banking around cursor proximity.
 *    - Dynamic aerodynamic banking angle (Math.atan2(vy, vx)).
 *    - Panic flapping when startled by rapid cursor movement.
 *    - Autonomous boids-style wander and gliding transitions.
 * 2. Wind & Cursor Wake:
 *    - Cursor movement creates virtual wind currents that affect clouds, leaves, and butterflies.
 * 3. Reactive Leaves:
 *    - Displaced by mouse wake turbulence; leaves scatter and tumble when cursor brushes past.
 * 4. Reactive Butterflies:
 *    - Playfully attracted to cursor from medium distance, fluttering away if approached too quickly.
 * 5. Dynamic Sun & God Rays:
 *    - Atmospheric light rays dynamically pivot based on cursor position.
 *    - Ambient bloom reacts to cursor proximity to the horizon.
 * 6. Multi-Layer Parallax:
 *    - Far mountains, high cirrus, mid cumulus, and foreground leaves move at distinct depth scales.
 * 7. Day-to-Sunset-to-Twilight Palette:
 *    - Fluid environmental color transition linked smoothly to page scroll.
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
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // -------------------------------------------------------------
    // 1. MOUSE, VELOCITY & VIRTUAL WIND TRACKING
    // -------------------------------------------------------------
    let mouseX = width * 0.5;
    let mouseY = height * 0.3;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVx = 0;
    let mouseVy = 0;
    let mouseSpeed = 0;

    let smoothMouseNormX = 0; // [-1, 1]
    let smoothMouseNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      mouseVx = currentX - prevMouseX;
      mouseVy = currentY - prevMouseY;
      mouseSpeed = Math.min(Math.hypot(mouseVx, mouseVy), 35);

      prevMouseX = mouseX = currentX;
      prevMouseY = mouseY = currentY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch support for mobile interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseVx = touch.clientX - prevMouseX;
        mouseVy = touch.clientY - prevMouseY;
        mouseSpeed = Math.min(Math.hypot(mouseVx, mouseVy), 35);

        prevMouseX = mouseX = touch.clientX;
        prevMouseY = mouseY = touch.clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // -------------------------------------------------------------
    // 2. SKY THEMES (Dawn -> Day -> Sunset -> Twilight)
    // -------------------------------------------------------------
    interface SkyTheme {
      top: string;
      mid: string;
      bottom: string;
      mountainFar: string;
      mountainNear: string;
      sunColor: string;
      sunRayColor: string;
      cloudColor: string;
    }

    const skyThemes: Array<{ threshold: number; theme: SkyTheme }> = [
      {
        threshold: 0.0, // Hero: Golden Dawn
        theme: {
          top: '#06131c',
          mid: '#0c222c',
          bottom: '#183638',
          mountainFar: 'rgba(8, 28, 34, 0.45)',
          mountainNear: 'rgba(5, 18, 22, 0.7)',
          sunColor: 'rgba(251, 191, 36, 0.18)',
          sunRayColor: 'rgba(245, 158, 11, 0.045)',
          cloudColor: 'rgba(254, 243, 199, 0.055)',
        },
      },
      {
        threshold: 0.32, // Frontend & Backend: Clear Azure Sky
        theme: {
          top: '#051124',
          mid: '#0b1d3a',
          bottom: '#102d4d',
          mountainFar: 'rgba(8, 25, 48, 0.45)',
          mountainNear: 'rgba(5, 16, 32, 0.7)',
          sunColor: 'rgba(56, 189, 248, 0.16)',
          sunRayColor: 'rgba(56, 189, 248, 0.04)',
          cloudColor: 'rgba(224, 242, 254, 0.06)',
        },
      },
      {
        threshold: 0.68, // Projects & Workflow: Rose Sunset
        theme: {
          top: '#120824',
          mid: '#230e36',
          bottom: '#3b143c',
          mountainFar: 'rgba(28, 10, 38, 0.45)',
          mountainNear: 'rgba(18, 6, 26, 0.7)',
          sunColor: 'rgba(244, 63, 94, 0.18)',
          sunRayColor: 'rgba(251, 113, 133, 0.045)',
          cloudColor: 'rgba(253, 226, 236, 0.055)',
        },
      },
      {
        threshold: 1.0, // Experience & Contact: Deep Starry Twilight
        theme: {
          top: '#030614',
          mid: '#070f26',
          bottom: '#0e1836',
          mountainFar: 'rgba(7, 12, 32, 0.45)',
          mountainNear: 'rgba(4, 7, 20, 0.75)',
          sunColor: 'rgba(129, 140, 248, 0.14)',
          sunRayColor: 'rgba(165, 180, 252, 0.035)',
          cloudColor: 'rgba(199, 210, 254, 0.045)',
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
    // 3. INTERACTIVE BIRDS WITH REAL-TIME STEERING & FLAP PHYSICS
    // -------------------------------------------------------------
    interface InteractiveBird {
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
      panicTimer: number;
      bodyAngle: number;
      opacity: number;
    }

    const birdCount = 7;
    const birds: InteractiveBird[] = [];
    for (let i = 0; i < birdCount; i++) {
      const speedX = 1.3 + Math.random() * 1.3;
      birds.push({
        x: Math.random() * width,
        y: 60 + Math.random() * (height * 0.5),
        vx: speedX,
        vy: (Math.random() - 0.5) * 0.4,
        baseSpeedX: speedX,
        scale: 0.65 + Math.random() * 0.65,
        flapRate: 0.09 + Math.random() * 0.04,
        flapPhase: Math.random() * Math.PI * 2,
        isGliding: false,
        glideDuration: 90 + Math.random() * 100,
        glideTimer: 0,
        panicTimer: 0,
        bodyAngle: 0,
        opacity: 0.7 + Math.random() * 0.25,
      });
    }

    // Distant V-Formation Flock
    interface FlockLeader {
      x: number;
      y: number;
      speedX: number;
      count: number;
      spacing: number;
    }

    const flock: FlockLeader = {
      x: -120,
      y: 85,
      speedX: 0.75,
      count: 7,
      spacing: 16,
    };

    // -------------------------------------------------------------
    // 4. INTERACTIVE FALLING LEAVES WITH WAKE TURBULENCE
    // -------------------------------------------------------------
    interface InteractiveLeaf {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSpeedY: number;
      baseSpeedX: number;
      size: number;
      angle: number;
      rotSpeed: number;
      swayOffset: number;
      swayRate: number;
      color: string;
    }

    const leafPalette = [
      'rgba(52, 211, 153, 0.65)', // Emerald leaf
      'rgba(16, 185, 129, 0.6)',
      'rgba(245, 158, 11, 0.65)', // Amber autumn leaf
      'rgba(251, 146, 60, 0.6)',
      'rgba(244, 114, 182, 0.55)', // Blossom petal
    ];

    const leafCount = 20;
    const leaves: InteractiveLeaf[] = [];
    for (let i = 0; i < leafCount; i++) {
      const sY = 0.7 + Math.random() * 0.8;
      const sX = 0.3 + Math.random() * 0.6;
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: sX,
        vy: sY,
        baseSpeedX: sX,
        baseSpeedY: sY,
        size: 5 + Math.random() * 5.5,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        swayOffset: Math.random() * Math.PI * 2,
        swayRate: 0.018 + Math.random() * 0.018,
        color: leafPalette[Math.floor(Math.random() * leafPalette.length)],
      });
    }

    // -------------------------------------------------------------
    // 5. INTERACTIVE BUTTERFLIES
    // -------------------------------------------------------------
    interface InteractiveButterfly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseY: number;
      color: string;
      wingAngle: number;
      wingSpeed: number;
      attractTimer: number;
    }

    const butterflies: InteractiveButterfly[] = [
      {
        x: width * 0.25,
        y: height * 0.42,
        vx: 0.7,
        vy: 0,
        baseY: height * 0.42,
        color: '#38bdf8', // Azure
        wingAngle: 0,
        wingSpeed: 0.22,
        attractTimer: 0,
      },
      {
        x: width * 0.68,
        y: height * 0.58,
        vx: 0.8,
        vy: 0,
        baseY: height * 0.58,
        color: '#fb923c', // Monarch
        wingAngle: 0,
        wingSpeed: 0.26,
        attractTimer: 0,
      },
      {
        x: width * 0.45,
        y: height * 0.78,
        vx: 0.65,
        vy: 0,
        baseY: height * 0.78,
        color: '#34d399', // Emerald
        wingAngle: 0,
        wingSpeed: 0.2,
        attractTimer: 0,
      },
    ];

    // -------------------------------------------------------------
    // 6. MULTI-LAYER INTERACTIVE CLOUDS
    // -------------------------------------------------------------
    interface InteractiveCloud {
      x: number;
      y: number;
      width: number;
      height: number;
      baseSpeedX: number;
      layer: number;
      opacity: number;
    }

    const clouds: InteractiveCloud[] = [
      { x: width * 0.04, y: 70, width: 340, height: 110, baseSpeedX: 0.12, layer: 1, opacity: 0.25 },
      { x: width * 0.52, y: 130, width: 440, height: 135, baseSpeedX: 0.2, layer: 2, opacity: 0.35 },
      { x: width * 0.86, y: 55, width: 310, height: 95, baseSpeedX: 0.15, layer: 1, opacity: 0.2 },
      { x: width * 0.22, y: 210, width: 500, height: 155, baseSpeedX: 0.28, layer: 3, opacity: 0.4 },
      { x: -160, y: 175, width: 390, height: 125, baseSpeedX: 0.22, layer: 2, opacity: 0.3 },
    ];

    // Helper: Draw Cloud
    const drawCloud = (c: InteractiveCloud, scrollOffset: number, cloudTint: string, mouseParallaxX: number) => {
      const renderX = c.x + mouseParallaxX * c.layer * 0.6;
      const renderY = c.y - scrollOffset * (c.layer * 0.14) + smoothMouseNormY * c.layer * 6;
      ctx.save();
      ctx.fillStyle = cloudTint;
      ctx.beginPath();

      const rx = renderX;
      const ry = renderY;
      const w = c.width;
      const h = c.height;

      ctx.arc(rx + w * 0.3, ry + h * 0.5, h * 0.42, 0, Math.PI * 2);
      ctx.arc(rx + w * 0.5, ry + h * 0.35, h * 0.55, 0, Math.PI * 2);
      ctx.arc(rx + w * 0.7, ry + h * 0.48, h * 0.45, 0, Math.PI * 2);
      ctx.arc(rx + w * 0.4, ry + h * 0.65, h * 0.38, 0, Math.PI * 2);
      ctx.arc(rx + w * 0.6, ry + h * 0.65, h * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Bird with Dynamic Aerodynamic Banking
    const drawBird = (b: InteractiveBird, scrollOffset: number, mouseParallaxX: number) => {
      const renderX = b.x + mouseParallaxX * 0.7;
      const renderY = b.y - scrollOffset * 0.16 + smoothMouseNormY * 8;

      ctx.save();
      ctx.translate(renderX, renderY);
      ctx.rotate(b.bodyAngle);
      ctx.scale(b.scale, b.scale);

      ctx.fillStyle = `rgba(226, 232, 240, ${b.opacity})`;
      ctx.strokeStyle = `rgba(226, 232, 240, ${b.opacity * 0.85})`;
      ctx.lineWidth = 1.4;

      const flapAngle = b.isGliding ? 0.08 : Math.sin(b.flapPhase) * 0.78;

      // Center bird body
      ctx.beginPath();
      ctx.ellipse(0, 0, 4.2, 1.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left Wing with aerodynamic curve
      ctx.beginPath();
      ctx.moveTo(-1, 0);
      ctx.quadraticCurveTo(-11, flapAngle * 15 - 4, -22, flapAngle * 19);
      ctx.quadraticCurveTo(-12, flapAngle * 11 - 2, 0, 0);
      ctx.fill();
      ctx.stroke();

      // Right Wing
      ctx.beginPath();
      ctx.moveTo(1, 0);
      ctx.quadraticCurveTo(11, flapAngle * 15 - 4, 22, flapAngle * 19);
      ctx.quadraticCurveTo(12, flapAngle * 11 - 2, 0, 0);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // Helper: Draw Butterfly
    const drawButterfly = (bf: InteractiveButterfly, scrollOffset: number, mouseParallaxX: number) => {
      const renderX = bf.x + mouseParallaxX * 1.2;
      const renderY = bf.y - scrollOffset * 0.22 + smoothMouseNormY * 12;

      ctx.save();
      ctx.translate(renderX, renderY);

      const wingScaleX = Math.abs(Math.sin(bf.wingAngle));

      ctx.fillStyle = bf.color;
      ctx.shadowColor = bf.color;
      ctx.shadowBlur = 8;

      // Left Wing
      ctx.save();
      ctx.scale(wingScaleX, 1);
      ctx.beginPath();
      ctx.ellipse(-5.5, -3.2, 6.5, 4.2, -Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(-4.2, 3.2, 4.5, 3.2, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right Wing
      ctx.save();
      ctx.scale(wingScaleX, 1);
      ctx.beginPath();
      ctx.ellipse(5.5, -3.2, 6.5, 4.2, Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(4.2, 3.2, 4.5, 3.2, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Body & Antennae
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.3, 4.2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Helper: Draw Layered Mountain Ridge Silhouettes (Atmospheric Horizon)
    const drawMountains = (theme: SkyTheme, scrollOffset: number, mouseParallaxX: number) => {
      // Far Mountain Ridge
      ctx.save();
      ctx.fillStyle = theme.mountainFar;
      ctx.beginPath();
      const baseYFar = height * 0.78 - scrollOffset * 0.06;
      ctx.moveTo(-50, height);
      ctx.lineTo(-50, baseYFar);

      const farPoints = [
        { x: width * 0.1, y: baseYFar - 45 },
        { x: width * 0.25, y: baseYFar - 15 },
        { x: width * 0.45, y: baseYFar - 65 },
        { x: width * 0.65, y: baseYFar - 25 },
        { x: width * 0.82, y: baseYFar - 75 },
        { x: width * 1.05, y: baseYFar - 35 },
      ];

      for (let i = 0; i < farPoints.length - 1; i++) {
        const xc = (farPoints[i].x + farPoints[i + 1].x) / 2 + mouseParallaxX * 0.25;
        const yc = (farPoints[i].y + farPoints[i + 1].y) / 2;
        ctx.quadraticCurveTo(farPoints[i].x + mouseParallaxX * 0.25, farPoints[i].y, xc, yc);
      }
      ctx.lineTo(width + 50, height);
      ctx.closePath();
      ctx.fill();

      // Near Mountain Ridge
      ctx.fillStyle = theme.mountainNear;
      ctx.beginPath();
      const baseYNear = height * 0.86 - scrollOffset * 0.1;
      ctx.moveTo(-50, height);
      ctx.lineTo(-50, baseYNear);

      const nearPoints = [
        { x: width * 0.18, y: baseYNear - 55 },
        { x: width * 0.38, y: baseYNear - 20 },
        { x: width * 0.58, y: baseYNear - 70 },
        { x: width * 0.78, y: baseYNear - 30 },
        { x: width * 1.05, y: baseYNear - 60 },
      ];

      for (let i = 0; i < nearPoints.length - 1; i++) {
        const xc = (nearPoints[i].x + nearPoints[i + 1].x) / 2 + mouseParallaxX * 0.5;
        const yc = (nearPoints[i].y + nearPoints[i + 1].y) / 2;
        ctx.quadraticCurveTo(nearPoints[i].x + mouseParallaxX * 0.5, nearPoints[i].y, xc, yc);
      }
      ctx.lineTo(width + 50, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // -------------------------------------------------------------
    // 7. MAIN INTERACTIVE SIMULATION & RENDER LOOP
    // -------------------------------------------------------------
    let currentScroll = 0;
    let targetScroll = 0;

    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      targetScroll = latest;
    });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Decay mouse speed over time
      mouseSpeed *= 0.94;
      mouseVx *= 0.88;
      mouseVy *= 0.88;

      // Smooth normalized mouse offset [-1, 1]
      const targetNormX = (mouseX / width - 0.5) * 2;
      const targetNormY = (mouseY / height - 0.5) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.08;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.08;

      const mouseParallaxX = smoothMouseNormX * 18;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.065;
      const scrollPixelOffset = currentScroll * height * 1.5;

      // -------------------------------------------------------------
      // Calculate Sky Theme Color based on Scroll Progress
      // -------------------------------------------------------------
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

      // Render Dynamic Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, curSkyTop);
      skyGrad.addColorStop(0.55, curSkyMid);
      skyGrad.addColorStop(1, curSkyBottom);

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // Sun & Interactive God Rays
      // -------------------------------------------------------------
      const sunX = width * 0.82 + smoothMouseNormX * 12;
      const sunY = height * 0.22 - currentScroll * 60 + smoothMouseNormY * 8;

      // Distance from mouse to sun determines bloom expansion
      const distToSun = Math.hypot(mouseX - sunX, mouseY - sunY);
      const sunBloomFactor = Math.max(0, 1 - distToSun / 550) * 0.08;
      const sunRadius = 90 + Math.sin(time * 0.8) * 8 + sunBloomFactor * 80;

      const sunGlow = ctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, sunRadius * 2.8);
      sunGlow.addColorStop(0, st1.theme.sunColor);
      sunGlow.addColorStop(0.5, `rgba(251, 191, 36, ${0.04 + sunBloomFactor})`);
      sunGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric God Rays pivoting dynamically based on cursor
      ctx.save();
      ctx.translate(sunX, sunY);
      // Ray angle responds smoothly to mouse X position
      const interactiveRayAngle = 0.35 + smoothMouseNormX * 0.18 + Math.sin(time * 0.3) * 0.04;
      ctx.rotate(interactiveRayAngle);

      for (let r = 0; r < 4; r++) {
        const rayGrad = ctx.createLinearGradient(0, 0, width * 0.9, 0);
        rayGrad.addColorStop(0, st1.theme.sunRayColor);
        rayGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.012)');
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        const yOffset = (r - 1.5) * 65;
        ctx.moveTo(0, yOffset);
        ctx.lineTo(width * 0.85, yOffset - 75);
        ctx.lineTo(width * 0.85, yOffset + 75);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Draw Distant Horizon Mountains
      drawMountains(st1.theme, scrollPixelOffset, mouseParallaxX);

      // -------------------------------------------------------------
      // Interactive Multi-Layer Clouds (Wind responds to mouse displacement)
      // -------------------------------------------------------------
      const cursorWindX = smoothMouseNormX * 0.25;
      clouds.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.x += cloud.baseSpeedX + cursorWindX * (cloud.layer * 0.4);
          if (cloud.x > width + 120) {
            cloud.x = -cloud.width - 60;
          } else if (cloud.x < -cloud.width - 80) {
            cloud.x = width + 60;
          }
        }
        drawCloud(cloud, scrollPixelOffset, st1.theme.cloudColor, mouseParallaxX);
      });

      // -------------------------------------------------------------
      // Distant V-Formation Bird Flock
      // -------------------------------------------------------------
      if (!prefersReducedMotion) {
        flock.x += flock.speedX + cursorWindX * 0.2;
        if (flock.x > width + 220) {
          flock.x = -220;
          flock.y = 70 + Math.random() * 80;
        }
      }

      ctx.save();
      const flockY = flock.y - scrollPixelOffset * 0.08 + smoothMouseNormY * 4;
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
      ctx.lineWidth = 1.1;

      for (let i = 0; i < flock.count; i++) {
        const isLeftWing = i % 2 === 1;
        const rank = Math.ceil(i / 2);
        const bx = flock.x - rank * flock.spacing + mouseParallaxX * 0.3;
        const by = flockY + (isLeftWing ? -1 : 1) * rank * (flock.spacing * 0.65);

        const distantFlap = Math.sin(time * 4 + i) * 2.5;
        ctx.beginPath();
        ctx.moveTo(bx - 4, by + distantFlap);
        ctx.quadraticCurveTo(bx - 2, by - 2, bx, by);
        ctx.quadraticCurveTo(bx + 2, by - 2, bx + 4, by + distantFlap);
        ctx.stroke();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // Interactive Birds (Real-time Avoidance & Aerodynamic Steering)
      // -------------------------------------------------------------
      birds.forEach((bird) => {
        if (!prefersReducedMotion) {
          // Distance from cursor to bird
          const dx = bird.x - mouseX;
          const dy = bird.y - mouseY;
          const dist = Math.hypot(dx, dy);

          // Proximity reaction threshold: 190px
          if (dist < 190 && dist > 1) {
            const pushFactor = (1 - dist / 190) * 0.85;
            bird.vx += (dx / dist) * pushFactor;
            bird.vy += (dy / dist) * pushFactor;
            bird.panicTimer = 40; // Trigger panic flap
          }

          // Panic flap state
          if (bird.panicTimer > 0) {
            bird.panicTimer--;
            bird.isGliding = false;
            bird.flapPhase += bird.flapRate * 1.5;
          } else {
            // Normal glide vs flap state machine
            bird.glideTimer++;
            if (bird.glideTimer > bird.glideDuration) {
              bird.isGliding = !bird.isGliding;
              bird.glideTimer = 0;
              bird.glideDuration = bird.isGliding ? 70 + Math.random() * 90 : 90 + Math.random() * 120;
            }

            if (!bird.isGliding) {
              bird.flapPhase += bird.flapRate;
            }
          }

          // Gentle drag towards base velocity
          bird.vx += (bird.baseSpeedX - bird.vx) * 0.04;
          bird.vy += (0 - bird.vy) * 0.04;

          // Natural altitude drift
          bird.y += bird.vy + Math.sin(time * 1.5 + bird.x * 0.01) * 0.25;
          bird.x += bird.vx;

          // Compute aerodynamic banking body angle
          const targetAngle = Math.atan2(bird.vy, bird.vx);
          bird.bodyAngle += (targetAngle - bird.bodyAngle) * 0.12;

          // Wrap bird across screen
          if (bird.x > width + 70) {
            bird.x = -70 - Math.random() * 120;
            bird.y = 50 + Math.random() * (height * 0.52);
            bird.vx = bird.baseSpeedX = 1.3 + Math.random() * 1.3;
            bird.vy = (Math.random() - 0.5) * 0.4;
          }
        }

        drawBird(bird, scrollPixelOffset, mouseParallaxX);
      });

      // -------------------------------------------------------------
      // Interactive Butterflies (Attracted to & Playful near cursor)
      // -------------------------------------------------------------
      butterflies.forEach((bf, idx) => {
        if (!prefersReducedMotion) {
          bf.wingAngle += bf.wingSpeed + mouseSpeed * 0.02;

          // Distance to cursor
          const dx = mouseX - bf.x;
          const dy = mouseY - bf.y;
          const dist = Math.hypot(dx, dy);

          // If cursor is within 280px, butterfly playfully wanders towards it
          if (dist < 280 && dist > 55) {
            bf.x += (dx / dist) * 0.7;
            bf.y += (dy / dist) * 0.5;
          } else if (dist <= 55) {
            // Scatter away if cursor gets too close
            bf.x -= (dx / dist) * 1.4;
            bf.y -= (dy / dist) * 1.4;
          } else {
            bf.x += bf.vx;
            bf.y = bf.baseY + Math.sin(time * 2.2 + idx * 2) * 24;
          }

          if (bf.x > width + 50) {
            bf.x = -50;
            bf.baseY = height * 0.35 + Math.random() * (height * 0.45);
          }
        }

        drawButterfly(bf, scrollPixelOffset, mouseParallaxX);
      });

      // -------------------------------------------------------------
      // Interactive Falling Leaves (Reacts to Cursor Wake Turbulence)
      // -------------------------------------------------------------
      leaves.forEach((leaf) => {
        if (!prefersReducedMotion) {
          // Distance from cursor to leaf
          const dx = leaf.x - mouseX;
          const dy = leaf.y - mouseY;
          const dist = Math.hypot(dx, dy);

          // If cursor sweeps past leaf within 130px, impart turbulence kick
          if (dist < 130 && dist > 1) {
            const wakeForce = (1 - dist / 130) * (mouseSpeed * 0.18 + 1.2);
            leaf.vx += (dx / dist) * wakeForce + mouseVx * 0.08;
            leaf.vy += (dy / dist) * wakeForce * 0.5;
            leaf.rotSpeed += (Math.random() - 0.5) * 0.08;
          }

          // Damping back to peaceful falling
          leaf.vx += (leaf.baseSpeedX - leaf.vx) * 0.035;
          leaf.vy += (leaf.baseSpeedY - leaf.vy) * 0.035;
          leaf.rotSpeed *= 0.98;

          leaf.y += leaf.vy;
          leaf.x += Math.sin(time * 2 + leaf.swayOffset) * 1.1 + leaf.vx;
          leaf.angle += leaf.rotSpeed;

          // Wrap off-screen leaves
          if (leaf.y > height + 25) {
            leaf.y = -25;
            leaf.x = Math.random() * width;
          }
          if (leaf.x > width + 25) {
            leaf.x = -25;
          }
        }

        ctx.save();
        ctx.translate(leaf.x + mouseParallaxX * 1.1, leaf.y - (scrollPixelOffset % height));
        ctx.rotate(leaf.angle);

        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size, leaf.size * 0.45, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // -------------------------------------------------------------
      // Vignette Overlay for Crisp Readability
      // -------------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(3, 7, 18, 0.22)');
      vignette.addColorStop(1, 'rgba(2, 6, 14, 0.78)');

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

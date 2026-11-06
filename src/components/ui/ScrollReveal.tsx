import React, { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { useAnimationConfig } from '../../context/AnimationContext';

export interface ScrollRevealProps {
  children: ReactNode;
  variant?:
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'scale-up'
    | 'parallax-up'
    | 'parallax-down'
    | 'blur-in';
  startY?: number;
  startX?: number;
  startScale?: number;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  viewportAmount?: number;
  viewportMargin?: string;
  className?: string;
  parallaxSpeed?: number;
  parallaxDirection?: 'vertical' | 'horizontal';
  onEnter?: () => void;
  onLeave?: () => void;
  animateOnLeave?: boolean;
}

interface VariantConfig {
  initial: Record<string, number | string>;
  visible: Record<string, number | string>;
  exit?: Record<string, number | string>;
  duration: number;
  ease: readonly [number, number, number, number];
}

const getVariantConfig = (
  variant: ScrollRevealProps['variant'] = 'slide-up',
  startY: number = 24,
  startX: number = 24,
  startScale: number = 0.95
): VariantConfig => {
  // Smooth, premium cubic-bezier easing curve
  const ease: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

  switch (variant) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
        duration: 0.55,
        ease,
      };
    case 'slide-up':
      return {
        initial: { opacity: 0, y: startY },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: startY * 0.4 },
        duration: 0.6,
        ease,
      };
    case 'slide-down':
      return {
        initial: { opacity: 0, y: -startY },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -startY * 0.4 },
        duration: 0.6,
        ease,
      };
    case 'slide-left':
      return {
        initial: { opacity: 0, x: startX },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: startX * 0.4 },
        duration: 0.6,
        ease,
      };
    case 'slide-right':
      return {
        initial: { opacity: 0, x: -startX },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -startX * 0.4 },
        duration: 0.6,
        ease,
      };
    case 'scale-up':
      return {
        initial: { opacity: 0, scale: startScale, y: startY * 0.5 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: startScale, y: startY * 0.3 },
        duration: 0.65,
        ease,
      };
    case 'blur-in':
      return {
        initial: { opacity: 0, filter: 'blur(8px)', y: startY * 0.5 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
        exit: { opacity: 0, filter: 'blur(4px)', y: startY * 0.3 },
        duration: 0.65,
        ease,
      };
    case 'parallax-up':
    case 'parallax-down':
      return {
        initial: { opacity: 0, y: startY },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: startY * 0.3 },
        duration: 0.7,
        ease,
      };
    default:
      return {
        initial: { opacity: 0, y: startY },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: startY * 0.4 },
        duration: 0.6,
        ease,
      };
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'slide-up',
  startY = 24,
  startX = 24,
  startScale = 0.95,
  duration = 0.6,
  delay = 0,
  staggerChildren,
  once = false, // Bidirectional scroll support by default or user choice
  viewportAmount = 0.1,
  viewportMargin = '0px 0px -40px 0px',
  className = '',
  parallaxSpeed = 0.12,
  parallaxDirection = 'vertical',
  onEnter,
  onLeave,
  animateOnLeave = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { config } = useAnimationConfig();
  const ref = useRef<HTMLDivElement>(null);

  const isMotionDisabled =
    prefersReducedMotion ||
    !config.scroll.enabled ||
    config.performance.mode === 'static';

  const isSubtle = config.performance.mode === 'subtle';

  // Parallax hook
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeed * 40 * config.motion.parallaxIntensity, -parallaxSpeed * 40 * config.motion.parallaxIntensity]
  );
  const parallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeed * 25 * config.motion.parallaxIntensity, -parallaxSpeed * 25 * config.motion.parallaxIntensity]
  );

  const baseConfig = getVariantConfig(variant, startY, startX, startScale);
  const effectiveDuration = isSubtle ? duration * 0.8 : duration;

  const transitionConfig: Transition = {
    duration: effectiveDuration,
    delay,
    ease: baseConfig.ease,
  };

  const isParallax = variant === 'parallax-up' || variant === 'parallax-down';

  // If motion is completely disabled (accessibility or static performance mode)
  if (isMotionDisabled) {
    return <div className={className}>{children}</div>;
  }

  // Stagger container setup
  if (staggerChildren) {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: delay,
          duration: effectiveDuration,
          ease: baseConfig.ease,
        },
      },
      ...(animateOnLeave
        ? {
            exit: {
              opacity: 0,
              transition: { duration: 0.3, ease: 'easeIn' },
            },
          }
        : {}),
    };

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit={animateOnLeave ? 'exit' : undefined}
        viewport={{
          once,
          amount: viewportAmount,
          margin: viewportMargin,
        }}
        onViewportEnter={() => onEnter?.()}
        onViewportLeave={() => onLeave?.()}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={baseConfig.initial}
      whileInView={baseConfig.visible}
      exit={animateOnLeave ? baseConfig.exit : undefined}
      transition={transitionConfig}
      viewport={{
        once,
        amount: viewportAmount,
        margin: viewportMargin,
      }}
      onViewportEnter={() => onEnter?.()}
      onViewportLeave={() => onLeave?.()}
      className={className}
    >
      {isParallax ? (
        <motion.div
          style={{
            y: parallaxDirection === 'vertical' ? parallaxY : 0,
            x: parallaxDirection === 'horizontal' ? parallaxX : 0,
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;

import { useMemo } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/constants';
import type { MotionProps } from '@/types';

// Memoized animation presets for performance
export const useOptimizedAnimation = () => {
  const animations = useMemo(() => ({
    fadeInUp: (delay = 0): MotionProps => ({
      initial: { y: 30, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { 
        duration: ANIMATION_DURATIONS.normal, 
        delay, 
        ease: "easeOut" 
      }
    }),

    fadeIn: (delay = 0): MotionProps => ({
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { 
        duration: ANIMATION_DURATIONS.normal, 
        delay 
      }
    }),

    scaleIn: (delay = 0): MotionProps => ({
      initial: { scale: 0.9, opacity: 0 },
      whileInView: { scale: 1, opacity: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { 
        duration: ANIMATION_DURATIONS.slow, 
        delay, 
        ease: "easeOut" 
      }
    }),

    slideInUp: (delay = 0): MotionProps => ({
      initial: { y: 50, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { 
        duration: ANIMATION_DURATIONS.slow, 
        delay, 
        ease: "easeOut" 
      }
    }),

    // Hover animations with reduced motion for accessibility
    hoverScale: {
      whileHover: { scale: 1.01 },
      transition: { duration: ANIMATION_DURATIONS.fast }
    }
  }), []);

  return animations;
};
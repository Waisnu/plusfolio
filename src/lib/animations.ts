import { ANIMATION_DURATIONS } from './constants';

// Standard Animation Presets  
export const fadeInUp = (delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { 
    duration: ANIMATION_DURATIONS.normal, 
    delay
  }
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { 
    duration: ANIMATION_DURATIONS.normal, 
    delay 
  }
});

export const scaleIn = (delay = 0) => ({
  initial: { scale: 0.9, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { 
    duration: ANIMATION_DURATIONS.slow, 
    delay
  }
});

export const slideInUp = (delay = 0) => ({
  initial: { y: 50, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { 
    duration: ANIMATION_DURATIONS.slow, 
    delay
  }
});

// Hover Animations
export const hoverScale = {
  whileHover: { scale: 1.01 },
  transition: { duration: ANIMATION_DURATIONS.fast }
};
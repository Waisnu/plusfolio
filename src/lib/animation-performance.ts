// High-performance animation utilities with hardware acceleration

export const performanceAnimations = {
  // Hardware-accelerated transforms
  fadeInUp: {
    initial: { 
      opacity: 0, 
      y: 30,
      // Force hardware acceleration
      transform: 'translate3d(0, 30px, 0)',
      willChange: 'opacity, transform'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'auto'
    },
    transition: {
      duration: 0.6,
      ease: [0.21, 1.02, 0.73, 1], // Custom cubic bezier for smooth motion
    }
  },

  // Optimized scale animation
  scaleIn: {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      // Hardware acceleration
      transform: 'scale3d(0.95, 0.95, 1)',
      willChange: 'opacity, transform'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transform: 'scale3d(1, 1, 1)',
      willChange: 'auto'
    },
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  },

  // Performance-optimized stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Reduced motion variants for accessibility
  reducedMotion: {
    fadeInUp: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    },
    scaleIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    }
  }
};

// Animation performance optimization hook
export const useOptimizedAnimations = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return prefersReducedMotion 
    ? performanceAnimations.reducedMotion 
    : performanceAnimations;
};

// Animation performance utilities
export const animationUtils = {
  // Prepare element for animation (apply will-change)
  prepareForAnimation: (element: HTMLElement, properties: string[]) => {
    element.style.willChange = properties.join(', ');
  },

  // Clean up after animation (remove will-change)
  cleanupAfterAnimation: (element: HTMLElement) => {
    element.style.willChange = 'auto';
  },

  // Force GPU layer creation
  createGPULayer: (element: HTMLElement) => {
    element.style.transform = element.style.transform || 'translate3d(0, 0, 0)';
  },

  // Optimized scroll-triggered animations
  createScrollObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    return new IntersectionObserver(callback, {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: '50px 0px -10% 0px' // Start animation earlier, end sooner
    });
  }
};

// Performance monitoring for animations
export const animationPerformance = {
  measureAnimationPerformance: (animationName: string) => {
    if (typeof performance === 'undefined') return;

    const startTime = performance.now();
    
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log slow animations in development
        if (process.env.NODE_ENV === 'development' && duration > 16.67) {
          console.warn(`Animation "${animationName}" took ${duration.toFixed(2)}ms (>16.67ms budget)`);
        }
        
        return duration;
      }
    };
  }
};
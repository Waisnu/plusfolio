// Performance monitoring utilities
export const performanceMonitor = {
  // Track component render times
  trackRender: (componentName: string) => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${componentName}-render-start`);
      return () => {
        performance.mark(`${componentName}-render-end`);
        performance.measure(`${componentName}-render`, `${componentName}-render-start`, `${componentName}-render-end`);
      };
    }
    return () => {}; // No-op for environments without Performance API
  },

  // Debounce utility for expensive operations
  debounce: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  },

  // Throttle utility for scroll/resize events
  throttle: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    let lastCall = 0;
    return ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    }) as T;
  },

  // Memory usage tracking (for development)
  trackMemory: () => {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      console.log({
        used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
      });
    }
  },

  // Lazy loading intersection observer
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    if (typeof IntersectionObserver !== 'undefined') {
      return new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      });
    }
    return null;
  }
};
// Comprehensive performance monitoring and metrics collection

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  bundleSize: {
    total: number;
    javascript: number;
    css: number;
    images: number;
  };
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (typeof window === 'undefined') return;

    // Core Web Vitals monitoring
    this.monitorWebVitals();
    
    // Bundle size analysis
    this.analyzeBundleSize();
    
    // Memory usage tracking
    this.monitorMemoryUsage();
    
    // Custom performance markers
    this.setupCustomMarkers();
  }

  private monitorWebVitals() {
    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          // @ts-ignore
          if (!entry.hadRecentInput) {
            // @ts-ignore
            clsValue += entry.value;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS monitoring not supported');
      }

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0] as PerformanceEntry;
        // @ts-ignore
        this.metrics.firstInputDelay = firstEntry.processingStart - firstEntry.startTime;
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID monitoring not supported');
      }
    }

    // FCP (First Contentful Paint) from Navigation API
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.firstContentfulPaint = fcpEntry.startTime;
      }
    }
  }

  private analyzeBundleSize() {
    if (typeof window === 'undefined') return;

    // Analyze resource timing for bundle size estimation
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;

    resourceEntries.forEach((entry) => {
      const size = entry.transferSize || 0;
      totalSize += size;

      if (entry.name.includes('.js')) {
        jsSize += size;
      } else if (entry.name.includes('.css')) {
        cssSize += size;
      } else if (entry.name.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/i)) {
        imageSize += size;
      }
    });

    this.metrics.bundleSize = {
      total: totalSize,
      javascript: jsSize,
      css: cssSize,
      images: imageSize
    };
  }

  private monitorMemoryUsage() {
    if (typeof window === 'undefined') return;

    // @ts-ignore - TypeScript doesn't have types for performance.memory
    if ('memory' in performance) {
      // @ts-ignore
      const memory: any = performance.memory;
      this.metrics.memoryUsage = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
  }

  private setupCustomMarkers() {
    if (typeof window === 'undefined') return;

    // Page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.metrics.loadTime = loadTime;
    });

    // Time to Interactive (simplified estimation)
    document.addEventListener('DOMContentLoaded', () => {
      // Simple TTI estimation based on when DOM is ready + additional processing time
      setTimeout(() => {
        this.metrics.timeToInteractive = performance.now();
      }, 100);
    });
  }

  // Get current performance metrics
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  // Get performance score (0-100)
  public getPerformanceScore(): number {
    const metrics = this.getMetrics();
    let score = 100;

    // LCP scoring (good: <2.5s, needs improvement: <4s, poor: >4s)
    if (metrics.largestContentfulPaint) {
      const lcp = metrics.largestContentfulPaint / 1000;
      if (lcp > 4) score -= 30;
      else if (lcp > 2.5) score -= 15;
    }

    // CLS scoring (good: <0.1, needs improvement: <0.25, poor: >0.25)
    if (metrics.cumulativeLayoutShift) {
      if (metrics.cumulativeLayoutShift > 0.25) score -= 25;
      else if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
    }

    // FID scoring (good: <100ms, needs improvement: <300ms, poor: >300ms)
    if (metrics.firstInputDelay) {
      if (metrics.firstInputDelay > 300) score -= 20;
      else if (metrics.firstInputDelay > 100) score -= 10;
    }

    // Bundle size scoring
    if (metrics.bundleSize?.total) {
      const totalSizeMB = metrics.bundleSize.total / (1024 * 1024);
      if (totalSizeMB > 3) score -= 15;
      else if (totalSizeMB > 1.5) score -= 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Generate performance report
  public generateReport(): string {
    const metrics = this.getMetrics();
    const score = this.getPerformanceScore();

    let report = `🚀 PlusFolio Performance Report\n`;
    report += `Overall Score: ${score}/100\n\n`;

    if (metrics.loadTime) {
      report += `⏱️  Load Time: ${(metrics.loadTime / 1000).toFixed(2)}s\n`;
    }

    if (metrics.firstContentfulPaint) {
      report += `🎨 First Contentful Paint: ${(metrics.firstContentfulPaint / 1000).toFixed(2)}s\n`;
    }

    if (metrics.largestContentfulPaint) {
      const lcp = metrics.largestContentfulPaint / 1000;
      const lcpStatus = lcp <= 2.5 ? '✅' : lcp <= 4 ? '⚠️' : '❌';
      report += `📏 Largest Contentful Paint: ${lcp.toFixed(2)}s ${lcpStatus}\n`;
    }

    if (metrics.cumulativeLayoutShift !== undefined) {
      const clsStatus = metrics.cumulativeLayoutShift <= 0.1 ? '✅' : 
                        metrics.cumulativeLayoutShift <= 0.25 ? '⚠️' : '❌';
      report += `📐 Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)} ${clsStatus}\n`;
    }

    if (metrics.firstInputDelay) {
      const fidStatus = metrics.firstInputDelay <= 100 ? '✅' : 
                        metrics.firstInputDelay <= 300 ? '⚠️' : '❌';
      report += `⚡ First Input Delay: ${metrics.firstInputDelay.toFixed(2)}ms ${fidStatus}\n`;
    }

    if (metrics.bundleSize) {
      report += `\n📦 Bundle Analysis:\n`;
      report += `   Total: ${(metrics.bundleSize.total / 1024).toFixed(2)} KB\n`;
      report += `   JavaScript: ${(metrics.bundleSize.javascript / 1024).toFixed(2)} KB\n`;
      report += `   CSS: ${(metrics.bundleSize.css / 1024).toFixed(2)} KB\n`;
      report += `   Images: ${(metrics.bundleSize.images / 1024).toFixed(2)} KB\n`;
    }

    if (metrics.memoryUsage) {
      report += `\n🧠 Memory Usage:\n`;
      report += `   Used: ${(metrics.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB\n`;
      report += `   Total: ${(metrics.memoryUsage.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB\n`;
    }

    return report;
  }

  // Cleanup observers
  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  
  return performanceMonitor;
};

export const getPerformanceMetrics = () => {
  return performanceMonitor?.getMetrics() || {};
};

export const getPerformanceScore = () => {
  return performanceMonitor?.getPerformanceScore() || 0;
};

export const generatePerformanceReport = () => {
  return performanceMonitor?.generateReport() || 'Performance monitoring not initialized';
};
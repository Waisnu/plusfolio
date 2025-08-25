// Advanced preloading strategies for performance optimization

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload key fonts
  const fontPreloadLinks = [
    { href: '/_next/static/css/fonts.css', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
  ];

  fontPreloadLinks.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Intelligent preloading based on user behavior
export const setupIntelligentPreloading = () => {
  // Preload next sections on hover/scroll proximity
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nextSection = entry.target.nextElementSibling;
        if (nextSection) {
          // Preload next section's dynamic imports
          preloadNextSection(nextSection);
        }
      }
    });
  }, { threshold: 0.8 }); // When user is close to finishing current section

  // Observe all major sections
  document.querySelectorAll('section, main > div').forEach((section) => {
    observer.observe(section);
  });
};

// Preload next section's resources
const preloadNextSection = (section: Element) => {
  const sectionId = section.id || section.className;
  
  // Map sections to their likely dynamic imports
  const sectionImports: Record<string, string[]> = {
    'developer': ['@/components/layout/Developer'],
    'pricing': ['@/components/layout/PricingSection'],
    'wishlist': ['@/components/layout/modern-wishlist'],
    'testimonials': ['@/components/layout/DeveloperTestimonials']
  };

  // Preload relevant imports
  Object.entries(sectionImports).forEach(([key, imports]) => {
    if (sectionId.includes(key)) {
      imports.forEach(importPath => {
        import(importPath).catch(() => {
          // Silent fail - preloading is optional
        });
      });
    }
  });
};

// Resource hints for better loading
export const addResourceHints = () => {
  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical origins
  const preconnectDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Initialize all preloading strategies
export const initializePreloading = () => {
  if (typeof window === 'undefined') return;

  // Run immediately
  addResourceHints();
  preloadCriticalResources();

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupIntelligentPreloading);
  } else {
    setupIntelligentPreloading();
  }
};
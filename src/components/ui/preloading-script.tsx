// Client-side preloading script for performance optimization
export function PreloadingScript() {
  return (
    <>
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        as="style"
        id="font-preload"
      />
      
      {/* Fallback for browsers that don't support preload */}
      <noscript>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </noscript>
      
      {/* Resource hints script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Convert font preload to stylesheet when loaded
              const fontPreload = document.getElementById('font-preload');
              if (fontPreload) {
                fontPreload.onload = function() {
                  this.onload = null;
                  this.rel = 'stylesheet';
                };
              }
              
              // Intelligent preloading on scroll
              if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
                      const nextSection = entry.target.nextElementSibling;
                      if (nextSection && nextSection.hasAttribute('data-preload')) {
                        const moduleToPreload = nextSection.getAttribute('data-preload');
                        if (moduleToPreload) {
                          import(moduleToPreload).catch(() => {});
                        }
                      }
                    }
                  });
                }, { threshold: 0.8 });
                
                // Observe sections when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    document.querySelectorAll('section, main > div').forEach(function(el) {
                      observer.observe(el);
                    });
                  });
                } else {
                  document.querySelectorAll('section, main > div').forEach(function(el) {
                    observer.observe(el);
                  });
                }
              }
            })();
          `
        }}
      />
    </>
  );
}
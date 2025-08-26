"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PulsatingDots from '@/components/ui/pulsating-loader';

interface SiteLoaderProps {
  children: React.ReactNode;
}

export default function SiteLoader({ children }: SiteLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    setIsMounted(true);
    
    let currentProgress = 0;
    const loadingStages = [
      { progress: 15, text: "Loading fonts..." },
      { progress: 30, text: "Preparing assets..." },
      { progress: 45, text: "Loading images..." },
      { progress: 60, text: "Initializing components..." },
      { progress: 75, text: "Setting up animations..." },
      { progress: 90, text: "Optimizing performance..." },
      { progress: 100, text: "Ready!" }
    ];
    
    let stageIndex = 0;
    
    const checkAssetsLoaded = () => {
      // Wait for DOM to be fully loaded first
      const domReady = document.readyState === 'complete' 
        ? Promise.resolve() 
        : new Promise(resolve => {
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
              window.addEventListener('load', resolve, { once: true });
            }
          });

      return domReady.then(() => {
        const promises = [];
        
        // Check if fonts are loaded
        if (document.fonts && document.fonts.ready) {
          promises.push(document.fonts.ready);
        }
        
        // Check if all images are loaded
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
          // If already loaded successfully
          if (img.complete && img.naturalHeight > 0) {
            return Promise.resolve();
          }
          
          // If already failed to load
          if (img.complete && img.naturalHeight === 0) {
            return Promise.resolve(); // Don't wait for broken images
          }
          
          // Wait for image to load or fail
          return new Promise<void>(resolve => {
            const timeout = setTimeout(() => resolve(), 2000); // Max 2s wait per image
            
            img.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            
            img.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if image fails
            };
          });
        });
        
        promises.push(...imagePromises);
        
        // Wait for any lazy-loaded components
        const lazyComponents = document.querySelectorAll('[data-loading], .loading');
        if (lazyComponents.length > 0) {
          promises.push(new Promise(resolve => setTimeout(resolve, 500)));
        }
        
        // Add overall timeout to prevent infinite hanging
        const allPromises = Promise.all(promises);
        const timeout = new Promise(resolve => setTimeout(resolve, 5000)); // Max 5s total
        
        return Promise.race([allPromises, timeout]);
      });
    };
    
    const progressLoader = () => {
      const timer = setInterval(() => {
        if (stageIndex < loadingStages.length) {
          const stage = loadingStages[stageIndex];
          setProgress(stage.progress);
          setLoadingText(stage.text);
          stageIndex++;
          
          // When we reach the final stage, wait for assets
          if (stage.progress === 100) {
            clearInterval(timer);
            checkAssetsLoaded().then(() => {
              // Brief pause to ensure all animations are ready
              setTimeout(() => setIsLoading(false), 300);
            }).catch(() => {
              // Fallback in case asset loading fails
              setTimeout(() => setIsLoading(false), 800);
            });
          }
        }
      }, 300); // Slower, more realistic progression
      
      return timer;
    };
    
    // Start loading immediately when component mounts
    const timer = setTimeout(() => {
      progressLoader();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-8">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-2xl">P</span>
                </div>
                <span className="text-2xl font-bold text-foreground">PlusFolio</span>
              </motion.div>

              {/* Loading dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <PulsatingDots />
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-64"
              >
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </div>
                <div className="text-center mt-2 text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-sm text-muted-foreground"
              >
                {loadingText}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - only show when loading is complete */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
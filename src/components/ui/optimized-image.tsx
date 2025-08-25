'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps extends Omit<ImageProps, 'loading' | 'placeholder'> {
  lazyLoading?: boolean;
  blurDataURL?: string;
  fallbackSrc?: string;
  performanceOptimized?: boolean;
}

export const OptimizedImage = ({ 
  lazyLoading = true,
  blurDataURL,
  fallbackSrc,
  performanceOptimized = true,
  onLoad,
  onError,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(props.src);
  
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const shouldLoad = !lazyLoading || isIntersecting;

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
    onError?.(event);
  };

  // Performance optimizations
  const optimizedProps = performanceOptimized ? {
    quality: 85,
    sizes: props.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority: props.priority || false,
  } : {};

  if (!shouldLoad) {
    return (
      <div 
        ref={targetRef}
        className={`bg-gray-200 animate-pulse ${props.className || ''}`}
        style={{ 
          width: props.width, 
          height: props.height,
          aspectRatio: typeof props.width === 'number' && typeof props.height === 'number' 
            ? `${props.width} / ${props.height}` 
            : undefined
        }}
      />
    );
  }

  return (
    <div ref={targetRef} className="relative overflow-hidden">
      <Image
        {...props}
        {...optimizedProps}
        src={currentSrc}
        loading={lazyLoading ? 'lazy' : 'eager'}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${props.className || ''}`}
      />
      
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};
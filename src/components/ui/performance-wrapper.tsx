'use client';

import { Suspense, memo, useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { OptimizedLoading } from './optimized-loading';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  enableViewportLoading?: boolean;
}

// Performance wrapper with intersection observer for viewport-based loading
const PerformanceWrapper = memo<PerformanceWrapperProps>(({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  fallback,
  enableViewportLoading = true
}) => {
  const [isInViewport, setIsInViewport] = useState(!enableViewportLoading);
  const [shouldRender, setShouldRender] = useState(!enableViewportLoading);

  // Use intersection observer for viewport-based loading
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (enableViewportLoading && isIntersecting && !isInViewport) {
      setIsInViewport(true);
      // Small delay to allow for smooth entrance
      setTimeout(() => setShouldRender(true), 50);
    } else if (!enableViewportLoading) {
      setShouldRender(true);
    }
  }, [isIntersecting, enableViewportLoading, isInViewport]);

  return (
    <div ref={targetRef} className={className}>
      {shouldRender ? (
        <Suspense fallback={fallback || <OptimizedLoading className="h-64 w-full" />}>
          {children}
        </Suspense>
      ) : (
        fallback || <OptimizedLoading className="h-64 w-full" />
      )}
    </div>
  );
});

PerformanceWrapper.displayName = 'PerformanceWrapper';

export { PerformanceWrapper };
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedLoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Memoized loading component to prevent unnecessary re-renders
const OptimizedLoading = memo<OptimizedLoadingProps>(({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-2', 
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div 
        className={cn(
          "animate-spin rounded-full border-primary border-t-transparent",
          sizeClasses[size]
        )}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
});

OptimizedLoading.displayName = 'OptimizedLoading';

export { OptimizedLoading };
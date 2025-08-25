'use client';

import { useEffect, useState } from 'react';
import { initializePerformanceMonitoring, generatePerformanceReport, getPerformanceScore } from '@/lib/performance-monitoring';

interface PerformanceMonitorProps {
  showInDevelopment?: boolean;
  logToConsole?: boolean;
}

export const PerformanceMonitor = ({ 
  showInDevelopment = true, 
  logToConsole = true 
}: PerformanceMonitorProps) => {
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== 'development' && !showInDevelopment) return;

    const monitor = initializePerformanceMonitoring();
    if (!monitor) return;

    // Update performance score periodically
    const interval = setInterval(() => {
      const score = getPerformanceScore();
      setPerformanceScore(score);
    }, 2000);

    // Log performance report after page load
    const logReport = () => {
      setTimeout(() => {
        const report = generatePerformanceReport();
        if (logToConsole) {
          console.log(report);
        }
      }, 3000); // Wait 3 seconds for all metrics to be collected
    };

    if (document.readyState === 'complete') {
      logReport();
    } else {
      window.addEventListener('load', logReport);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', logReport);
      monitor.cleanup();
    };
  }, [showInDevelopment, logToConsole]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' && !showInDevelopment) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded-lg text-xs font-mono backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          performanceScore >= 90 ? 'bg-green-400' :
          performanceScore >= 70 ? 'bg-yellow-400' :
          'bg-red-400'
        }`} />
        <span>Perf: {performanceScore}/100</span>
        <button
          onClick={() => setShowReport(!showReport)}
          className="ml-2 px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors"
        >
          {showReport ? 'Hide' : 'Report'}
        </button>
      </div>
      
      {showReport && (
        <div className="mt-2 p-2 bg-black/90 rounded max-w-md max-h-64 overflow-auto">
          <pre className="whitespace-pre-wrap text-xs">
            {generatePerformanceReport()}
          </pre>
        </div>
      )}
    </div>
  );
};
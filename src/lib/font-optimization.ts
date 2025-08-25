import { Inter } from 'next/font/google';

// Optimized font loading with reduced font weight variations
export const interFont = Inter({
  subsets: ['latin'],
  // Only load weights we actually use
  weight: ['400', '500', '600', '700'],
  // Optimize loading
  display: 'swap',
  // Preload for better performance
  preload: true,
  // Reduce flash of unstyled text
  fallback: ['system-ui', 'arial'],
  // Define CSS variables for consistent usage
  variable: '--font-inter',
});

// CSS optimization
export const fontClassNames = interFont.className;
export const fontVariables = interFont.variable;
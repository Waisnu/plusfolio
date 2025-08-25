import type { Metadata } from 'next'
import './globals.css'
import SiteLoader from '@/components/layout/site-loader'
import { fontClassNames, fontVariables } from '@/lib/font-optimization'
import { PreloadingScript } from '@/components/ui/preloading-script'
import { PerformanceMonitor } from '@/components/ui/performance-monitor'

export const metadata: Metadata = {
  title: 'PlusFolio - AI-Powered Website Analysis',
  description: 'Get comprehensive design feedback and insights for your website in just 60 seconds with our AI-powered analysis tool.',
  keywords: 'website analysis, design feedback, AI analysis, web development, UX audit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <head>
        <PreloadingScript />
      </head>
      <body className={`${fontClassNames} bg-dark-950 text-white min-h-screen`}>
        <SiteLoader />
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  )
}
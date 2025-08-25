import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
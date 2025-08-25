'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShaderBackground } from "@/components/ui/shader-background"
import SparklesText from "@/components/ui/sparkles-text"

export default function Hero() {
  return (
    <ShaderBackground>
      <div className="relative min-h-screen">
        {/* Integrated Navigation Bar */}
        <nav className="relative z-10 flex items-center justify-between px-6 pt-6 pb-2">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">P</span>
            </div>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Docs
            </a>
          </div>

          {/* Login Button - Right Side */}
          <div className="flex items-center">
            <Button 
              variant="secondary"
              size="sm" 
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20 rounded-full px-6 py-2 font-medium transition-all"
            >
              Login
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-xs font-medium text-white/90">⚡ AI Website Analysis</span>
            </div>

            {/* Main Headline - Based on PRD positioning */}
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 font-heading">
              The AI Design
              <br />
              <SparklesText 
                text="Consultant" 
                className="italic font-light gradient-text"
              />
              <br />
              for Developers
            </h1>
            
            {/* Description - Based on PRD value prop */}
            <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl mb-12 font-light">
              Transform hours of expensive consultation into minutes of actionable AI insights. 
              Get consultant-grade feedback that empowers you to create 
              <span className="text-cyan-300 font-semibold"> high-converting, user-friendly websites</span>.
            </p>

            {/* URL Input Section */}
            <div className="flex flex-col sm:flex-row items-start gap-4 max-w-2xl mb-8">
              <Input
                type="url"
                placeholder="Enter your website URL"
                className="flex-1 w-full px-6 py-4 text-lg h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
              />
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-10 py-4 text-lg h-14 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button 
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl px-8 py-3 font-medium transition-all"
              >
                Pricing
              </Button>
            </div>

          </div>
        </div>
      </div>
    </ShaderBackground>
  )
}
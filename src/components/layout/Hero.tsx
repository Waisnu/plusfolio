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
        <nav className="relative z-10 flex items-center justify-between px-6 pt-6 pb-2 animate-fade-in-down">
          {/* Logo - Left Side */}
          <div className="flex items-center animate-fade-in-left animation-delay-100">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">P</span>
            </div>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in-up animation-delay-200">
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
          <div className="flex items-center animate-fade-in-right animation-delay-100">
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
          <div className="mx-auto max-w-4xl text-center">
            
            {/* Small Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-scale-in animation-delay-300">
              <span className="text-xs font-medium text-white/90">⚡ AI Website Analysis</span>
            </div>

            {/* Main Headline - Problem-focused, creating urgency */}
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 font-heading animate-fade-in-up animation-delay-400">
              Find Out Why Your
              <br />
              <SparklesText 
                text="Visitors Aren't" 
                className="italic font-light gradient-text"
              />
              <br />
              Converting
            </h1>
            
            {/* Sub-headline - Solution-focused, value proposition */}
            <p className="max-w-3xl mx-auto text-lg leading-8 text-white/80 sm:text-xl mb-12 font-light animate-fade-in-up animation-delay-600">
              Get an instant AI audit of your website's usability and design. 
              Skip the expensive consultations and receive a 
              <span className="text-cyan-300 font-semibold"> free report with actionable insights</span> in 60 seconds.
            </p>

            {/* URL Input Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-800">
              <Input
                type="url"
                placeholder="Enter your website URL"
                className="flex-1 w-full px-6 py-4 text-lg h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
              />
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-10 py-4 text-lg h-14 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all hover:scale-105"
              >
                Pinpoint the Problem
              </Button>
            </div>

            {/* Supporting text - addressing objections */}
            <p className="text-white/60 text-sm animate-fade-in animation-delay-1000">
              ✓ Free analysis • ✓ No signup required • ✓ Results in 60 seconds
            </p>

          </div>
        </div>
      </div>
    </ShaderBackground>
  )
}
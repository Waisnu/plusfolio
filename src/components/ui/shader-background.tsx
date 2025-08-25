"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isShaderReady, setIsShaderReady] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    // Wait for shader to be ready
    const shaderTimer = setTimeout(() => {
      setIsShaderReady(true)
    }, 100)

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      clearTimeout(shaderTimer)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-[650px] w-full relative overflow-hidden">
      {/* Default dark background to prevent flash */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Background Shaders - Only show when ready */}
      {isShaderReady && (
        <>
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-0"
            colors={["#000000", "#3b82f6", "#0ea5e9", "#1e293b", "#0f172a"]}
            speed={0.3}
            style={{ 
              animation: 'fade-in 0.6s ease-out forwards', 
              animationDelay: '100ms' 
            }}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-0"
            colors={["#000000", "#ffffff", "#3b82f6", "#000000"]}
            speed={0.2}
            style={{ 
              animation: 'fade-in-secondary 0.6s ease-out forwards', 
              animationDelay: '200ms'
            }}
          />
        </>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
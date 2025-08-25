"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import * as THREE from "three"
import { SHADER_CONFIG } from "@/lib/constants"
import type { WebGLRefs } from "@/types"

export function ContainedWebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<WebGLRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  const animate = useCallback(function animateLoop() {
    const { current: refs } = sceneRef
    
    if (!refs.renderer || !refs.scene || !refs.camera || !refs.uniforms) {
      return
    }
    
    // Smooth time progression
    refs.uniforms.time.value += 0.01
    
    // Force render
    refs.renderer.render(refs.scene, refs.camera)
    
    // Continue animation loop
    refs.animationId = requestAnimationFrame(animateLoop)
  }, [])

  // Simplified initialization without viewport detection
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / max(abs(p.y + sin((rx + time) * xScale) * yScale), 0.001);
        float g = 0.05 / max(abs(p.y + sin((gx + time) * xScale) * yScale), 0.001);
        float b = 0.05 / max(abs(p.y + sin((bx + time) * xScale) * yScale), 0.001);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        stencil: false,
        depth: false
      })
      refs.renderer.setPixelRatio(1) // Force 1:1 pixel ratio for consistent performance
      refs.renderer.setClearColor(new THREE.Color(0x000000), 1)

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      const rect = container.getBoundingClientRect()
      
      refs.uniforms = {
        resolution: { value: [rect.width, rect.height] },
        time: { value: 0.0 },
        xScale: { value: SHADER_CONFIG.uniforms.xScale },
        yScale: { value: SHADER_CONFIG.uniforms.yScale },
        distortion: { value: SHADER_CONFIG.uniforms.distortion },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    // Initialize immediately for smoother startup
    initScene()
    animate()

    // Simple window resize handler instead of ResizeObserver
    window.addEventListener('resize', handleResize)

    return () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }
      window.removeEventListener('resize', handleResize)
      
      // Comprehensive cleanup
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
        refs.mesh = null
      }
      
      if (refs.renderer) {
        refs.renderer.dispose()
        refs.renderer = null
      }
      
      // Clear references
      refs.scene = null
      refs.camera = null
      refs.uniforms = null
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  )
}
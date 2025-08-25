"use client"

import { useEffect, useRef, useCallback } from "react"
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

  const animate = useCallback(() => {
    const { current: refs } = sceneRef
    if (refs.uniforms) refs.uniforms.time.value += SHADER_CONFIG.animation.timeIncrement
    if (refs.renderer && refs.scene && refs.camera) {
      refs.renderer.render(refs.scene, refs.camera)
    }
    refs.animationId = requestAnimationFrame(animate)
  }, [])

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

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      refs.renderer.setClearColor(new THREE.Color(0x000000))

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

    // Initialize with a delay to ensure container is rendered
    const initTimer = setTimeout(() => {
      initScene()
      animate()
    }, SHADER_CONFIG.animation.initDelay)

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      clearTimeout(initTimer)
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }
      resizeObserver.disconnect()
      
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
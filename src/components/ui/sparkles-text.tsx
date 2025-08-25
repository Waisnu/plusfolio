"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SparklesTextProps {
  text: string
  className?: string
}

const sparkles = [
  {
    id: 1,
    x: 15,
    y: 15,
    color: "#FCD34D",
    delay: 0,
    scale: 1,
  },
  {
    id: 2,
    x: 85,
    y: 25,
    color: "#60A5FA", 
    delay: 0.3,
    scale: 0.8,
  },
  {
    id: 3,
    x: 70,
    y: 70,
    color: "#C084FC",
    delay: 0.6,
    scale: 1.2,
  },
  {
    id: 4,
    x: 25,
    y: 80,
    color: "#34D399",
    delay: 0.9,
    scale: 0.9,
  },
]

export default function SparklesText({ text, className = "" }: SparklesTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <span className={className}>{text}</span>

  return (
    <span className={`relative inline-block ${className}`}>
      {text}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={sparkle.color}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </span>
  )
}
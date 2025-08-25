"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SparklesProps {
  children: React.ReactNode
  className?: string
  count?: number
}

const generateSparkle = (id: number) => ({
  id,
  x: Math.random() * 100,
  y: Math.random() * 100,
  color: ["#FCD34D", "#60A5FA", "#C084FC", "#34D399", "#FB7185"][Math.floor(Math.random() * 5)],
  delay: Math.random() * 3,
  scale: 0.8 + Math.random() * 0.4,
})

export default function Sparkles({ children, className = "", count = 6 }: SparklesProps) {
  const [sparkles, setSparkles] = useState<ReturnType<typeof generateSparkle>[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSparkles(Array.from({ length: count }, (_, i) => generateSparkle(i)))

    const interval = setInterval(() => {
      setSparkles((prevSparkles) => 
        prevSparkles.map((sparkle) => 
          Math.random() > 0.8 ? generateSparkle(sparkle.id) : sparkle
        )
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [count])

  if (!mounted) return <div className={className}>{children}</div>

  return (
    <div className={`relative ${className}`}>
      {children}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none z-10"
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
            duration: 2.5,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill={sparkle.color}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
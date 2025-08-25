'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { OptimizedLoading } from '@/components/ui/optimized-loading'
import { TECHNOLOGY_ICONS, TECHNOLOGIES, ANIMATION_DURATIONS } from '@/lib/constants'
import { fadeInUp, scaleIn, slideInUp } from '@/lib/animations'

const IconCloud = dynamic(
  () => import("@/components/ui/interactive-icon-cloud").then(mod => ({ default: mod.IconCloud })), 
  { 
    ssr: false,
    loading: () => <OptimizedLoading className="h-64 w-full" size="lg" />
  }
)

export default function Developer() {

  return (
    <div className="py-24 bg-gradient-to-tr from-slate-900/5 via-blue-900/10 to-purple-900/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          {...slideInUp(0)}
        >
          <motion.h2 
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight"
            {...fadeInUp(0.2)}
          >
            Universal compatibility with 
            <br />
            <span className="text-primary">modern web technologies</span>
          </motion.h2>
          <motion.p 
            className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto"
            {...fadeInUp(0.4)}
          >
            Our AI analyzes websites regardless of the underlying technology. From React SPAs to WordPress sites, 
            get comprehensive insights that focus on what users see, not just the code beneath.
          </motion.p>
        </motion.div>

        {/* Interactive Icon Cloud */}
        <motion.div 
          className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden px-20 pb-20 pt-8 mx-auto"
          {...scaleIn(0.6)}
        >
          <IconCloud iconSlugs={TECHNOLOGY_ICONS} />
        </motion.div>

        {/* Infinite Technology Slider */}
        <motion.div
          className="mt-16"
          {...fadeInUp(0.8)}
        >
          <InfiniteSlider 
            gap={24} 
            duration={ANIMATION_DURATIONS.infinite} 
            durationOnHover={ANIMATION_DURATIONS.infiniteHover}
            className="w-full"
          >
            {TECHNOLOGIES.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[200px] h-20 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-sm font-semibold text-white">
                  {tech.name}
                </span>
                <span className="text-xs text-white/60 mt-1">
                  {tech.description}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const IconCloud = dynamic(() => import("@/components/ui/interactive-icon-cloud").then(mod => ({ default: mod.IconCloud })), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64 w-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
})

export default function Developer() {
  const iconSlugs = [
    "typescript",
    "javascript", 
    "react",
    "nextdotjs",
    "vuedotjs",
    "angular",
    "svelte",
    "nodejs",
    "express",
    "nestjs",
    "django",
    "flask",
    "laravel",
    "ruby",
    "wordpress",
    "shopify",
    "tailwindcss",
    "sass",
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "vercel",
    "netlify",
    "firebase",
    "supabase",
    "github",
    "git"
  ]

  return (
    <div className="py-24 bg-gradient-to-tr from-slate-900/5 via-blue-900/10 to-purple-900/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Universal compatibility with 
            <br />
            <span className="text-primary">modern web technologies</span>
          </motion.h2>
          <motion.p 
            className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Our AI analyzes websites regardless of the underlying technology. From React SPAs to WordPress sites, 
            get comprehensive insights that focus on what users see, not just the code beneath.
          </motion.p>
        </motion.div>

        {/* Interactive Icon Cloud */}
        <motion.div 
          className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden px-20 pb-20 pt-8 mx-auto"
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
        >
          <IconCloud iconSlugs={iconSlugs} />
        </motion.div>
      </div>
    </div>
  )
}
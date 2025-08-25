'use client'

import dynamic from 'next/dynamic'

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
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
            Universal compatibility with 
            <br />
            <span className="text-primary">modern web technologies</span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Our AI analyzes websites regardless of the underlying technology. From React SPAs to WordPress sites, 
            get comprehensive insights that focus on what users see, not just the code beneath.
          </p>
        </div>

        {/* Interactive Icon Cloud */}
        <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden px-20 pb-20 pt-8 mx-auto">
          <IconCloud iconSlugs={iconSlugs} />
        </div>
      </div>
    </div>
  )
}
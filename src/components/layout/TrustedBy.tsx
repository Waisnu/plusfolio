import Sparkles from "@/components/ui/sparkles"

export default function TrustedBy() {
  const companies = [
    { name: 'Vercel', logo: '▲' },
    { name: 'Stripe', logo: 'S' },
    { name: 'Linear', logo: '◆' },
    { name: 'Framer', logo: 'F' },
    { name: 'Figma', logo: '●' }
  ]

  return (
    <div className="py-16 bg-gradient-to-r from-blue-900/5 via-purple-900/10 to-cyan-900/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Sparkles className="text-center mb-12" count={8}>
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by
            <br />
            <span className="text-foreground font-semibold text-lg">25,000+ developers</span>
            <br />
            <span className="text-muted-foreground text-xs">at these companies</span>
          </p>
        </Sparkles>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center gap-3 glass-morphism px-6 py-3 rounded-xl hover:scale-105 transition-all duration-200 group">
              <div className="text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                {company.logo}
              </div>
              <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-center">
          <div className="glass-morphism px-4 py-2 rounded-full">
            <span className="text-white font-bold text-lg">10K+</span>
            <span className="text-white/60 text-sm ml-2">Websites Analyzed</span>
          </div>
          <div className="glass-morphism px-4 py-2 rounded-full">
            <span className="text-white font-bold text-lg">2.3s</span>
            <span className="text-white/60 text-sm ml-2">Avg Analysis Time</span>
          </div>
          <div className="glass-morphism px-4 py-2 rounded-full">
            <span className="text-white font-bold text-lg">95%</span>
            <span className="text-white/60 text-sm ml-2">Accuracy Rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
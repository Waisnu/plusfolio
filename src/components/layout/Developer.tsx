export default function Developer() {
  return (
    <div className="py-24 bg-gradient-to-tr from-slate-900/5 via-blue-900/10 to-purple-900/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
            Works with any
            <br />
            <span className="text-primary">web technology</span> stack
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Analyze websites built with any framework or technology.
            Get insights regardless of your tech stack.
          </p>
        </div>

        {/* Tech Icons */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-20">
          {[
            { name: 'React', icon: '⚛️' },
            { name: 'Next.js', icon: '▲' },
            { name: 'Vue', icon: '🟢' },
            { name: 'Angular', icon: '🔺' },
            { name: 'Svelte', icon: '🧡' },
            { name: 'WordPress', icon: '🔵' },
            { name: 'Shopify', icon: '🛍️' },
            { name: 'Static', icon: '📄' },
          ].map((tech, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-muted/50 border border-border rounded-xl hover:bg-muted hover:scale-105 transition-all duration-200">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <div className="text-muted-foreground text-sm font-medium">{tech.name}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-3">
              10K+
            </div>
            <div className="text-muted-foreground text-lg">Websites Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-3">
              2.3s
            </div>
            <div className="text-muted-foreground text-lg">Average Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-3">
              95%
            </div>
            <div className="text-muted-foreground text-lg">Improvement Score</div>
          </div>
        </div>
      </div>
    </div>
  )
}
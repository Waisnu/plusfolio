import { Card } from "@/components/ui/card"

export default function DemoSection() {
  return (
    <div className="py-24 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-slate-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Start analyzing
              <br />
              <span className="text-primary">websites in minutes</span>.
            </h2>
            
            {/* Social proof icons */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-mono">WP</span>
                </div>
                <span className="text-sm">WordPress</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-mono">⚛️</span>
                </div>
                <span className="text-sm">React</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-mono">Vue</span>
                </div>
                <span className="text-sm">Vue.js</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-mono">📱</span>
                </div>
                <span className="text-sm">Mobile</span>
              </div>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div className="flex-1 w-full max-w-lg">
            <Card className="p-4 bg-card border">
              {/* Terminal header */}
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">PlusFolio Analysis</span>
              </div>

              {/* Terminal content */}
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-foreground">plusfolio analyze https://example.com</span>
                </div>
                <div className="text-muted-foreground ml-4">🔍 Analyzing website structure...</div>
                <div className="text-muted-foreground ml-4">⚡ Checking performance metrics...</div>
                <div className="text-muted-foreground ml-4">🎨 Evaluating design patterns...</div>
                <div className="text-muted-foreground ml-4">📱 Testing mobile responsiveness...</div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-green-500">✓</span>
                  <span className="text-foreground">Analysis complete in 2.3s</span>
                </div>
                <div className="text-primary ml-4">📊 Report: https://plusfolio.com/report/abc123</div>
                <div className="text-muted-foreground ml-4">💡 85/100 overall score • 12 insights found</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
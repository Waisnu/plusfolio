import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PlusfolioFeatures() {
  const features = [
    {
      id: "MVP-101",
      title: "Instant URL Analysis",
      description: "Get comprehensive website reports in under 60 seconds with our AI-powered analysis engine.",
      category: "Speed",
      highlight: "<60s processing",
      icon: "⚡",
      image: "/api/placeholder/400/250"
    },
    {
      id: "MVP-102", 
      title: "Visual AI Analysis",
      description: "Advanced AI analyzes your website's layout, hierarchy, and design cohesion for optimal user experience.",
      category: "Design",
      highlight: ">90% accuracy",
      icon: "👁️",
      image: "/api/placeholder/400/250"
    },
    {
      id: "MVP-103",
      title: "PlusFolio Score",
      description: "Transparent 0-100 scoring system that tracks your website's performance and improvement over time.",
      category: "Analytics", 
      highlight: "Transparent methodology",
      icon: "📊",
      image: "/api/placeholder/400/250"
    },
    {
      id: "MVP-104",
      title: "Actionable Reports",
      description: "Prioritized recommendations with visual annotations that 80% of users take action on.",
      category: "Insights",
      highlight: "80% action rate",
      icon: "🎯", 
      image: "/api/placeholder/400/250"
    }
  ]

  return (
    <section className="py-16 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">
            ✨ Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Website Intelligence
            <br />
            <span className="gradient-text">That Actually Works</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From web crawling to AI analysis, every feature is designed to give developers 
            the design expertise they need to create high-converting websites.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Main Feature Card - Instant Analysis */}
          <Card className="lg:col-span-2 glass-morphism border-white/20 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl">
                    ⚡
                  </div>
                  <div>
                    <Badge className="mb-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                      Speed
                    </Badge>
                    <h3 className="text-2xl font-bold text-white">Instant URL Analysis</h3>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  &lt;60s processing
                </Badge>
              </div>
              <p className="text-white/80 text-lg mt-4 max-w-2xl">
                Transform hours of expensive consultation into minutes of actionable AI insights. 
                Our multi-API approach ensures 99% uptime with intelligent fallbacks.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white/60 text-sm ml-2">plusfolio.com/analyze</span>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-white/60">🔍 Crawling website structure...</div>
                  <div className="text-white/60">📸 Capturing visual screenshots...</div>
                  <div className="text-white/60">🧠 Analyzing with AI vision models...</div>
                  <div className="text-green-400">✅ Analysis complete in 42s</div>
                  <div className="text-blue-400">📊 PlusFolio Score: 87/100</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual AI Analysis */}
          <Card className="glass-morphism border-white/20 overflow-hidden floating-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                  👁️
                </div>
                <div>
                  <Badge className="mb-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                    Design
                  </Badge>
                  <h3 className="text-xl font-bold text-white">Visual AI Analysis</h3>
                </div>
              </div>
              <p className="text-white/80">
                Advanced AI models analyze layout, hierarchy, and design principles with &gt;90% accuracy.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Design Cohesion</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                    <span className="text-purple-400 font-bold text-sm">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Visual Hierarchy</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    </div>
                    <span className="text-blue-400 font-bold text-sm">88%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">UX Principles</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                    </div>
                    <span className="text-green-400 font-bold text-sm">95%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PlusFolio Score */}
          <Card className="glass-morphism border-white/20 overflow-hidden floating-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl">
                  📊
                </div>
                <div>
                  <Badge className="mb-2 bg-green-500/20 text-green-300 border-green-500/30">
                    Analytics
                  </Badge>
                  <h3 className="text-xl font-bold text-white">PlusFolio Score</h3>
                </div>
              </div>
              <p className="text-white/80">
                Transparent 0-100 scoring with methodology that tracks improvement over time.
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-white mb-2">87<span className="text-2xl text-white/60">/100</span></div>
                <div className="text-green-400 text-sm font-medium">↗ +12 from last analysis</div>
              </div>
              <div className="space-y-2 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Performance</span>
                  <span className="text-green-400">92</span>
                </div>
                <div className="flex justify-between">
                  <span>Design</span>
                  <span className="text-blue-400">85</span>
                </div>
                <div className="flex justify-between">
                  <span>SEO</span>
                  <span className="text-purple-400">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Accessibility</span>
                  <span className="text-cyan-400">83</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm">Used by 25,000+ developers worldwide</span>
          </div>
        </div>

      </div>
    </section>
  )
}
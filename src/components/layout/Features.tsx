import { Card, CardContent } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Design Analysis",
      description: "Comprehensive UI/UX audit with actionable recommendations for better user experience and visual design"
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Performance Audit", 
      description: "Detailed performance metrics with optimization suggestions for faster load times and better Core Web Vitals"
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "SEO Insights",
      description: "Search engine optimization analysis with ranking improvement recommendations and technical SEO audit"
    }
  ]

  return (
    <div className="py-24" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Everything you need for
            <br />
            <span className="text-primary">website analysis</span>
          </h2>
          <p className="text-xl leading-8 text-muted-foreground">
            Comprehensive insights that help you build better, faster, and more discoverable websites
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border text-center hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-8">
                  <div className="mx-auto h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
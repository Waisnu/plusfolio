import { Card, CardContent } from "@/components/ui/card"

export default function DeveloperTestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Lead",
      company: "TechCorp",
      avatar: "SC",
      quote: "PlusFolio saved us hours of manual website auditing. The AI insights are spot-on."
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Designer", 
      company: "DesignStudio",
      avatar: "MR",
      quote: "Finally, a tool that gives actionable design feedback instead of just generic metrics."
    },
    {
      name: "Emily Watson",
      role: "Web Developer",
      company: "StartupX",
      avatar: "EW", 
      quote: "The performance insights helped us improve our Core Web Vitals by 40% in one week."
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-bl from-cyan-900/5 via-slate-900/10 to-purple-900/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Loved by developers who're
            <br />
            <span className="text-primary">web performance</span> trailblazers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
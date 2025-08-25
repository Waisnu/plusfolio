import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function CTA() {
  return (
    <div className="py-24 bg-gradient-to-t from-purple-900/10 via-blue-900/5 to-slate-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <Card className="border border-border p-12 text-center">
          <CardContent className="p-0">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Ready to analyze your website?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Get comprehensive insights about your website's design, performance, and user experience in just 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8">
              <Input
                type="url"
                placeholder="Enter your website URL"
                className="flex-1 w-full px-6 py-4 text-lg h-14"
              />
              <Button size="lg" className="w-full sm:w-auto px-10 py-4 text-lg h-14">
                Start Analysis
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Results in 60 seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Signup */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Stay updated with web performance insights
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get weekly tips, case studies, and the latest web performance trends delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 w-full"
            />
            <Button variant="outline" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Unsubscribe anytime. No spam, just valuable insights.
          </p>
        </div>

        <footer className="mt-20 text-center border-t border-border pt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
            <div className="text-foreground font-semibold">© 2024 PlusFolio</div>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
          </div>
          
          <div className="mt-8 text-muted-foreground text-sm max-w-2xl mx-auto">
            PlusFolio is an AI-powered website analysis tool that helps developers and designers improve their web projects with comprehensive insights and actionable recommendations.
          </div>
        </footer>
      </div>
    </div>
  )
}
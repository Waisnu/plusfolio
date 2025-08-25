import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function CTA() {
  const footerData = {
    logo: <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
      <span className="text-black font-bold text-lg">P</span>
    </div>,
    brandName: "PlusFolio",
    socialLinks: [
      {
        icon: <Twitter className="w-4 h-4" />,
        href: "#",
        label: "Twitter"
      },
      {
        icon: <Github className="w-4 h-4" />,
        href: "#",
        label: "GitHub"
      },
      {
        icon: <Linkedin className="w-4 h-4" />,
        href: "#",
        label: "LinkedIn"
      }
    ],
    mainLinks: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#docs", label: "Documentation" },
      { href: "#blog", label: "Blog" }
    ],
    legalLinks: [
      { href: "#privacy", label: "Privacy Policy" },
      { href: "#terms", label: "Terms of Service" },
      { href: "#contact", label: "Contact" }
    ],
    copyright: {
      text: "© 2024 PlusFolio. All rights reserved.",
      license: "AI-powered website analysis tool"
    }
  }

  return (
    <div className="py-24 bg-gradient-to-t from-purple-900/10 via-blue-900/5 to-slate-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <Card className="border border-border p-12 text-center">
          <CardContent className="p-0">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Ready to transform your website?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join thousands of developers who've improved their websites with AI-powered insights. 
              Start your free analysis now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8">
              <Input
                type="url"
                placeholder="Enter my website URL"
                className="flex-1 w-full px-6 py-4 text-lg h-14"
              />
              <Button size="lg" className="w-full sm:w-auto px-10 py-4 text-lg h-14">
                Analyze my website
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Results in 60 seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer {...footerData} />
    </div>
  )
}
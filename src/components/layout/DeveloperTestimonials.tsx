import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"

export default function DeveloperTestimonials() {
  const testimonials = [
    {
      author: {
        name: "Sarah Chen",
        handle: "@sarahc_dev",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "PlusFolio saved us hours of manual website auditing. The AI insights are spot-on and actionable."
    },
    {
      author: {
        name: "Marcus Rodriguez",
        handle: "@marcus_ux",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "Finally, a tool that gives actionable design feedback instead of just generic metrics. Game changer!"
    },
    {
      author: {
        name: "Emily Watson",
        handle: "@emily_codes",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      text: "The performance insights helped us improve our Core Web Vitals by 40% in one week. Incredible!"
    },
    {
      author: {
        name: "David Kim",
        handle: "@davidk_dev",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      text: "As a freelancer, PlusFolio helps me deliver professional audits that clients actually understand and value."
    },
    {
      author: {
        name: "Lisa Zhang",
        handle: "@lisa_frontend",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      text: "The visual design analysis is incredible. It's like having a senior designer review my work instantly."
    },
    {
      author: {
        name: "Alex Thompson",
        handle: "@alexthompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "Perfect for startup MVPs. Quick validation before investor meetings saved us from major redesigns."
    }
  ]

  return (
    <TestimonialsSection
      title="Loved by developers worldwide"
      description="Trusted by thousands of developers, designers, and founders who've transformed their websites with AI-powered insights"
      testimonials={testimonials}
      className="bg-gradient-to-bl from-cyan-900/5 via-slate-900/10 to-purple-900/5"
    />
  )
}
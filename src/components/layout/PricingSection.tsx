import { Pricing } from "@/components/blocks/pricing"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "0",
      yearlyPrice: "0",
      period: "forever",
      features: [
        "3 website analyses per month",
        "Basic design feedback",
        "Performance insights",
        "Accessibility audit",
        "Mobile responsiveness check",
        "60-second analysis time"
      ],
      description: "Perfect for individual developers and small projects",
      buttonText: "Get Started",
      href: "#",
      isPopular: false,
    },
    {
      name: "Pro",
      price: "12",
      yearlyPrice: "9",
      period: "month",
      features: [
        "Unlimited website analyses",
        "Advanced AI design insights",
        "Conversion optimization tips",
        "Brand consistency analysis",
        "PDF report export",
        "Analysis history tracking",
        "Priority support",
        "API access (coming soon)"
      ],
      description: "Ideal for freelancers, agencies, and growing businesses",
      buttonText: "Start Pro Trial",
      href: "#",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "49",
      yearlyPrice: "39",
      period: "month",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom branding",
        "Advanced analytics",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations",
        "On-premise deployment option"
      ],
      description: "For teams and enterprises with advanced needs",
      buttonText: "Contact Sales",
      href: "#",
      isPopular: false,
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900/5 via-blue-900/10 to-cyan-900/5">
      <Pricing
        plans={plans}
        title="Simple, transparent pricing"
        description="Start free and scale as you grow. All plans include core analysis features with transparent pricing and no hidden fees."
      />
    </section>
  )
}
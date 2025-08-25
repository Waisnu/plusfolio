import { Pricing } from "@/components/blocks/pricing"

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
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
      name: "Plus",
      price: "4", // Set to your target $4
      yearlyPrice: "3", // Offers a 25% discount for annual payment
      period: "month",
      features: [
        "50 website analyses per month", // Changed from "Unlimited"
        "Advanced AI design insights",
        "Conversion optimization tips",
        "Brand consistency analysis",
        "PDF report export",
        "Analysis history tracking",
        "Standard support"
      ],
      description: "Ideal for freelancers and professionals",
      buttonText: "Start Plus Trial",
      href: "#",
      isPopular: true,
    },
    {
      name: "Plus Ultra",
      price: "12", 
      yearlyPrice: "10", //
      period: "month",
      features: [
        "Everything in Plus",
        "Unlimited website analyses", 
        "Invite up to 2 team members", 
        "Custom branding on PDF reports", // Great for agencies
        "Advanced analytics dashboard",
        "Priority support",
        "API access (coming soon)",
        "Custom integrations (coming soon)",
        "Custom reports (coming soon)",
      ],
      description: "For small agencies and power users",
      buttonText: "Start Ultra Trial",
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

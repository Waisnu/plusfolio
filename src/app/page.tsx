import Hero from '@/components/layout/Hero'
import DeveloperTestimonials from '@/components/layout/DeveloperTestimonials'
import { Features } from '@/components/ui/features-6'
import Developer from '@/components/layout/Developer'
import PricingSection from '@/components/layout/PricingSection'
import ModernWishlist from '@/components/layout/modern-wishlist'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DeveloperTestimonials />
      <Features />
      <Developer />
      <PricingSection />
      <ModernWishlist />
    </main>
  )
}
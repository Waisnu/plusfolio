import Hero from '@/components/layout/Hero'
import DemoSection from '@/components/layout/DemoSection'
import TrustedBy from '@/components/layout/TrustedBy'
import DeveloperTestimonials from '@/components/layout/DeveloperTestimonials'
import PlusfolioFeatures from '@/components/layout/PlusfolioFeatures'
import Developer from '@/components/layout/Developer'
import CTA from '@/components/layout/CTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DemoSection />
      <TrustedBy />
      <DeveloperTestimonials />
      <PlusfolioFeatures />
      <Developer />
      <CTA />
    </main>
  )
}
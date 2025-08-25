import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/layout/Hero'
import { OptimizedLoading } from '@/components/ui/optimized-loading'

// Dynamic imports for below-the-fold content - optimized for performance
const DeveloperTestimonials = dynamic(() => import('@/components/layout/DeveloperTestimonials'), {
  loading: () => <OptimizedLoading className="h-96 w-full" size="lg" />
})

const Features = dynamic(() => import('@/components/ui/features-6').then(mod => ({ default: mod.Features })), {
  loading: () => <OptimizedLoading className="h-96 w-full" size="lg" />
})

const Developer = dynamic(() => import('@/components/layout/Developer'), {
  loading: () => <OptimizedLoading className="h-96 w-full" size="lg" />
})

const PricingSection = dynamic(() => import('@/components/layout/PricingSection'), {
  loading: () => <OptimizedLoading className="h-64 w-full" size="lg" />
})

const ModernWishlist = dynamic(() => import('@/components/layout/modern-wishlist'), {
  loading: () => <OptimizedLoading className="h-96 w-full" size="lg" />
})

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Above the fold - load immediately */}
      <Hero />
      
      {/* Below the fold - load dynamically with suspense */}
      <Suspense fallback={<OptimizedLoading className="h-96 w-full" size="lg" />}>
        <DeveloperTestimonials />
      </Suspense>
      
      <Suspense fallback={<OptimizedLoading className="h-96 w-full" size="lg" />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<OptimizedLoading className="h-96 w-full" size="lg" />}>
        <Developer />
      </Suspense>
      
      <Suspense fallback={<OptimizedLoading className="h-64 w-full" size="lg" />}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<OptimizedLoading className="h-96 w-full" size="lg" />}>
        <ModernWishlist />
      </Suspense>
    </main>
  )
}
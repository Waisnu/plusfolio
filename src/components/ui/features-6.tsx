import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-semibold">Stop guessing what's wrong with your website</h2>
                    <p className="max-w-sm sm:ml-auto">Get AI-powered insights that reveal exactly what's hurting your conversions and how to fix it – no design experience needed.</p>
                </div>
                <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                    <div className="aspect-[88/36] relative">
                        <div className="bg-gradient-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                            className="absolute inset-0 z-10 w-full h-full object-cover rounded-2xl" 
                            alt="AI analysis dashboard showing website insights and recommendations" 
                            width={2797} 
                            height={1137} 
                        />
                        <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80" 
                            className="hidden dark:block w-full h-full object-cover rounded-2xl" 
                            alt="Dark theme AI analysis showing design recommendations" 
                            width={2797} 
                            height={1137} 
                        />
                        <img 
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                            className="dark:hidden w-full h-full object-cover rounded-2xl" 
                            alt="Light theme AI analysis dashboard with website optimization insights" 
                            width={2797} 
                            height={1137} 
                        />
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-primary" />
                            <h3 className="text-sm font-medium">60-Second Analysis</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Get comprehensive feedback faster than opening Photoshop. No waiting, no delays.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4 text-primary" />
                            <h3 className="text-sm font-medium">Expert-Level Insights</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">AI trained on thousands of high-converting websites gives you consultant-grade recommendations.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4 text-primary" />
                            <h3 className="text-sm font-medium">Privacy Protected</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Your website data stays secure. We analyze publicly accessible pages only.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-primary" />
                            <h3 className="text-sm font-medium">Actionable Fixes</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Every insight comes with specific steps you can implement immediately, no guesswork.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
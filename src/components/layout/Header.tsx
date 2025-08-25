import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between glass-morphism rounded-full px-8 py-3 shadow-lg">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-display font-bold text-white">
              PlusFolio
            </h1>
          </div>
          
          {/* Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors relative">
              Features
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors relative">
              Pricing  
            </a>
            <a href="#about" className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors relative">
              About
            </a>
          </div>

          {/* CTA Button - Right Side */}
          <div className="flex items-center">
            <Button 
              size="sm" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-full px-6 py-2 shadow-lg transition-all hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
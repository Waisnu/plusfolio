"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/ui/footer"
import { ContainedWebGLShader } from "@/components/ui/contained-web-gl-shader"
import { Github, Twitter, Linkedin, Mail, Sparkles, Rocket, Bell, Users, Star, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import confetti from "canvas-confetti"
import { validateEmail, sanitizeInput } from "@/lib/validation"
import { APP_CONFIG, SOCIAL_LINKS, MAIN_LINKS, LEGAL_LINKS, UI_CONFIG } from "@/lib/constants"
import { fadeInUp } from "@/lib/animations"
import type { FooterData, FormState } from "@/types"

export default function ModernWishlist() {
  const [email, setEmail] = useState("")
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: ""
  })
  const formRef = useRef<HTMLDivElement>(null)

  const footerData: FooterData = {
    logo: <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
      <span className="text-black font-bold text-lg">P</span>
    </div>,
    brandName: APP_CONFIG.name,
    socialLinks: SOCIAL_LINKS.map(link => ({
      icon: link.icon === 'Twitter' ? <Twitter className="w-4 h-4" /> :
            link.icon === 'Github' ? <Github className="w-4 h-4" /> :
            <Linkedin className="w-4 h-4" />,
      href: link.href,
      label: link.label
    })),
    mainLinks: MAIN_LINKS,
    legalLinks: LEGAL_LINKS,
    copyright: {
      text: `© 2024 ${APP_CONFIG.name}. All rights reserved.`,
      license: APP_CONFIG.description
    }
  }


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeInput(e.target.value)
    setEmail(value)
    if (formState.error && validateEmail(value).success) {
      setFormState(prev => ({ ...prev, error: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateEmail(email)
    if (!validation.success) {
      setFormState(prev => ({ ...prev, error: validation.error || "Invalid email" }))
      return
    }
    
    setFormState(prev => ({ ...prev, isSubmitting: true, error: "" }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setFormState(prev => ({ ...prev, isSubmitting: false, isSubmitted: true }))
    
    // Trigger confetti
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#10b981",
          "#06b6d4",
          "#8b5cf6",
          "#f59e0b",
        ],
      })
    }
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({ isSubmitting: false, isSubmitted: false, error: "" })
        setEmail("")
      }, 3000)
    } catch (error) {
      setFormState(prev => ({ ...prev, isSubmitting: false, error: "Something went wrong. Please try again." }))
    }
  }


  return (
    <>
      <div id="wishlist" className="relative py-24 overflow-hidden">
        {/* WebGL Shader Background */}
        <div className="absolute inset-0 -z-10">
          <ContainedWebGLShader />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-[5]" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
          <Card className="border border-white/20 backdrop-blur-xl bg-black/30 shadow-2xl shadow-white/10 max-w-2xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Early Access
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                  <Users className="w-3 h-3 mr-1" />
                  500+ Joined
                </Badge>
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Join the Waitlist
              </CardTitle>
              <CardDescription className="text-lg text-white/80 max-w-md mx-auto">
                Be the first to experience PlusFolio. Get exclusive early access and special benefits.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Email Form */}
              <div ref={formRef} className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className={`pl-10 h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 ${
                          formState.error ? 'border-red-400 focus:border-red-400' : ''
                        } ${formState.isSubmitted ? 'border-green-400' : ''}`}
                        disabled={formState.isSubmitting || formState.isSubmitted}
                        aria-label="Email address for waitlist"
                      />
                    </div>
                    {formState.error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm ml-1"
                      >
                        {formState.error}
                      </motion.p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold bg-white text-black hover:bg-white/90 transition-all"
                    disabled={formState.isSubmitting || formState.isSubmitted}
                  >
                    {formState.isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-black border-t-transparent rounded-full mr-2"
                        />
                        Joining Waitlist...
                      </>
                    ) : formState.isSubmitted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Welcome to the Waitlist!
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4 mr-2" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 text-sm">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Exclusive early access</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Bell className="h-4 w-4 text-blue-400" />
                    <span>Launch notifications</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Users className="h-4 w-4 text-green-400" />
                    <span>Special member perks</span>
                  </motion.div>
                </div>
                
                {/* Social Proof */}
                <motion.div 
                  className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{UI_CONFIG.maxUsers}</div>
                    <div className="text-xs text-white/60">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{UI_CONFIG.responseTime}</div>
                    <div className="text-xs text-white/60">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{UI_CONFIG.freeAccess}</div>
                    <div className="text-xs text-white/60">Free Access</div>
                  </div>
                </motion.div>
              </div>
            </CardFooter>
          </Card>
          </motion.div>
        </div>
      </div>
      
      <Footer {...footerData} />
    </>
  )
}
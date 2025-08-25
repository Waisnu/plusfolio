"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { ContainedWebGLShader } from "@/components/ui/contained-web-gl-shader"
import { Github, Twitter, Linkedin, Mail, Check, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import confetti from "canvas-confetti"

export default function CTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError && validateEmail(value)) {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setEmailError("Email is required")
      return
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    setEmailError("")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
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
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  const copyToClipboard = async () => {
    const command = 'bunx --bun shadcn@latest add "https://21st.dev/r/serjobas/raycast-animated-blue-background"'
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div id="wishlist" className="relative py-24 overflow-hidden">
      {/* WebGL Shader Background */}
      <div className="absolute inset-0 -z-10">
        <ContainedWebGLShader />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-[5]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Card className="border border-white/20 backdrop-blur-xl bg-black/30 p-8 sm:p-12 text-center shadow-2xl shadow-white/10">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                Join the Wishlist
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
                Be the first to know when PlusFolio launches. Get early access and exclusive benefits 
                for being an early supporter.
              </p>
              
              <div ref={formRef} className="max-w-2xl mx-auto mb-8">
                <motion.div 
                  className="bg-black/60 backdrop-blur-sm rounded-lg p-4 mb-6 relative group border border-white/10"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <code className="text-green-400 text-xs sm:text-sm font-mono flex-1 leading-relaxed break-all">
                      bunx --bun shadcn@latest add "https://21st.dev/r/serjobas/raycast-animated-blue-background"
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-slate-400 hover:text-white flex-shrink-0 p-2 min-w-[32px] h-8"
                      title="Copy command"
                    >
                      {copied ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="absolute inset-0 border border-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="w-full">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={handleEmailChange}
                          className={`pl-10 h-12 sm:h-14 text-sm sm:text-base ${
                            emailError ? 'border-red-500 focus:border-red-500' : ''
                          } ${isSubmitted ? 'border-green-500' : ''}`}
                          disabled={isSubmitting || isSubmitted}
                          aria-label="Email address for wishlist"
                        />
                      </div>
                      {emailError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 ml-1"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Joining...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Successfully Added!
                        </>
                      ) : (
                        'Join Wishlist'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/70 text-sm">
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Early access benefits</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>No spam, ever</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Launch notifications</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer {...footerData} />
    </div>
  )
}
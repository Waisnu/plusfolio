'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { OptimizedLoading } from '@/components/ui/optimized-loading'
import { 
  Globe, CheckCircle, Clock, AlertTriangle, RefreshCw,
  Monitor, Camera, Brain, FileText, ArrowRight, Eye, Zap
} from 'lucide-react'

interface AnalysisStep {
  id: string
  label: string
  description: string
  icon: any
  status: 'pending' | 'active' | 'completed' | 'error'
}

interface AnalysisProgress {
  id: string
  url: string
  status: 'processing' | 'completed' | 'failed'
  progress: number
  currentStep: string
  estimatedTimeRemaining: number
}

export default function AnalyzePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlParam = searchParams.get('url')
  
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [progress, setProgress] = useState<AnalysisProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  
  const analysisSteps: AnalysisStep[] = [
    {
      id: 'crawling',
      label: 'Crawling Website',
      description: 'Extracting content and structure',
      icon: Globe,
      status: 'pending'
    },
    {
      id: 'screenshot',
      label: 'Capturing Screenshot',
      description: 'High-resolution visual capture',
      icon: Camera,
      status: 'pending'
    },
    {
      id: 'analyzing',
      label: 'AI Analysis',
      description: 'Design and UX evaluation',
      icon: Brain,
      status: 'pending'
    },
    {
      id: 'generating',
      label: 'Generating Report',
      description: 'Creating insights and recommendations',
      icon: FileText,
      status: 'pending'
    }
  ]

  const [steps, setSteps] = useState(analysisSteps)

  useEffect(() => {
    if (urlParam && !analysisId && !isStarting) {
      startAnalysis(urlParam)
    }
  }, [urlParam, analysisId, isStarting])

  useEffect(() => {
    if (analysisId) {
      const interval = setInterval(checkProgress, 2000)
      return () => clearInterval(interval)
    }
  }, [analysisId])

  const startAnalysis = async (url: string) => {
    setIsStarting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to start analysis')
      }

      const data = await response.json()
      setAnalysisId(data.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start analysis')
      setIsStarting(false)
    }
  }

  const checkProgress = async () => {
    if (!analysisId) return

    try {
      const response = await fetch(`/api/analyze/${analysisId}`)
      if (!response.ok) throw new Error('Failed to check progress')

      const data: AnalysisProgress = await response.json()
      setProgress(data)

      // Update step statuses based on progress
      const updatedSteps = steps.map((step, index) => {
        const stepProgress = (index + 1) * 25
        if (data.progress >= stepProgress) {
          return { ...step, status: 'completed' as const }
        } else if (data.progress >= stepProgress - 25 && data.progress < stepProgress) {
          return { ...step, status: 'active' as const }
        }
        return { ...step, status: 'pending' as const }
      })
      setSteps(updatedSteps)

      // Handle completion
      if (data.status === 'completed') {
        setTimeout(() => {
          router.push(`/report/${analysisId}`)
        }, 1500)
      } else if (data.status === 'failed') {
        setError('Analysis failed. Please try again.')
      }
    } catch (err) {
      console.error('Progress check failed:', err)
    }
  }

  const retryAnalysis = () => {
    setError(null)
    setAnalysisId(null)
    setProgress(null)
    setIsStarting(false)
    setSteps(analysisSteps)
    if (urlParam) {
      startAnalysis(urlParam)
    }
  }

  if (!urlParam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="glass-morphism border-white/20 p-8 text-center">
          <Globe className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h1 className="text-white text-xl font-bold mb-2">No URL Provided</h1>
          <p className="text-white/60 mb-6">Please provide a URL to analyze.</p>
          <Button 
            onClick={() => router.push('/')}
            className="gradient-button"
          >
            Start New Analysis
          </Button>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="glass-morphism border-white/20 p-8 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-white text-xl font-bold mb-2">Analysis Error</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={retryAnalysis}
              className="gradient-button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Analysis
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Start Over
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        
        {/* Analysis Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analyzing Website</h1>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Globe className="w-4 h-4" />
            <span className="font-mono text-sm">{urlParam}</span>
          </div>
        </div>

        {/* Main Progress Card */}
        <Card className="glass-morphism border-white/20 mb-6">
          <CardContent className="p-8">
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 font-medium">Analysis Progress</span>
                <span className="text-white/60 text-sm">
                  {progress?.progress || 0}% complete
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progress?.progress || 0}%` }}
                />
              </div>
              {progress?.estimatedTimeRemaining && progress.estimatedTimeRemaining > 0 && (
                <p className="text-white/50 text-xs mt-2 text-center">
                  Estimated time remaining: {Math.ceil(progress.estimatedTimeRemaining / 1000)}s
                </p>
              )}
            </div>

            {/* Step Indicators */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                      ${step.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        step.status === 'active' ? 'bg-cyan-500/20 text-cyan-400' :
                        step.status === 'error' ? 'bg-red-500/20 text-red-400' :
                        'bg-white/10 text-white/40'}
                    `}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === 'error' ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Icon className={`w-5 h-5 ${step.status === 'active' ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium transition-colors duration-500 ${
                        step.status === 'completed' ? 'text-green-400' :
                        step.status === 'active' ? 'text-cyan-400' :
                        step.status === 'error' ? 'text-red-400' :
                        'text-white/60'
                      }`}>
                        {step.label}
                        {step.status === 'active' && (
                          <span className="ml-2 text-xs opacity-75">in progress...</span>
                        )}
                      </div>
                      <div className="text-white/50 text-sm">{step.description}</div>
                    </div>
                    
                    {step.status === 'active' && (
                      <OptimizedLoading size="sm" className="text-cyan-400" />
                    )}
                  </div>
                )
              })}
            </div>

          </CardContent>
        </Card>

        {/* Trust Signals & Information */}
        <Card className="glass-morphism border-white/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-white font-semibold mb-4">While You Wait</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-white/60">Visual AI Analysis</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Monitor className="w-5 h-5 text-green-400" />
                <span className="text-white/60">Technical SEO</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white/60">Performance Audit</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs">
                Analysis typically completes in 30-60 seconds
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completion Success State */}
        {progress?.status === 'completed' && (
          <Card className="glass-morphism border-green-500/20 mt-4">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Analysis Complete!</h3>
              <p className="text-white/60 text-sm mb-4">
                Redirecting to your report...
              </p>
              <OptimizedLoading size="sm" className="text-green-400" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
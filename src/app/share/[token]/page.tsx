'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OptimizedLoading } from '@/components/ui/optimized-loading'
import { 
  Globe, Award, TrendingUp, Lightbulb, CheckCircle, AlertTriangle,
  Monitor, Zap, Search, Shield, ExternalLink, Calendar, Eye
} from 'lucide-react'
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

interface PublicReport {
  id: string
  url: string
  final_url: string
  domain: string
  title: string
  description: string
  analysis_mode: string
  clarity_score: number
  score_breakdown: {
    design: number
    performance: number
    seo: number
    accessibility: number
    content: number
  }
  insights: {
    strengths: string[]
    improvements: string[]
    technical_issues: string[]
    design_feedback: string[]
  }
  recommendations: Array<{
    category: string
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
    impact: string
  }>
  processing_status: string
  view_count: number
  created_at: string
}

export default function SharePage() {
  const params = useParams()
  const [report, setReport] = useState<PublicReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.token) {
      fetchPublicReport(params.token as string)
    }
  }, [params.token])

  const fetchPublicReport = async (token: string) => {
    try {
      const response = await fetch(`/api/share/${token}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Report not found or no longer public')
        }
        if (response.status === 410) {
          throw new Error('This shared report has expired')
        }
        throw new Error('Failed to load report')
      }
      const data = await response.json()
      setReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreGradient = (score: number): string => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Exceptional'
    if (score >= 80) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Fair'
    return 'Needs Work'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="glass-morphism border-white/20 p-8">
          <OptimizedLoading size="lg" />
          <p className="text-white/60 text-center mt-4">Loading report...</p>
        </Card>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 text-center">
          <CardContent className="p-8">
            <Globe className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h1 className="text-white text-xl font-bold mb-2">Report Not Available</h1>
            <p className="text-white/60 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="gradient-button"
            >
              Visit PlusFolio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const scoreData = [{
    name: 'Score',
    value: report.clarity_score,
    fill: getScoreColor(report.clarity_score)
  }]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Professional Header - Stakeholder Ready */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-white font-semibold">PlusFolio Analysis Report</h1>
                <p className="text-white/60 text-sm">AI-Powered Website Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Eye className="w-4 h-4" />
                  {report.view_count} views
                </div>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(report.created_at).toLocaleDateString()}
                </div>
              </div>
              <Button 
                onClick={() => window.open('/', '_blank')}
                className="gradient-button"
              >
                Create Your Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Report Card - Optimized for Sharing */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Card className="glass-morphism border-white/20 mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-white/60">{report.url}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">
                {report.title || 'Website Analysis'}
              </h1>
              
              {report.description && (
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  {report.description}
                </p>
              )}
            </div>

            {/* Hero Score Display */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-56 h-56 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="85%"
                    data={scoreData}
                    startAngle={90}
                    endAngle={450}
                  >
                    <RadialBar 
                      dataKey="value" 
                      fill={getScoreColor(report.clarity_score)}
                      strokeWidth={0}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-5xl font-bold`} style={{ color: getScoreColor(report.clarity_score) }}>
                      {report.clarity_score}
                    </div>
                    <div className="text-white/60 text-lg font-medium">PlusFolio Score</div>
                  </div>
                </div>
              </div>

              <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${getScoreGradient(report.clarity_score)} text-white text-lg font-semibold`}>
                {getScoreLabel(report.clarity_score)} Website
              </div>
            </div>

            {/* Score Breakdown Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(report.score_breakdown || {}).map(([category, score]) => (
                <div key={category} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-12 h-12 mx-auto mb-3 p-2 rounded-lg" style={{ backgroundColor: `${getScoreColor(score)}20` }}>
                    {category === 'design' && <Monitor className="w-8 h-8" style={{ color: getScoreColor(score) }} />}
                    {category === 'performance' && <Zap className="w-8 h-8" style={{ color: getScoreColor(score) }} />}
                    {category === 'seo' && <Search className="w-8 h-8" style={{ color: getScoreColor(score) }} />}
                    {category === 'accessibility' && <Shield className="w-8 h-8" style={{ color: getScoreColor(score) }} />}
                    {category === 'content' && <Award className="w-8 h-8" style={{ color: getScoreColor(score) }} />}
                  </div>
                  <div className="font-bold text-2xl text-white mb-1">{score}</div>
                  <div className="text-white/60 text-sm capitalize">{category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Insights Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Key Strengths */}
          {report.insights?.strengths && report.insights.strengths.length > 0 && (
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Key Strengths
                </CardTitle>
                <CardDescription className="text-white/60">
                  What makes this website effective
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.insights.strengths.slice(0, 5).map((strength, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <p className="text-white/80">{strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Priority Improvements */}
          {report.recommendations && report.recommendations.length > 0 && (
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Priority Improvements
                </CardTitle>
                <CardDescription className="text-white/60">
                  Top recommendations for enhancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.recommendations
                    .filter(rec => rec.priority === 'high')
                    .slice(0, 5)
                    .map((rec, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white/80 font-medium">{rec.title}</p>
                        <p className="text-white/60 text-sm">{rec.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Professional Footer */}
        <Card className="glass-morphism border-white/20">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Get Your Own AI Website Analysis
              </h2>
              <p className="text-white/70 mb-6">
                This report was generated by PlusFolio's AI analysis engine. 
                Get comprehensive insights for your own website in under 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('/', '_blank')}
                  className="gradient-button"
                  size="lg"
                >
                  Analyze My Website
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('/pricing', '_blank')}
                  className="border-white/20 text-white hover:bg-white/10"
                  size="lg"
                >
                  View Pricing
                </Button>
              </div>
              
              {/* Trust Signals */}
              <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  60-second analysis
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Professional grade
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  AI-powered insights
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Powered by Attribution */}
        <div className="text-center py-8">
          <p className="text-white/40 text-sm">
            Powered by{' '}
            <Button 
              variant="link" 
              onClick={() => window.open('/', '_blank')}
              className="text-cyan-400 hover:text-cyan-300 p-0 h-auto font-medium"
            >
              PlusFolio AI
            </Button>
            {' '}• The AI design consultant for developers
          </p>
        </div>
      </div>
    </div>
  )
}
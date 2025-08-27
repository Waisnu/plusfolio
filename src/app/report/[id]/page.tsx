'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OptimizedLoading } from '@/components/ui/optimized-loading'
import { ShaderBackground } from '@/components/ui/shader-background'
import { 
  ArrowLeft, Share2, Download, Globe, Clock, Award, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, Lightbulb, Zap, Shield, Search, Smartphone, Monitor
} from 'lucide-react'
import { ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'

interface Report {
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
  processing_status: 'processing' | 'completed' | 'failed'
  is_public: boolean
  view_count: number
  created_at: string
}

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'recommendations'>('overview')

  useEffect(() => {
    if (params.id) {
      fetchReport(params.id as string)
    }
  }, [params.id])

  const fetchReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch report')
      }
      const data = await response.json()
      setReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const shareReport = async () => {
    if (report) {
      await navigator.clipboard.writeText(`${window.location.origin}/share/${report.id}`)
      // Could add a toast notification here
    }
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981' // green-500
    if (score >= 60) return '#f59e0b' // yellow-500  
    return '#ef4444' // red-500
  }

  const getScoreGradient = (score: number): string => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OptimizedLoading size="lg" />
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-destructive mb-4">{error || 'Report not found'}</p>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const scoreData = Object.entries(report.score_breakdown || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
    fill: getScoreColor(value)
  }))

  const overallScoreData = [{
    name: 'Score',
    value: report.clarity_score,
    fill: getScoreColor(report.clarity_score)
  }]

  return (
    <ShaderBackground>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-black/5">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <div className="h-4 w-px bg-white/20" />
            <div>
              <h1 className="text-white font-medium">Analysis Report</h1>
              <p className="text-white/60 text-sm">{report.domain}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-white border-white/20">
              {report.analysis_mode}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={shareReport}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </nav>

        {/* Report Header - Hero Score */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <Card className="glass-morphism border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                
                {/* Left: Report Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span className="text-white/60 text-sm">{report.url}</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {report.title || 'Website Analysis'}
                  </h1>
                  
                  {report.description && (
                    <p className="text-white/70 mb-6">{report.description}</p>
                  )}

                  <div className="flex items-center gap-6 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(report.created_at).toLocaleDateString()}
                    </div>
                    {report.is_public && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {report.view_count} views
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Hero Score Visualization */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="90%"
                        data={overallScoreData}
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
                    
                    {/* Center Score Display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(report.clarity_score).replace('#', 'text-')}`}>
                          {report.clarity_score}
                        </div>
                        <div className="text-white/60 text-sm">PlusFolio Score</div>
                      </div>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getScoreGradient(report.clarity_score)} text-white text-sm font-medium`}>
                    {report.clarity_score >= 80 ? 'Professional Grade' : 
                     report.clarity_score >= 60 ? 'Good Foundation' : 'Needs Improvement'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6">
            {[
              { key: 'overview', label: 'Overview', icon: Award },
              { key: 'insights', label: 'Insights', icon: Lightbulb },
              { key: 'recommendations', label: 'Action Items', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeTab === key ? 'default' : 'ghost'}
                onClick={() => setActiveTab(key as any)}
                className={activeTab === key ? 
                  'gradient-button' : 
                  'text-white/60 hover:text-white hover:bg-white/10'
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Score Breakdown */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Score Breakdown</CardTitle>
                  <CardDescription className="text-white/60">
                    Performance across key categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scoreData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-white/80">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-white/10 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.fill
                              }}
                            />
                          </div>
                          <span className="text-white font-medium w-8 text-right">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Monitor className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-bold text-lg">
                        {report.score_breakdown?.design || 0}
                      </div>
                      <div className="text-white/60 text-sm">Visual Design</div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-white font-bold text-lg">
                        {report.score_breakdown?.performance || 0}
                      </div>
                      <div className="text-white/60 text-sm">Performance</div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Search className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-bold text-lg">
                        {report.score_breakdown?.seo || 0}
                      </div>
                      <div className="text-white/60 text-sm">SEO</div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-bold text-lg">
                        {report.score_breakdown?.accessibility || 0}
                      </div>
                      <div className="text-white/60 text-sm">Accessibility</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Strengths */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    What's Working Well
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.insights?.strengths?.map((strength, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white/80 text-sm">{strength}</p>
                      </div>
                    )) || <p className="text-white/60 text-sm">No specific strengths identified</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.insights?.improvements?.map((improvement, index) => (
                      <div key={index} className="flex gap-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white/80 text-sm">{improvement}</p>
                      </div>
                    )) || <p className="text-white/60 text-sm">No specific improvements identified</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Issues */}
              {report.insights?.technical_issues && report.insights.technical_issues.length > 0 && (
                <Card className="glass-morphism border-white/20 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-400" />
                      Technical Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.insights.technical_issues.map((issue, index) => (
                        <div key={index} className="flex gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-white/80 text-sm">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {['high', 'medium', 'low'].map((priority) => {
                const priorityRecs = report.recommendations?.filter(rec => rec.priority === priority) || []
                if (priorityRecs.length === 0) return null

                return (
                  <Card key={priority} className="glass-morphism border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Actions
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        {priority === 'high' ? 'Critical improvements with high impact' :
                         priority === 'medium' ? 'Important enhancements for better performance' :
                         'Nice-to-have improvements for polish'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {priorityRecs.map((rec, index) => (
                          <div key={index} className="p-4 border border-white/10 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-white font-medium">{rec.title}</h4>
                              <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                                {rec.category}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm mb-3">{rec.description}</p>
                            {rec.impact && (
                              <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-cyan-400" />
                                <p className="text-cyan-200 text-xs font-medium">
                                  Impact: {rec.impact}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Report Actions */}
          <Card className="glass-morphism border-white/20 mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">Share This Report</h3>
                  <p className="text-white/60 text-sm">
                    Professional presentation ready for clients, recruiters, or stakeholders
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                  <Button 
                    onClick={shareReport}
                    className="gradient-button"
                  >
                    <Share2 className="w-4 h-4" />
                    Copy Share Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ShaderBackground>
  )
}
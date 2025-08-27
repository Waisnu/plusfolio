'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OptimizedLoading } from '@/components/ui/optimized-loading'
import { ShaderBackground } from '@/components/ui/shader-background'
import { Github, Plus, BarChart3, Share2, Clock, Star, GitFork, ExternalLink, Globe, Users, TrendingUp, Award, Target } from 'lucide-react'
import { ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts'

interface DashboardData {
  user: {
    id: string
    email: string
    name: string
    avatar_url?: string
    plan: 'free' | 'pro' | 'enterprise'
    total_reports_generated: number
    reports_remaining_this_month: number
  }
  recent_reports: Array<{
    id: string
    url: string
    title: string
    clarity_score: number
    processing_status: 'processing' | 'completed' | 'failed'
    is_public: boolean
    view_count: number
    created_at: string
  }>
  connected_accounts: Array<{
    provider: string
    connected_at: string
  }>
  repositories: Array<{
    id: string
    name: string
    description: string
    language: string
    stargazers_count: number
    forks_count: number
    html_url: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [connectingGitHub, setConnectingGitHub] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
      return
    }

    if (status === 'authenticated' && session?.user) {
      fetchDashboardData()
    }
  }, [status, session, router])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/user/dashboard')
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      const data = await response.json()
      setDashboardData(data)
      
      // Show onboarding if new user with no GitHub connection
      if (!data.connected_accounts?.find((acc: any) => acc.provider === 'github') && 
          data.repositories.length === 0) {
        setShowOnboarding(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const connectGitHub = async () => {
    setConnectingGitHub(true)
    // Redirect to GitHub OAuth - this would be handled by your auth provider
    window.location.href = `/api/auth/signin/github?callbackUrl=/dashboard`
  }

  const analyzeUrl = () => {
    router.push('/analyze')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OptimizedLoading size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6">
            <p className="text-destructive text-center">Error loading dashboard: {error}</p>
            <Button onClick={fetchDashboardData} className="w-full mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ShaderBackground>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-black/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">P</span>
            </div>
            <span className="text-white font-semibold">PlusFolio</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-white border-white/20">
              {dashboardData?.user.plan} plan
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/api/auth/signout')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </nav>

        {/* Onboarding Modal */}
        {showOnboarding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Card className="max-w-lg w-full mx-4 glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">Welcome to PlusFolio! 🎉</CardTitle>
                <CardDescription className="text-white/70">
                  Let's get you set up with everything you need to start analyzing your websites.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-white/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Github className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">Connect GitHub</span>
                    </div>
                    <p className="text-white/70 text-sm mb-4">
                      Import your repositories to automatically analyze your portfolio projects
                    </p>
                    <Button 
                      onClick={connectGitHub}
                      disabled={connectingGitHub}
                      className="w-full"
                    >
                      {connectingGitHub ? 'Connecting...' : 'Connect GitHub'}
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setShowOnboarding(false)}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Skip for now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Dashboard */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {dashboardData?.user.name?.split(' ')[0] || 'Developer'}
            </h1>
            <p className="text-white/70">
              Analyze websites, track improvements, and share professional reports
            </p>
          </div>

          {/* Hero Performance Score - Most Important Metric */}
          {dashboardData?.recent_reports && dashboardData.recent_reports.length > 0 && (
            <Card className="glass-morphism border-white/20 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Award className="w-6 h-6 text-yellow-400" />
                      Latest Score
                    </h2>
                    <p className="text-white/60 mb-4">
                      {dashboardData.recent_reports[0]?.title || 'Latest Analysis'}
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className={`text-4xl font-bold ${getScoreColor(dashboardData.recent_reports[0]?.clarity_score || 0)}`}>
                        {dashboardData.recent_reports[0]?.clarity_score || 0}
                      </span>
                      <span className="text-white/60 text-lg">/100</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      {getScoreDescription(dashboardData.recent_reports[0]?.clarity_score || 0)}
                    </p>
                  </div>
                  
                  <div className="w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="90%"
                        data={[{
                          name: 'Score',
                          value: dashboardData.recent_reports[0]?.clarity_score || 0,
                          fill: getScoreColor(dashboardData.recent_reports[0]?.clarity_score || 0)
                        }]}
                        startAngle={90}
                        endAngle={450}
                      >
                        <RadialBar dataKey="value" fill="#8884d8" />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => router.push(`/report/${dashboardData.recent_reports[0]?.id}`)}
                    className="gradient-button"
                  >
                    View Full Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats - Limited to 4 cards for optimal UX */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass-morphism border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-400/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      {dashboardData?.user.total_reports_generated || 0}
                    </p>
                    <p className="text-white/60 text-xs">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-400/20 rounded-lg">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      {dashboardData?.user.plan === 'free' 
                        ? dashboardData?.user.reports_remaining_this_month || 0 
                        : '∞'
                      }
                    </p>
                    <p className="text-white/60 text-xs">
                      {dashboardData?.user.plan === 'free' ? 'Remaining' : 'Unlimited'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-400/20 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      {dashboardData?.recent_reports.filter(r => r.is_public).length || 0}
                    </p>
                    <p className="text-white/60 text-xs">Public</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-400/20 rounded-lg">
                    <Github className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      {dashboardData?.repositories.length || 0}
                    </p>
                    <p className="text-white/60 text-xs">Repos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={analyzeUrl} className="w-full gradient-button">
                    <Plus className="w-4 h-4" />
                    Analyze New Website
                  </Button>
                  
                  {!dashboardData?.connected_accounts?.find(acc => acc.provider === 'github') && (
                    <Button 
                      onClick={connectGitHub}
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Github className="w-4 h-4" />
                      Connect GitHub
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* GitHub Repositories */}
              {dashboardData?.repositories && dashboardData.repositories.length > 0 && (
                <Card className="glass-morphism border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      Your Repositories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.repositories.slice(0, 5).map((repo) => (
                        <div key={repo.id} className="p-3 border border-white/10 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm">{repo.name}</h4>
                              {repo.description && (
                                <p className="text-white/60 text-xs mt-1">{repo.description}</p>
                              )}
                              <div className="flex items-center gap-4 mt-2">
                                {repo.language && (
                                  <Badge variant="outline" className="text-xs border-white/20 text-white">
                                    {repo.language}
                                  </Badge>
                                )}
                                <div className="flex items-center gap-1 text-white/60 text-xs">
                                  <Star className="w-3 h-3" />
                                  {repo.stargazers_count}
                                </div>
                                <div className="flex items-center gap-1 text-white/60 text-xs">
                                  <GitFork className="w-3 h-3" />
                                  {repo.forks_count}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(repo.html_url, '_blank')}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Reports */}
            <div className="lg:col-span-2">
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Recent Reports</CardTitle>
                      <CardDescription className="text-white/60">
                        Your latest website analyses and insights
                      </CardDescription>
                    </div>
                    <Button onClick={analyzeUrl} className="gradient-button">
                      <Plus className="w-4 h-4" />
                      New Analysis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardData?.recent_reports && dashboardData.recent_reports.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.recent_reports.map((report) => (
                        <div key={report.id} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{report.title || 'Untitled Report'}</h4>
                              <p className="text-white/60 text-sm">{report.url}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {report.processing_status === 'completed' && (
                                <div className={`text-right ${getScoreColor(report.clarity_score)}`}>
                                  <p className="font-bold text-lg">{report.clarity_score}/100</p>
                                  <p className="text-xs text-white/60">Score</p>
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => router.push(`/report/${report.id}`)}
                                className="text-white/60 hover:text-white hover:bg-white/10"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Badge 
                                variant={report.processing_status === 'completed' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {report.processing_status}
                              </Badge>
                              {report.is_public && (
                                <div className="flex items-center gap-1 text-white/60 text-xs">
                                  <Globe className="w-3 h-3" />
                                  <Users className="w-3 h-3" />
                                  {report.view_count} views
                                </div>
                              )}
                            </div>
                            <span className="text-white/60 text-xs">
                              {formatDate(report.created_at)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">No reports yet</h3>
                      <p className="text-white/60 text-sm mb-6">
                        Analyze your first website to get started with AI-powered insights
                      </p>
                      <Button onClick={analyzeUrl} className="gradient-button">
                        Create Your First Report
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Usage Stats */}
          {dashboardData?.user.plan === 'free' && (
            <Card className="glass-morphism border-white/20 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium mb-1">Monthly Usage</h3>
                    <p className="text-white/60 text-sm">
                      {dashboardData.user.reports_remaining_this_month} of 3 reports remaining this month
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      View Pricing
                    </Button>
                    <Button className="gradient-button">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.max(0, ((3 - dashboardData.user.reports_remaining_this_month) / 3) * 100)}%` 
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ShaderBackground>
  )
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  return 'text-red-400'
}

function getScoreDescription(score: number): string {
  if (score >= 90) return 'Exceptional - Professional grade'
  if (score >= 80) return 'Excellent - Minor improvements needed'
  if (score >= 70) return 'Good - Some optimization recommended'
  if (score >= 60) return 'Fair - Multiple improvements needed'
  return 'Needs work - Significant improvements required'
}
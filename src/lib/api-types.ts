// API Types for PlusFolio Phase 1
// Based on technical architecture and ERD documentation

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_tier: 'starter' | 'plus' | 'plus-ultra'
  subscription_status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'inactive' 
  monthly_report_count: number
  created_at: string
  preferences?: Record<string, any>
}

export interface UserAuthentication {
  id: string
  user_id: string
  provider: 'google' | 'github' | 'email'
  provider_id: string
  created_at: string
}

export interface UserConnection {
  id: string
  user_id: string
  provider: 'github'
  access_token: string
  refresh_token?: string
  scopes: string[]
  created_at: string
  updated_at: string
}

export interface Repository {
  id: string
  user_id: string
  github_id: number
  name: string
  full_name: string
  description?: string
  language?: string
  stargazers_count: number
  forks_count: number
  html_url: string
  imported_at: string
  last_synced_at?: string
}

export interface Report {
  id: string
  user_id?: string
  url: string
  final_url?: string
  domain: string
  title?: string
  description?: string
  analysis_mode: 'comprehensive' | 'recruiter' | 'peer' | 'client' | 'quick'
  clarity_score: number
  score_breakdown: {
    design: number
    ux: number
    technical: number
    accessibility: number
  }
  processing_time_ms: number
  processing_status: 'processing' | 'completed' | 'failed' | 'partial'
  report_data: ReportData
  ai_model_used: string
  ai_cost_usd: number
  shareable_token?: string
  is_public: boolean
  view_count: number
  crawl_service: 'firecrawl' | 'crawl4ai'
  screenshot_service: 'capturekit' | 'screenshotone'
  created_at: string
  updated_at: string
}

export interface ReportData {
  metadata: {
    url: string
    timestamp: string
    processingTime: number
    analysisMode: string
  }
  clarityScore: {
    overall: number
    breakdown: {
      design: number
      ux: number
      technical: number
      accessibility: number
    }
  }
  sections: ReportSection[]
  actionableInsights: Insight[]
  prioritizedRecommendations: Recommendation[]
}

export interface ReportSection {
  category: string
  score: number
  findings: Finding[]
  visualAnnotations?: AnnotatedScreenshot[]
}

export interface Finding {
  type: 'positive' | 'negative' | 'neutral'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: string
}

export interface Insight {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  effort: 'high' | 'medium' | 'low'
  category: string
}

export interface Recommendation {
  id: string
  title: string
  description: string
  priority: number
  category: string
  implementation_steps: string[]
}

export interface AnnotatedScreenshot {
  url: string
  annotations: Array<{
    x: number
    y: number
    width: number
    height: number
    type: string
    description: string
  }>
}

export interface ApiUsage {
  id: string
  user_id?: string
  report_id?: string
  service_name: 'firecrawl' | 'capturekit' | 'screenshotone' | 'gemini'
  endpoint?: string
  method: string
  tokens_used?: number
  processing_time_ms: number
  success: boolean
  cost_usd?: number
  created_at: string
}

// API Request/Response Types
export interface AnalysisRequest {
  url: string
  analysis_mode?: 'comprehensive' | 'recruiter' | 'peer' | 'client' | 'quick'
  user_id?: string
}

export interface AnalysisResponse {
  id: string
  status: 'processing' | 'completed' | 'failed'
  report?: Report
  error?: string
  estimated_completion_time?: number
}

export interface DashboardData {
  user: User
  recent_reports: Report[]
  report_count: number
  connected_accounts: UserConnection[]
  repositories: Repository[]
  usage_stats: {
    monthly_reports: number
    monthly_limit: number
    total_reports: number
  }
}

// External API Response Types
export interface FirecrawlResponse {
  success: boolean
  data: {
    markdown: string
    html: string
    metadata: {
      title: string
      description: string
      language: string
      sourceURL: string
      [key: string]: any
    }
    screenshot?: string
  }
  error?: string
  processingTime?: number
}

export interface CaptureKitResponse {
  success: boolean
  url?: string
  error?: string
  processingTime?: number
}

export interface GeminiAnalysisResponse {
  score: number
  analysis: {
    design: {
      score: number
      findings: string[]
      recommendations: string[]
    }
    ux: {
      score: number
      findings: string[]
      recommendations: string[]
    }
    technical: {
      score: number
      findings: string[]
      recommendations: string[]
    }
    accessibility: {
      score: number
      findings: string[]
      recommendations: string[]
    }
  }
  insights: Insight[]
  recommendations: Recommendation[]
  error?: string
  processingTime?: number
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

// Error Types
export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface ValidationError {
  field: string
  message: string
}
// External API clients for PlusFolio Phase 1
// Integrates with Firecrawl, CaptureKit, Gemini, and GitHub APIs

import { FirecrawlResponse, CaptureKitResponse, GeminiAnalysisResponse, GitHubRepository } from './api-types'

// Environment variables from docs/envs.txt
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-3f4efb0da9dc4ccb8bbb7819aab401a0'
const CAPTUREKIT_API_KEY = process.env.CAPTUREKIT_API_KEY || 'p9jo0JhjBnrGaF'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDzm7-en7_oFzl38kNDwA-WOk_utmmjQuI'

// Firecrawl API Client
export class FirecrawlClient {
  private apiKey: string
  private baseUrl = 'https://api.firecrawl.dev/v0'

  constructor(apiKey = FIRECRAWL_API_KEY) {
    this.apiKey = apiKey
  }

  async scrapeUrl(url: string, options?: {
    includeScreenshot?: boolean
    includeMetadata?: boolean
    formats?: ('markdown' | 'html')[]
  }): Promise<FirecrawlResponse> {
    const startTime = Date.now()
    
    try {
      const response = await fetch(`${this.baseUrl}/scrape`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          formats: options?.formats || ['markdown', 'html'],
          screenshot: options?.includeScreenshot || true,
          metadata: options?.includeMetadata || true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const processingTime = Date.now() - startTime

      return {
        success: data.success || true,
        data: {
          markdown: data.data?.markdown || '',
          html: data.data?.html || '',
          metadata: {
            title: data.data?.metadata?.title || '',
            description: data.data?.metadata?.description || '',
            language: data.data?.metadata?.language || 'en',
            sourceURL: data.data?.metadata?.sourceURL || url,
            ...data.data?.metadata
          },
          screenshot: data.data?.screenshot
        },
        processingTime
      }
    } catch (error) {
      return {
        success: false,
        data: {
          markdown: '',
          html: '',
          metadata: {
            title: '',
            description: '',
            language: 'en',
            sourceURL: url
          }
        },
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime
      }
    }
  }
}

// CaptureKit API Client
export class CaptureKitClient {
  private apiKey: string
  private baseUrl = 'https://api.capturekit.dev/v1'

  constructor(apiKey = CAPTUREKIT_API_KEY) {
    this.apiKey = apiKey
  }

  async takeScreenshot(url: string, options?: {
    width?: number
    height?: number
    fullPage?: boolean
    format?: 'png' | 'jpeg' | 'webp'
    quality?: number
  }): Promise<CaptureKitResponse> {
    const startTime = Date.now()
    
    try {
      const response = await fetch(`${this.baseUrl}/screenshot`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          viewport: {
            width: options?.width || 1920,
            height: options?.height || 1080
          },
          fullPage: options?.fullPage ?? true,
          format: options?.format || 'webp',
          quality: options?.quality || 85,
        }),
      })

      if (!response.ok) {
        throw new Error(`CaptureKit API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      return {
        success: true,
        url: data.url || data.screenshot_url,
        processingTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime
      }
    }
  }
}

// Gemini AI Client
export class GeminiClient {
  private apiKey: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta'

  constructor(apiKey = GEMINI_API_KEY) {
    this.apiKey = apiKey
  }

  async analyzeWebsite(
    content: { html: string; screenshot?: string; metadata: any },
    analysisMode: 'comprehensive' | 'recruiter' | 'peer' | 'client' | 'quick' = 'comprehensive'
  ): Promise<GeminiAnalysisResponse> {
    const startTime = Date.now()
    
    try {
      const systemPrompt = this.getAnalysisPrompt(analysisMode)
      
      const parts: any[] = [
        {
          text: `${systemPrompt}\n\nWebsite Content:\n${content.html}\n\nMetadata: ${JSON.stringify(content.metadata)}`
        }
      ]

      // Add screenshot if available
      if (content.screenshot) {
        parts.push({
          inline_data: {
            mime_type: 'image/webp',
            data: content.screenshot
          }
        })
      }

      const response = await fetch(`${this.baseUrl}/models/gemini-2.5-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object',
              properties: {
                score: { type: 'number', minimum: 0, maximum: 100 },
                analysis: {
                  type: 'object',
                  properties: {
                    design: {
                      type: 'object',
                      properties: {
                        score: { type: 'number' },
                        findings: { type: 'array', items: { type: 'string' } },
                        recommendations: { type: 'array', items: { type: 'string' } }
                      }
                    },
                    ux: {
                      type: 'object',
                      properties: {
                        score: { type: 'number' },
                        findings: { type: 'array', items: { type: 'string' } },
                        recommendations: { type: 'array', items: { type: 'string' } }
                      }
                    },
                    technical: {
                      type: 'object',
                      properties: {
                        score: { type: 'number' },
                        findings: { type: 'array', items: { type: 'string' } },
                        recommendations: { type: 'array', items: { type: 'string' } }
                      }
                    },
                    accessibility: {
                      type: 'object',
                      properties: {
                        score: { type: 'number' },
                        findings: { type: 'array', items: { type: 'string' } },
                        recommendations: { type: 'array', items: { type: 'string' } }
                      }
                    }
                  }
                },
                insights: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      impact: { type: 'string', enum: ['high', 'medium', 'low'] },
                      effort: { type: 'string', enum: ['high', 'medium', 'low'] },
                      category: { type: 'string' }
                    }
                  }
                },
                recommendations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      priority: { type: 'number' },
                      category: { type: 'string' },
                      implementation_steps: { type: 'array', items: { type: 'string' } }
                    }
                  }
                }
              }
            }
          }
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const analysisResult = JSON.parse(data.candidates[0]?.content?.parts[0]?.text || '{}')

      return {
        ...analysisResult,
        processingTime: Date.now() - startTime,
        tokensUsed: data.usageMetadata?.totalTokenCount || 0
      }
    } catch (error) {
      // Fallback analysis for errors
      return {
        score: 50,
        analysis: {
          design: { score: 50, findings: [], recommendations: [] },
          ux: { score: 50, findings: [], recommendations: [] },
          technical: { score: 50, findings: [], recommendations: [] },
          accessibility: { score: 50, findings: [], recommendations: [] }
        },
        insights: [],
        recommendations: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime
      }
    }
  }

  private getAnalysisPrompt(mode: string): string {
    const basePrompt = `You are an expert website analyst combining design, UX, technical, and accessibility expertise. Analyze the provided website content and screenshot to generate a comprehensive report.`

    const modeSpecificPrompts = {
      comprehensive: `${basePrompt} Provide detailed analysis across all categories suitable for developers and designers.`,
      recruiter: `${basePrompt} Focus on professional presentation, clarity, and how well the site represents the person/company to potential employers.`,
      peer: `${basePrompt} Analyze from a fellow developer's perspective, focusing on technical implementation and best practices.`,
      client: `${basePrompt} Evaluate from a client/business perspective, focusing on conversion potential and user experience.`,
      quick: `${basePrompt} Provide a rapid overview with the most critical issues and improvements.`
    }

    return modeSpecificPrompts[mode as keyof typeof modeSpecificPrompts] || modeSpecificPrompts.comprehensive + `

Analyze the website across four key dimensions:

1. **Design (25%)**: Visual hierarchy, typography, color scheme, layout, branding consistency
2. **UX (35%)**: User experience, navigation, accessibility, mobile responsiveness, conversion optimization  
3. **Technical (25%)**: Performance, SEO, code quality, security, loading speed
4. **Accessibility (15%)**: WCAG compliance, semantic markup, keyboard navigation, screen reader compatibility

For each dimension:
- Assign a score from 0-100
- Identify key findings (both positive and negative)
- Provide specific, actionable recommendations

Generate insights focusing on high-impact improvements and prioritized recommendations with implementation steps.`
  }
}

// GitHub API Client
export class GitHubClient {
  private accessToken: string
  private baseUrl = 'https://api.github.com'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getUserRepositories(username?: string): Promise<GitHubRepository[]> {
    try {
      const url = username 
        ? `${this.baseUrl}/users/${username}/repos` 
        : `${this.baseUrl}/user/repos`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      const repos = await response.json()
      return repos.filter((repo: any) => !repo.fork) // Filter out forks
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      return []
    }
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepository | null> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching GitHub repository:', error)
      return null
    }
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching GitHub user info:', error)
      return null
    }
  }
}

// API Client Factory
export const apiClients = {
  firecrawl: new FirecrawlClient(),
  capturekit: new CaptureKitClient(),
  gemini: new GeminiClient(),
  
  // GitHub client requires access token, so it's created per-request
  createGitHubClient: (accessToken: string) => new GitHubClient(accessToken)
}

// Rate limiting and error handling utilities
export class ApiRateLimiter {
  private requests: { [service: string]: number[] } = {}
  private limits: { [service: string]: { requests: number, window: number } } = {
    firecrawl: { requests: 50, window: 3600000 }, // 50 per hour
    capturekit: { requests: 100, window: 3600000 }, // 100 per hour
    gemini: { requests: 60, window: 60000 }, // 60 per minute
    github: { requests: 5000, window: 3600000 } // 5000 per hour
  }

  canMakeRequest(service: string): boolean {
    const now = Date.now()
    const limit = this.limits[service]
    
    if (!limit) return true
    
    if (!this.requests[service]) {
      this.requests[service] = []
    }
    
    // Remove requests outside the window
    this.requests[service] = this.requests[service].filter(
      timestamp => now - timestamp < limit.window
    )
    
    return this.requests[service].length < limit.requests
  }

  recordRequest(service: string): void {
    if (!this.requests[service]) {
      this.requests[service] = []
    }
    this.requests[service].push(Date.now())
  }
}

export const rateLimiter = new ApiRateLimiter()
// Analysis Orchestrator Service for PlusFolio Phase 1
// Coordinates website analysis workflow using external APIs

import { v4 as uuidv4 } from 'uuid'
import { URL } from 'url'
import { apiClients, rateLimiter } from './external-apis'
import { db, supabase } from './supabase'
import { AnalysisRequest, AnalysisResponse, Report, ReportData, ApiUsage } from './api-types'

export class AnalysisOrchestrator {
  private generateShareableToken(): string {
    return uuidv4().replace(/-/g, '').substring(0, 16)
  }

  private extractDomain(url: string): string {
    try {
      const parsedUrl = new URL(url)
      return parsedUrl.hostname
    } catch (error) {
      return url
    }
  }

  private validateUrl(url: string): { isValid: boolean; error?: string } {
    try {
      const parsedUrl = new URL(url)
      
      // Check if it's HTTP or HTTPS
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' }
      }
      
      // Reject localhost and local IPs for security
      const hostname = parsedUrl.hostname.toLowerCase()
      if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
        return { isValid: false, error: 'Local URLs are not allowed' }
      }
      
      // URL length check
      if (url.length > 2048) {
        return { isValid: false, error: 'URL is too long (max 2048 characters)' }
      }
      
      return { isValid: true }
    } catch (error) {
      return { isValid: false, error: 'Invalid URL format' }
    }
  }

  private async checkUserLimits(userId?: string): Promise<{ allowed: boolean; reason?: string }> {
    if (!userId) {
      return { allowed: true } // Anonymous users allowed for now
    }

    try {
      const user = await db.getUserById(userId)
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      
      // Reset monthly count if needed
      if ((user as any).last_report_reset !== monthStart.toISOString().split('T')[0]) {
        await db.updateUser(userId, {
          monthly_report_count: 0,
          last_report_reset: monthStart.toISOString().split('T')[0]
        })
        ;(user as any).monthly_report_count = 0
      }

      // Check subscription limits
      const limits = {
        starter: 3,
        plus: 50,
        'plus-ultra': 500
      }

      const userLimit = limits[(user as any).subscription_tier as keyof typeof limits] || 3
      
      if ((user as any).monthly_report_count >= userLimit) {
        return { 
          allowed: false, 
          reason: `Monthly limit of ${userLimit} reports reached. Please upgrade your plan or wait until next month.` 
        }
      }

      return { allowed: true }
    } catch (error) {
      console.error('Error checking user limits:', error)
      return { allowed: true } // Allow on error to avoid blocking
    }
  }

  async analyzeWebsite(request: AnalysisRequest): Promise<AnalysisResponse> {
    const startTime = Date.now()
    
    try {
      // Validate URL
      const urlValidation = this.validateUrl(request.url)
      if (!urlValidation.isValid) {
        return {
          id: uuidv4(),
          status: 'failed',
          error: urlValidation.error
        }
      }

      // Check user limits
      const limitsCheck = await this.checkUserLimits(request.user_id)
      if (!limitsCheck.allowed) {
        return {
          id: uuidv4(),
          status: 'failed',
          error: limitsCheck.reason
        }
      }

      // Create initial report record
      const reportId = uuidv4()
      const domain = this.extractDomain(request.url)
      
      const reportData = await db.createReport({
        id: reportId,
        user_id: request.user_id || null,
        url: request.url,
        domain,
        analysis_mode: request.analysis_mode || 'comprehensive',
        clarity_score: 0, // Will be updated after analysis
        score_breakdown: {},
        processing_status: 'processing',
        report_data: {},
        shareable_token: this.generateShareableToken(),
        is_public: false,
        view_count: 0
      })

      // Start parallel analysis
      const analysisPromise = this.performAnalysis(reportId, request)
      
      // Return immediately for async processing
      return {
        id: reportId,
        status: 'processing',
        estimated_completion_time: 60000 // 60 seconds
      }

    } catch (error) {
      console.error('Error in analyzeWebsite:', error)
      return {
        id: uuidv4(),
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  private async performAnalysis(reportId: string, request: AnalysisRequest): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Step 1: Crawl website content
      console.log(`[${reportId}] Starting content crawling for ${request.url}`)
      const crawlResult = await this.crawlWebsite(request.url, reportId)
      
      // Step 2: Take screenshot
      console.log(`[${reportId}] Taking screenshot`)
      const screenshotResult = await this.takeScreenshot(request.url, reportId)
      
      // Step 3: AI Analysis
      console.log(`[${reportId}] Starting AI analysis`)
      const analysisResult = await this.performAIAnalysis({
        html: crawlResult.html,
        screenshot: screenshotResult.screenshot,
        metadata: crawlResult.metadata
      }, request.analysis_mode || 'comprehensive', reportId)

      // Step 4: Generate final report
      console.log(`[${reportId}] Generating final report`)
      const finalReport = await this.generateFinalReport(
        reportId,
        request,
        crawlResult,
        screenshotResult,
        analysisResult,
        Date.now() - startTime
      )

      // Step 5: Update user report count
      if (request.user_id) {
        await this.updateUserReportCount(request.user_id)
      }

      console.log(`[${reportId}] Analysis completed in ${Date.now() - startTime}ms`)

    } catch (error) {
      console.error(`[${reportId}] Analysis failed:`, error)
      
      // Update report with error status
      await supabase
        .from('reports')
        .update({
          processing_status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
          processing_time_ms: Date.now() - startTime
        })
        .eq('id', reportId)
    }
  }

  private async crawlWebsite(url: string, reportId: string) {
    const startTime = Date.now()
    
    try {
      // Check rate limits
      if (!rateLimiter.canMakeRequest('firecrawl')) {
        throw new Error('Rate limit exceeded for crawling service')
      }

      rateLimiter.recordRequest('firecrawl')
      
      const result = await apiClients.firecrawl.scrapeUrl(url, {
        includeScreenshot: false, // We'll use CaptureKit for better screenshots
        includeMetadata: true,
        formats: ['html', 'markdown']
      })

      // Log API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'firecrawl',
        endpoint: '/v0/scrape',
        method: 'POST',
        processing_time_ms: Date.now() - startTime,
        success: result.success,
        error_message: result.error || null,
        cost_usd: 0.001 // Estimate based on Firecrawl pricing
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to crawl website')
      }

      return {
        html: result.data.html,
        markdown: result.data.markdown,
        metadata: result.data.metadata
      }

    } catch (error) {
      // Log failed API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'firecrawl',
        endpoint: '/v0/scrape',
        method: 'POST',
        processing_time_ms: Date.now() - startTime,
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      
      throw error
    }
  }

  private async takeScreenshot(url: string, reportId: string) {
    const startTime = Date.now()
    
    try {
      // Check rate limits
      if (!rateLimiter.canMakeRequest('capturekit')) {
        throw new Error('Rate limit exceeded for screenshot service')
      }

      rateLimiter.recordRequest('capturekit')
      
      const result = await apiClients.capturekit.takeScreenshot(url, {
        width: 1920,
        height: 1080,
        fullPage: true,
        format: 'webp',
        quality: 85
      })

      // Log API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'capturekit',
        endpoint: '/v1/screenshot',
        method: 'POST',
        processing_time_ms: Date.now() - startTime,
        success: result.success,
        error_message: result.error || null,
        cost_usd: 0.007 // Based on CaptureKit pricing
      })

      if (!result.success) {
        console.warn(`Screenshot failed: ${result.error}, continuing without screenshot`)
        return { screenshot: null }
      }

      return {
        screenshot: result.url
      }

    } catch (error) {
      // Log failed API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'capturekit',
        endpoint: '/v1/screenshot',
        method: 'POST',
        processing_time_ms: Date.now() - startTime,
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      
      console.warn(`Screenshot error: ${error}, continuing without screenshot`)
      return { screenshot: null }
    }
  }

  private async performAIAnalysis(
    content: { html: string; screenshot?: string | null; metadata: any },
    analysisMode: string,
    reportId: string
  ) {
    const startTime = Date.now()
    let tokensUsed = 0
    
    try {
      // Check rate limits
      if (!rateLimiter.canMakeRequest('gemini')) {
        throw new Error('Rate limit exceeded for AI analysis service')
      }

      rateLimiter.recordRequest('gemini')
      
      const result = await apiClients.gemini.analyzeWebsite({
        ...content,
        screenshot: content.screenshot || undefined
      }, analysisMode as any)
      tokensUsed = (result as any).tokensUsed || 0

      // Log API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'gemini',
        endpoint: '/v1beta/models/gemini-2.5-flash-latest:generateContent',
        method: 'POST',
        tokens_used: tokensUsed,
        processing_time_ms: Date.now() - startTime,
        success: !(result as any).error,
        error_message: (result as any).error || null,
        cost_usd: this.calculateGeminiCost(tokensUsed)
      })

      if ((result as any).error) {
        throw new Error((result as any).error)
      }

      return result

    } catch (error) {
      // Log failed API usage
      await db.logApiUsage({
        report_id: reportId,
        service_name: 'gemini',
        endpoint: '/v1beta/models/gemini-2.5-flash-latest:generateContent',
        method: 'POST',
        tokens_used: tokensUsed,
        processing_time_ms: Date.now() - startTime,
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      
      throw error
    }
  }

  private calculateGeminiCost(tokens: number): number {
    // Gemini 2.5 Flash pricing: $0.075 per 1K input tokens, $0.30 per 1K output tokens
    // Rough estimate: 70% input, 30% output
    const inputTokens = Math.floor(tokens * 0.7)
    const outputTokens = Math.floor(tokens * 0.3)
    
    const inputCost = (inputTokens / 1000) * 0.075
    const outputCost = (outputTokens / 1000) * 0.30
    
    return inputCost + outputCost
  }

  private async generateFinalReport(
    reportId: string,
    request: AnalysisRequest,
    crawlResult: any,
    screenshotResult: any,
    analysisResult: any,
    processingTime: number
  ): Promise<Report> {
    
    const reportData: ReportData = {
      metadata: {
        url: request.url,
        timestamp: new Date().toISOString(),
        processingTime,
        analysisMode: request.analysis_mode || 'comprehensive'
      },
      clarityScore: {
        overall: analysisResult.score,
        breakdown: {
          design: analysisResult.analysis.design.score,
          ux: analysisResult.analysis.ux.score,
          technical: analysisResult.analysis.technical.score,
          accessibility: analysisResult.analysis.accessibility.score
        }
      },
      sections: [
        {
          category: 'Design',
          score: analysisResult.analysis.design.score,
          findings: analysisResult.analysis.design.findings.map((f: string, i: number) => ({
            type: analysisResult.analysis.design.score > 70 ? 'positive' : 'negative',
            title: `Design Finding ${i + 1}`,
            description: f,
            priority: 'medium',
            category: 'design'
          }))
        },
        {
          category: 'User Experience',
          score: analysisResult.analysis.ux.score,
          findings: analysisResult.analysis.ux.findings.map((f: string, i: number) => ({
            type: analysisResult.analysis.ux.score > 70 ? 'positive' : 'negative',
            title: `UX Finding ${i + 1}`,
            description: f,
            priority: 'high',
            category: 'ux'
          }))
        },
        {
          category: 'Technical',
          score: analysisResult.analysis.technical.score,
          findings: analysisResult.analysis.technical.findings.map((f: string, i: number) => ({
            type: analysisResult.analysis.technical.score > 70 ? 'positive' : 'negative',
            title: `Technical Finding ${i + 1}`,
            description: f,
            priority: 'medium',
            category: 'technical'
          }))
        },
        {
          category: 'Accessibility',
          score: analysisResult.analysis.accessibility.score,
          findings: analysisResult.analysis.accessibility.findings.map((f: string, i: number) => ({
            type: analysisResult.analysis.accessibility.score > 70 ? 'positive' : 'negative',
            title: `Accessibility Finding ${i + 1}`,
            description: f,
            priority: 'high',
            category: 'accessibility'
          }))
        }
      ],
      actionableInsights: analysisResult.insights || [],
      prioritizedRecommendations: analysisResult.recommendations || []
    }

    // Update the report in database
    const updatedReport = await supabase
      .from('reports')
      .update({
        final_url: crawlResult.metadata.sourceURL || request.url,
        title: crawlResult.metadata.title,
        description: crawlResult.metadata.description,
        clarity_score: analysisResult.score,
        score_breakdown: reportData.clarityScore.breakdown,
        processing_time_ms: processingTime,
        processing_status: 'completed',
        report_data: reportData as any,
        ai_model_used: 'gemini-2.5-flash',
        ai_cost_usd: this.calculateGeminiCost(analysisResult.tokensUsed || 0),
        crawl_service: 'firecrawl',
        screenshot_service: 'capturekit',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select()
      .single()

    if (updatedReport.error) {
      throw new Error('Failed to update report: ' + updatedReport.error.message)
    }

    return updatedReport.data as unknown as Report
  }

  private async updateUserReportCount(userId: string): Promise<void> {
    try {
      await supabase.rpc('increment_user_report_count', { user_id: userId })
    } catch (error) {
      console.error('Error updating user report count:', error)
      // Non-critical error, don't throw
    }
  }

  // Public method to check analysis status
  async getAnalysisStatus(reportId: string): Promise<Report | null> {
    try {
      return await db.getReport(reportId) as unknown as Report
    } catch (error) {
      console.error('Error getting analysis status:', error)
      return null
    }
  }
}

// Export singleton instance
export const analysisOrchestrator = new AnalysisOrchestrator()
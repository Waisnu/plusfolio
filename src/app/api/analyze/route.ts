// POST /api/analyze - Main website analysis endpoint
import { NextRequest, NextResponse } from 'next/server'
import { analysisOrchestrator } from '@/lib/analysis-orchestrator'
import { withAuth, AuthenticatedRequest } from '@/lib/auth-middleware'
import { withMiddleware, withRateLimit, withErrorHandling, withLogging } from '@/lib/middleware'
import { rateLimits } from '@/lib/middleware'
import { z } from 'zod'

const analysisRequestSchema = z.object({
  url: z.string().url('Invalid URL format'),
  analysis_mode: z.enum(['comprehensive', 'recruiter', 'peer', 'client', 'quick']).optional().default('comprehensive')
})

async function analyzeHandler(request: AuthenticatedRequest) {
  const body = await request.json()
  
  // Validate request body
  const validatedRequest = analysisRequestSchema.parse(body)
  
  // Add authenticated user ID to request
  const analysisRequest = {
    ...validatedRequest,
    user_id: request.user!.plusfolio_user_id
  }
  
  // Start analysis (async processing)
  const result = await analysisOrchestrator.analyzeWebsite(analysisRequest)
  
  return NextResponse.json(result)
}

// Apply authentication and middleware
export const POST = withMiddleware(
  withAuth(analyzeHandler, { required: true }),
  withErrorHandling,
  withLogging,
  (handler) => withRateLimit(handler, rateLimits.plus) // Use dynamic rate limiting based on user tier in the future
)

async function getAnalysisHandler(request: AuthenticatedRequest) {
  const { searchParams } = new URL(request.url)
  const reportId = searchParams.get('id')
  
  if (!reportId) {
    return NextResponse.json(
      { error: 'Report ID is required' },
      { status: 400 }
    )
  }
  
  const report = await analysisOrchestrator.getAnalysisStatus(reportId)
  
  if (!report) {
    return NextResponse.json(
      { error: 'Report not found' },
      { status: 404 }
    )
  }
  
  // Verify user owns the report or it's public
  if (report.user_id !== request.user!.plusfolio_user_id && !report.is_public) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }
  
  return NextResponse.json(report)
}

export const GET = withMiddleware(
  withAuth(getAnalysisHandler, { required: true }),
  withErrorHandling,
  withLogging
)
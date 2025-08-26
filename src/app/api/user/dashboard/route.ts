// GET /api/user/dashboard - Get comprehensive dashboard data
import { NextRequest, NextResponse } from 'next/server'
import { db, supabase } from '@/lib/supabase'
import { withAuth, AuthenticatedRequest } from '@/lib/auth-middleware'
import { withMiddleware, withErrorHandling, withLogging } from '@/lib/middleware'

async function dashboardHandler(request: AuthenticatedRequest) {
  // Use authenticated user's ID
  const userId = request.user!.plusfolio_user_id
  
  // Use the efficient dashboard function from database
  const { data: dashboardData, error } = await (supabase as any)
    .rpc('get_user_dashboard_data', { p_user_id: userId })
  
  if (error) {
    throw new Error(`Failed to fetch dashboard data: ${error.message}`)
  }
  
  if (!dashboardData || dashboardData.length === 0) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  const result = dashboardData[0]
  
  return NextResponse.json({
    user: result.user_data,
    recent_reports: result.recent_reports,
    connected_accounts: result.connected_accounts,
    repositories: result.repositories,
    usage_stats: result.usage_stats,
    report_count: result.user_data.total_reports_generated || 0
  })
}

export const GET = withMiddleware(
  withAuth(dashboardHandler, { required: true }),
  withErrorHandling,
  withLogging
)
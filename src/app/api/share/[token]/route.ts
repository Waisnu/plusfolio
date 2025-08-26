// GET /api/share/[token] - Get public report by shareable token
import { NextRequest, NextResponse } from 'next/server'
import { db, supabase } from '@/lib/supabase'
import { z } from 'zod'

const paramsSchema = z.object({
  token: z.string().min(1)
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const resolvedParams = await params
    const { token } = paramsSchema.parse(resolvedParams)
    
    const report = await db.getPublicReport(token)
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found or no longer public' },
        { status: 404 }
      )
    }
    
    // Check if report has expired
    if ((report as any).share_expires_at && new Date((report as any).share_expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Shared report has expired' },
        { status: 410 }
      )
    }
    
    // Increment view count
    await supabase
      .from('reports')
      .update({ 
        view_count: ((report as any).view_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', (report as any).id)
    
    // Return report without user_id for privacy
    const publicReport = {
      ...(report as any),
      user_id: undefined
    }
    
    return NextResponse.json(publicReport)
    
  } catch (error) {
    console.error('Error fetching shared report:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid share token' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
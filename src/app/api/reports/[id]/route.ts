// GET /api/reports/[id] - Get a specific report
import { NextRequest, NextResponse } from 'next/server'
import { db, supabase } from '@/lib/supabase'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid()
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate params
    const resolvedParams = await params
    const { id } = paramsSchema.parse(resolvedParams)
    
    const report = await db.getReport(id)
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }
    
    // Increment view count for public reports
    if ((report as any).is_public) {
      await supabase
        .from('reports')
        .update({ 
          view_count: ((report as any).view_count || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
    }
    
    return NextResponse.json(report)
    
  } catch (error) {
    console.error('Error fetching report:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid report ID' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/reports/[id] - Update report (e.g., make public)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = paramsSchema.parse(resolvedParams)
    const body = await request.json()
    
    const updateSchema = z.object({
      is_public: z.boolean().optional(),
      share_expires_at: z.string().datetime().optional().nullable()
    })
    
    const updates = updateSchema.parse(body)
    
    const { data: updatedReport, error } = await supabase
      .from('reports')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update report: ${error.message}`)
    }
    
    return NextResponse.json(updatedReport)
    
  } catch (error) {
    console.error('Error updating report:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
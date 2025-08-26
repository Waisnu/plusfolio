// POST /api/feedback - Submit feedback for a report
// GET /api/feedback - Get feedback for a report
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const bodySchema = z.object({
      report_id: z.string().uuid(),
      user_id: z.string().uuid().optional(), // Allow anonymous feedback
      rating: z.number().min(1).max(5),
      helpful_insights: z.array(z.string()).optional(),
      unhelpful_insights: z.array(z.string()).optional(),
      accuracy_rating: z.number().min(1).max(5).optional(),
      improvement_suggestions: z.string().optional(),
      specific_feedback: z.record(z.string(), z.any()).optional(),
      user_role: z.enum(['developer', 'designer', 'founder', 'other']).optional(),
      experience_level: z.enum(['beginner', 'intermediate', 'advanced']).optional()
    })
    
    const body = await request.json()
    const feedbackData = bodySchema.parse(body)
    
    // Get client IP and user agent for spam prevention
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '0.0.0.0'
    const userAgent = request.headers.get('user-agent') || ''
    
    const { data: feedback, error } = await (supabase as any)
      .from('feedback')
      .insert({
        ...feedbackData,
        ip_address: ip,
        user_agent: userAgent
      })
      .select()
      .single()
    
    if (error) {
      // Handle unique constraint violation (duplicate feedback)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Feedback already submitted for this report' },
          { status: 409 }
        )
      }
      throw new Error(`Failed to submit feedback: ${error.message}`)
    }
    
    return NextResponse.json({
      message: 'Feedback submitted successfully',
      feedback_id: feedback.id
    })
    
  } catch (error) {
    console.error('Error submitting feedback:', error)
    
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const querySchema = z.object({
      report_id: z.string().uuid().optional(),
      user_id: z.string().uuid().optional()
    })
    
    const query = querySchema.parse({
      report_id: searchParams.get('report_id'),
      user_id: searchParams.get('user_id')
    })
    
    if (!query.report_id && !query.user_id) {
      return NextResponse.json(
        { error: 'Either report_id or user_id is required' },
        { status: 400 }
      )
    }
    
    let dbQuery = (supabase as any)
      .from('feedback')
      .select(`
        id,
        rating,
        helpful_insights,
        unhelpful_insights,
        accuracy_rating,
        improvement_suggestions,
        specific_feedback,
        user_role,
        experience_level,
        created_at,
        report_id
      `)
    
    if (query.report_id) {
      dbQuery = dbQuery.eq('report_id', query.report_id)
    }
    
    if (query.user_id) {
      dbQuery = dbQuery.eq('user_id', query.user_id)
    }
    
    const { data: feedback, error } = await dbQuery.order('created_at', { ascending: false })
    
    if (error) {
      throw new Error(`Failed to fetch feedback: ${error.message}`)
    }
    
    return NextResponse.json({ feedback })
    
  } catch (error) {
    console.error('Error fetching feedback:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
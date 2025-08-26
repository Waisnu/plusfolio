// GET /api/reports - Get user reports or public reports
import { NextRequest, NextResponse } from 'next/server'
import { db, supabase } from '@/lib/supabase'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const querySchema = z.object({
      user_id: z.string().uuid().optional(),
      public: z.boolean().optional(),
      limit: z.number().min(1).max(100).default(10),
      offset: z.number().min(0).default(0),
      sort: z.enum(['created_at', 'clarity_score', 'view_count']).default('created_at'),
      order: z.enum(['asc', 'desc']).default('desc')
    }).transform(data => ({
      ...data,
      limit: Number(searchParams.get('limit')) || data.limit,
      offset: Number(searchParams.get('offset')) || data.offset,
      public: searchParams.get('public') === 'true'
    }))
    
    const query = querySchema.parse({
      user_id: searchParams.get('user_id') || undefined,
      public: searchParams.get('public') === 'true',
      limit: Number(searchParams.get('limit')) || 10,
      offset: Number(searchParams.get('offset')) || 0,
      sort: searchParams.get('sort') as any || 'created_at',
      order: searchParams.get('order') as any || 'desc'
    })
    
    let dbQuery = supabase
      .from('reports')
      .select(`
        id,
        url,
        final_url,
        domain,
        title,
        description,
        analysis_mode,
        clarity_score,
        score_breakdown,
        processing_status,
        is_public,
        view_count,
        created_at,
        updated_at,
        shareable_token
      `)
    
    // Filter by user or public reports
    if (query.user_id) {
      dbQuery = dbQuery.eq('user_id', query.user_id)
    } else if (query.public) {
      dbQuery = dbQuery
        .eq('is_public', true)
        .eq('processing_status', 'completed')
    } else {
      return NextResponse.json(
        { error: 'Must specify user_id or public=true' },
        { status: 400 }
      )
    }
    
    // Apply sorting and pagination
    dbQuery = dbQuery
      .order(query.sort, { ascending: query.order === 'asc' })
      .range(query.offset, query.offset + query.limit - 1)
    
    const { data: reports, error } = await dbQuery
    
    if (error) {
      throw new Error(`Failed to fetch reports: ${error.message}`)
    }
    
    // Get total count for pagination
    let countQuery = supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
    
    if (query.user_id) {
      countQuery = countQuery.eq('user_id', query.user_id)
    } else if (query.public) {
      countQuery = countQuery
        .eq('is_public', true)
        .eq('processing_status', 'completed')
    }
    
    const { count, error: countError } = await countQuery
    
    if (countError) {
      console.error('Error getting count:', countError)
    }
    
    return NextResponse.json({
      data: reports,
      meta: {
        total: count || 0,
        limit: query.limit,
        offset: query.offset,
        hasMore: (query.offset + query.limit) < (count || 0)
      }
    })
    
  } catch (error) {
    console.error('Error fetching reports:', error)
    
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
// GET /api/health - Health check endpoint
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Test database connection
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1)
    
    const dbResponseTime = Date.now() - startTime
    
    if (error) {
      throw new Error(`Database connection failed: ${error.message}`)
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'connected',
          response_time_ms: dbResponseTime
        },
        api: {
          status: 'operational',
          version: '1.0.0'
        }
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown'
    })
    
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      services: {
        database: {
          status: 'disconnected'
        },
        api: {
          status: 'degraded'
        }
      }
    }, { status: 503 })
  }
}
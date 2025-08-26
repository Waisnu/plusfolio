// API Middleware utilities for PlusFolio
import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  windowMs: number  // Time window in milliseconds
  maxRequests: number  // Max requests per window
}

// Default rate limits by tier
export const rateLimits: Record<string, RateLimitConfig> = {
  anonymous: { windowMs: 3600000, maxRequests: 10 }, // 10 per hour
  starter: { windowMs: 3600000, maxRequests: 50 },   // 50 per hour
  plus: { windowMs: 3600000, maxRequests: 500 },     // 500 per hour
  'plus-ultra': { windowMs: 3600000, maxRequests: 2000 } // 2000 per hour
}

export function rateLimit(
  request: NextRequest,
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = `${identifier}:${Math.floor(now / config.windowMs)}`
  
  const current = rateLimitStore.get(key) || { count: 0, resetTime: now + config.windowMs }
  
  // Clean up old entries
  if (now > current.resetTime) {
    rateLimitStore.delete(key)
    const newEntry = { count: 1, resetTime: now + config.windowMs }
    rateLimitStore.set(key, newEntry)
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: newEntry.resetTime }
  }
  
  if (current.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }
  
  current.count++
  rateLimitStore.set(key, current)
  
  return { 
    allowed: true, 
    remaining: config.maxRequests - current.count, 
    resetTime: current.resetTime 
  }
}

export function getRateLimitIdentifier(request: NextRequest): string {
  // Try to get user ID from authorization header or query params
  const authHeader = request.headers.get('authorization')
  const userIdParam = new URL(request.url).searchParams.get('user_id')
  
  if (authHeader || userIdParam) {
    return `user:${userIdParam || authHeader?.split(' ')[1]}`
  }
  
  // Fall back to IP address
  return `ip:${request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'}`
}

export function withRateLimit(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  config?: RateLimitConfig
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const identifier = getRateLimitIdentifier(request)
    const limitConfig = config || rateLimits.anonymous
    
    const { allowed, remaining, resetTime } = rateLimit(request, identifier, limitConfig)
    
    if (!allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `Too many requests. Limit: ${limitConfig.maxRequests} per ${limitConfig.windowMs/1000/60} minutes`,
          resetTime: new Date(resetTime).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limitConfig.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString()
          }
        }
      )
    }
    
    const response = await handler(request, ...args)
    
    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', limitConfig.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())
    
    return response
  }
}

// CORS middleware
export function withCORS(handler: MiddlewareHandler): MiddlewareHandler {
  return async (request: NextRequest, ...args: any[]) => {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      })
    }
    
    const response = await handler(request, ...args)
    
    // Add CORS headers to all responses
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
  }
}

// Error handling wrapper
export function withErrorHandling(handler: MiddlewareHandler): MiddlewareHandler {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      return await handler(request, ...args)
    } catch (error) {
      console.error('API Error:', error)
      
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: process.env.NODE_ENV === 'development' 
            ? (error instanceof Error ? error.message : 'Unknown error')
            : 'An unexpected error occurred'
        },
        { status: 500 }
      )
    }
  }
}

// Request logging
export function withLogging(handler: MiddlewareHandler): MiddlewareHandler {
  return async (request: NextRequest, ...args: any[]) => {
    const startTime = Date.now()
    const method = request.method
    const url = request.url
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${userAgent}`)
    
    const response = await handler(request, ...args)
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${response.status} - ${duration}ms`)
    
    return response
  }
}

// Type for middleware handler
type MiddlewareHandler = (request: NextRequest, ...args: any[]) => Promise<NextResponse>
type MiddlewareWrapper = (handler: MiddlewareHandler) => MiddlewareHandler

// Combine multiple middleware
export function withMiddleware(handler: MiddlewareHandler, ...middlewares: MiddlewareWrapper[]): MiddlewareHandler {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler)
}

// Security headers middleware
export function withSecurityHeaders(handler: MiddlewareHandler): MiddlewareHandler {
  return async (request: NextRequest, ...args: any[]) => {
    const response = await handler(request, ...args)
    
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }
}

// Validate content type for POST/PUT requests
export function withContentTypeValidation(handler: MiddlewareHandler): MiddlewareHandler {
  return async (request: NextRequest, ...args: any[]) => {
    if (['POST', 'PUT'].includes(request.method)) {
      const contentType = request.headers.get('content-type')
      
      if (!contentType || !contentType.includes('application/json')) {
        return NextResponse.json(
          { error: 'Content-Type must be application/json' },
          { status: 400 }
        )
      }
    }
    
    return handler(request, ...args)
  }
}
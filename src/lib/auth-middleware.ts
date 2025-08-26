// Authentication middleware for API routes
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { db, supabase } from '@/lib/supabase'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    name?: string
    subscription_tier: string
    plusfolio_user_id: string
  }
}

// Authentication middleware wrapper
export function withAuth(
  handler: (request: AuthenticatedRequest, ...args: any[]) => Promise<NextResponse>,
  options: {
    required?: boolean
    allowAnonymous?: boolean
    requirePro?: boolean
  } = {}
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const { required = true, allowAnonymous = false, requirePro = false } = options

    try {
      // Get JWT token from request
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
      })

      // Handle anonymous access
      if (!token) {
        if (allowAnonymous) {
          return handler(request as AuthenticatedRequest, ...args)
        }
        
        if (required) {
          return NextResponse.json(
            { error: 'Authentication required', code: 'AUTH_REQUIRED' },
            { status: 401 }
          )
        }
        
        return handler(request as AuthenticatedRequest, ...args)
      }

      // Fetch user data from database
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, full_name, subscription_tier')
        .eq('email', token.email!)
        .single()

      if (error || !user) {
        return NextResponse.json(
          { error: 'User not found', code: 'USER_NOT_FOUND' },
          { status: 404 }
        )
      }

      // Check subscription requirement
      if (requirePro && user.subscription_tier === 'starter') {
        return NextResponse.json(
          { 
            error: 'Pro subscription required', 
            code: 'PRO_REQUIRED',
            subscription_tier: user.subscription_tier
          },
          { status: 403 }
        )
      }

      // Add user to request
      (request as AuthenticatedRequest).user = {
        id: token.sub!,
        email: user.email,
        name: user.full_name,
        subscription_tier: user.subscription_tier,
        plusfolio_user_id: user.id
      }

      return handler(request as AuthenticatedRequest, ...args)

    } catch (error) {
      console.error('Authentication middleware error:', error)
      
      return NextResponse.json(
        { error: 'Authentication failed', code: 'AUTH_ERROR' },
        { status: 500 }
      )
    }
  }
}

// Get authenticated user from request
export function getAuthenticatedUser(request: AuthenticatedRequest) {
  return request.user
}

// Check if user has pro subscription
export function isProUser(user: { subscription_tier: string }) {
  return ['plus', 'plus-ultra'].includes(user.subscription_tier)
}

// Get user tier limits
export function getUserLimits(subscription_tier: string) {
  switch (subscription_tier) {
    case 'starter':
      return {
        monthly_reports: 3,
        features: ['basic_analysis', 'public_reports']
      }
    case 'plus':
      return {
        monthly_reports: 100,
        features: ['basic_analysis', 'advanced_analysis', 'pdf_export', 'public_reports', 'private_reports']
      }
    case 'plus-ultra':
      return {
        monthly_reports: 1000,
        features: ['all_features']
      }
    default:
      return {
        monthly_reports: 3,
        features: ['basic_analysis']
      }
  }
}

// Check rate limit based on user tier
export function getUserRateLimit(subscription_tier: string) {
  switch (subscription_tier) {
    case 'starter':
      return { windowMs: 3600000, maxRequests: 10 } // 10 per hour
    case 'plus':
      return { windowMs: 3600000, maxRequests: 100 } // 100 per hour
    case 'plus-ultra':
      return { windowMs: 3600000, maxRequests: 500 } // 500 per hour
    default:
      return { windowMs: 3600000, maxRequests: 5 } // 5 per hour for unknown
  }
}
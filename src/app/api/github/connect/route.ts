// POST /api/github/connect - Connect GitHub account and store access token
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { apiClients } from '@/lib/external-apis'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      access_token: z.string(),
      refresh_token: z.string().optional(),
      scopes: z.array(z.string()).default(['repo', 'read:user'])
    })
    
    const body = await request.json()
    const { user_id, access_token, refresh_token, scopes } = bodySchema.parse(body)
    
    // Verify the token works by fetching user info
    const githubClient = apiClients.createGitHubClient(access_token)
    const userInfo = await githubClient.getUserInfo()
    
    if (!userInfo) {
      return NextResponse.json(
        { error: 'Invalid GitHub access token' },
        { status: 400 }
      )
    }
    
    // Store the connection
    const { data: connection, error } = await supabase
      .from('user_connections')
      .insert({
        user_id,
        provider: 'github',
        access_token,
        refresh_token: refresh_token || null,
        scopes
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to store connection: ${error.message}`)
    }
    
    return NextResponse.json({
      message: 'GitHub account connected successfully',
      connection: {
        id: connection.id,
        provider: connection.provider,
        created_at: connection.created_at
      },
      github_user: {
        login: userInfo.login,
        name: userInfo.name,
        avatar_url: userInfo.avatar_url
      }
    })
    
  } catch (error) {
    console.error('Error connecting GitHub account:', error)
    
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

// DELETE /api/github/connect - Disconnect GitHub account
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const querySchema = z.object({
      user_id: z.string().uuid()
    })
    
    const { user_id } = querySchema.parse({
      user_id: searchParams.get('user_id')
    })
    
    // Remove the connection
    const { error } = await supabase
      .from('user_connections')
      .delete()
      .eq('user_id', user_id)
      .eq('provider', 'github')
    
    if (error) {
      throw new Error(`Failed to disconnect GitHub: ${error.message}`)
    }
    
    return NextResponse.json({
      message: 'GitHub account disconnected successfully'
    })
    
  } catch (error) {
    console.error('Error disconnecting GitHub account:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'User ID is required', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
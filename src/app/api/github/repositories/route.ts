// GET /api/github/repositories - Get user's GitHub repositories
// POST /api/github/repositories - Import selected repositories
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { apiClients } from '@/lib/external-apis'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const querySchema = z.object({
      user_id: z.string().uuid(),
      source: z.enum(['database', 'github']).default('database')
    })
    
    const query = querySchema.parse({
      user_id: searchParams.get('user_id'),
      source: searchParams.get('source') as any
    })
    
    if (query.source === 'database') {
      // Return repositories from database
      const repositories = await db.getUserRepositories(query.user_id)
      return NextResponse.json({ repositories })
    } else {
      // Fetch fresh data from GitHub API
      const connection = await db.getUserConnection(query.user_id, 'github')
      
      if (!connection) {
        return NextResponse.json(
          { error: 'GitHub connection not found. Please connect your GitHub account.' },
          { status: 404 }
        )
      }
      
      const githubClient = apiClients.createGitHubClient((connection as any).access_token)
      const repositories = await githubClient.getUserRepositories()
      
      return NextResponse.json({ repositories })
    }
    
  } catch (error) {
    console.error('Error fetching repositories:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      repositories: z.array(z.object({
        id: z.number(),
        name: z.string(),
        full_name: z.string(),
        description: z.string().nullable(),
        html_url: z.string().url(),
        language: z.string().nullable(),
        stargazers_count: z.number(),
        forks_count: z.number()
      }))
    })
    
    const body = await request.json()
    const { user_id, repositories } = bodySchema.parse(body)
    
    // Import repositories to database
    const importedRepos: any[] = []
    
    for (const repo of repositories) {
      try {
        const importedRepo = await db.createRepository({
          user_id,
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          html_url: repo.html_url
        })
        
        importedRepos.push(importedRepo)
      } catch (error) {
        console.error(`Error importing repository ${repo.name}:`, error)
        // Continue with other repositories
      }
    }
    
    return NextResponse.json({
      message: `Successfully imported ${importedRepos.length} repositories`,
      repositories: importedRepos
    })
    
  } catch (error) {
    console.error('Error importing repositories:', error)
    
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
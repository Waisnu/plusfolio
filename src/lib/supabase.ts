// Supabase client configuration for PlusFolio
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sufbbgqdabunbvhvzevg.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1ZmJiZ3FkYWJ1bmJ2aHZ6ZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDMwNTQsImV4cCI6MjA3MTcxOTA1NH0.Ea0UnFk5Dl81EudADUKRkm6936WfxEv4k3gUH1UeW90'

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Server-side Supabase client with service role key (for admin operations)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database helper functions
export const db = {
  // Users
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createUser(user: Partial<Database['public']['Tables']['users']['Insert']>) {
    const { data, error } = await (supabaseAdmin as any)
      .from('users')
      .insert(user)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(id: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
    const { data, error } = await (supabase as any)
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Reports
  async createReport(report: any) {
    const { data, error } = await (supabase as any)
      .from('reports')
      .insert(report)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getReport(id: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getUserReports(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .eq('processing_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getPublicReport(shareableToken: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('shareable_token', shareableToken)
      .eq('is_public', true)
      .single()
    
    if (error) throw error
    return data
  },

  // User Connections
  async getUserConnection(userId: string, provider: string) {
    const { data, error } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createUserConnection(connection: Database['public']['Tables']['user_connections']['Insert']) {
    const { data, error } = await supabase
      .from('user_connections')
      .upsert(connection, { 
        onConflict: 'user_id,provider',
        ignoreDuplicates: false 
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Repositories
  async getUserRepositories(userId: string) {
    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .eq('user_id', userId)
      .order('stargazers_count', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createRepository(repo: Database['public']['Tables']['repositories']['Insert']) {
    const { data, error } = await supabase
      .from('repositories')
      .upsert(repo, { 
        onConflict: 'github_id',
        ignoreDuplicates: false 
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // API Usage tracking
  async logApiUsage(usage: Database['public']['Tables']['api_usage']['Insert']) {
    const { error } = await supabase
      .from('api_usage')
      .insert(usage)
    
    if (error) throw error
  },

  // Dashboard data
  async getDashboardData(userId: string) {
    // Get user data
    const user = await this.getUserById(userId)
    
    // Get recent reports
    const recent_reports = await this.getUserReports(userId, 5)
    
    // Get connected accounts
    const { data: connected_accounts } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', userId)
    
    // Get repositories
    const repositories = await this.getUserRepositories(userId)
    
    // Get usage stats
    const { data: usage_stats } = await supabase
      .from('reports')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    
    const monthly_reports = usage_stats?.length || 0
    const monthly_limit = user.subscription_tier === 'free' ? 3 : 
                         user.subscription_tier === 'pro' ? 50 : 500

    return {
      user,
      recent_reports: recent_reports || [],
      report_count: user.total_reports_generated || 0,
      connected_accounts: connected_accounts || [],
      repositories: repositories || [],
      usage_stats: {
        monthly_reports,
        monthly_limit,
        total_reports: user.total_reports_generated || 0
      }
    }
  }
}
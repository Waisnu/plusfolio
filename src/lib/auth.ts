// NextAuth.js configuration for PlusFolio
import { NextAuthOptions } from 'next-auth'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { createClient } from '@supabase/supabase-js'

// Supabase client for NextAuth adapter
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: {
      schema: 'next_auth'
    }
  }
)

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!
  }),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile'
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email public_repo'
        }
      }
    })
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },

  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // Add user ID to session
        session.user.id = user.id
        
        // Fetch user data from our custom users table
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id, subscription_tier, created_at')
          .eq('email', session.user.email)
          .single()

        if (userData) {
          session.user.subscription_tier = userData.subscription_tier
          session.user.plusfolio_user_id = userData.id
        }
      }
      return session
    },

    async signIn({ user, account, profile }) {
      if (!user.email) return false

      try {
        // Check if user exists in our custom users table
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single()

        if (!existingUser) {
          // Create new user in our custom users table
          const { error } = await supabaseAdmin
            .from('users')
            .insert({
              email: user.email,
              full_name: user.name || '',
              subscription_tier: 'starter',
              provider: account?.provider || 'unknown',
              provider_id: account?.providerAccountId || null
            })

          if (error) {
            console.error('Error creating user:', error)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return false
      }
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful sign in
      if (url.startsWith('/auth/') || url === baseUrl) {
        return `${baseUrl}/dashboard`
      }
      return url
    }
  },

  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development'
}

// Helper function to get server-side session
export async function getServerSession(req: any, res: any) {
  const { getServerSession: getSession } = await import('next-auth')
  return getSession(req, res, authOptions)
}

// Types for extended session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      subscription_tier?: string
      plusfolio_user_id?: string
    }
  }
}
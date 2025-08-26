// Sign in page for PlusFolio authentication
'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Github, Mail } from 'lucide-react'

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const error = searchParams.get('error')

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    setIsLoading(providerId)
    try {
      await signIn(providerId, { 
        callbackUrl,
        redirect: true
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(null)
    }
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return <Github className="w-5 h-5" />
      case 'google':
        return <Mail className="w-5 h-5" />
      default:
        return null
    }
  }

  const getProviderName = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return 'GitHub'
      case 'google':
        return 'Google'
      default:
        return providerId
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome to PlusFolio
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to access your dashboard and start analyzing websites
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                {error === 'OAuthSignin' && 'Error signing in with OAuth provider'}
                {error === 'OAuthCallback' && 'Error processing OAuth callback'}
                {error === 'OAuthCreateAccount' && 'Could not create OAuth account'}
                {error === 'EmailCreateAccount' && 'Could not create email account'}
                {error === 'Callback' && 'Error in OAuth callback'}
                {error === 'OAuthAccountNotLinked' && 'OAuth account not linked'}
                {error === 'SessionRequired' && 'Please sign in to continue'}
                {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'SessionRequired'].includes(error) && 
                  'An error occurred during authentication'}
              </p>
            </div>
          )}

          {/* OAuth Providers */}
          <div className="space-y-3">
            {providers && Object.values(providers).map((provider: any) => (
              <Button
                key={provider.id}
                onClick={() => handleSignIn(provider.id)}
                disabled={isLoading === provider.id}
                variant="outline"
                size="lg"
                className="w-full h-12 text-left justify-start gap-3 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {getProviderIcon(provider.id)}
                <span className="flex-1">
                  {isLoading === provider.id 
                    ? 'Signing in...' 
                    : `Continue with ${getProviderName(provider.id)}`
                  }
                </span>
              </Button>
            ))}
          </div>

          {/* Terms and Privacy */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
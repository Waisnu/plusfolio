// Session Provider for NextAuth.js
'use client'

import { SessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}

// Export for convenience
export { useSession, signIn, signOut } from 'next-auth/react'
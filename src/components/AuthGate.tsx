'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const PUBLIC_ROUTES = ['/login', '/cadastro', '/onboarding']

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublic = PUBLIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))

  useEffect(() => {
    if (!isLoading && !user && !isPublic) {
      router.replace('/login')
    }
  }, [user, isLoading, isPublic, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-sm font-bold">VZ</span>
          </div>
          <p className="text-sm text-gray-500">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user && !isPublic) {
    return null
  }

  return <>{children}</>
}

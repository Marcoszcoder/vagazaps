'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const ADMIN_SESSION_KEY = 'vagazaps_admin_session'

interface AdminAuthContextType {
  isAdminAuthenticated: boolean
  isLoading: boolean
  login: (login: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem(ADMIN_SESSION_KEY)
    if (session) {
      try {
        const data = JSON.parse(session)
        if (data.authenticated && data.expiresAt > Date.now()) {
          setIsAdminAuthenticated(true)
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY)
        }
      } catch {
        localStorage.removeItem(ADMIN_SESSION_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (login: string, password: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      })

      const data = await res.json()

      if (data.success) {
        const session = {
          authenticated: true,
          expiresAt: Date.now() + (8 * 60 * 60 * 1000),
        }
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
        setIsAdminAuthenticated(true)
        return { success: true }
      }

      return { success: false, error: data.error || 'Credenciais inválidas' }
    } catch {
      return { success: false, error: 'Erro ao conectar com o servidor' }
    }
  }

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAdminAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return context
}

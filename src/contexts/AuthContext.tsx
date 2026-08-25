'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/lib/types'
import { login as authLogin, register as authRegister } from '@/lib/services/authService'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (data: { name: string; email: string; password: string; city: string; state: string }) => { success: boolean; error?: string }
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('vagazaps_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        // ignore
      }
    }
    setIsLoading(false)
  }, [])

  const loginFn = (email: string, password: string) => {
    const result = authLogin(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      localStorage.setItem('vagazaps_user', JSON.stringify(result.user))
    }
    return { success: result.success, error: result.error }
  }

  const registerFn = (data: { name: string; email: string; password: string; city: string; state: string }) => {
    const result = authRegister(data)
    if (result.success && result.user) {
      setUser(result.user)
      localStorage.setItem('vagazaps_user', JSON.stringify(result.user))
    }
    return { success: result.success, error: result.error }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vagazaps_user')
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates }
      setUser(updated)
      localStorage.setItem('vagazaps_user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login: loginFn, register: registerFn, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

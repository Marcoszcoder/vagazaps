'use client'

import { useState } from 'react'
import { useAdminAuth, AdminAuthProvider } from '@/contexts/AdminAuthContext'
import { JobsProvider } from '@/contexts/JobsContext'
import { NotificationsProvider } from '@/contexts/NotificationsContext'
import Link from 'next/link'

function AdminLoginPage() {
  const { login } = useAdminAuth()
  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(loginInput, password)
    if (!result.success) {
      setError(result.error || 'Credenciais inválidas')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Painel Master</h1>
          <p className="text-gray-500 mt-1">Acesso restrito ao administrador</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login</label>
            <input
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="Digite seu login"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <Link
          href="/"
          className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-6 transition-colors"
        >
          ← Voltar para o VagaZaps
        </Link>
      </div>
    </div>
  )
}

export default function AdminLayoutWithAuth({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  )
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, isLoading, logout } = useAdminAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return <AdminLoginPage />
  }

  return (
    <JobsProvider>
      <NotificationsProvider>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="font-bold text-gray-900">Painel Master</span>
                </Link>
                <nav className="hidden md:flex items-center gap-1">
                  <Link
                    href="/admin"
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Início
                  </Link>
                  <Link
                    href="/admin/usuarios"
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Usuários
                  </Link>
                  <Link
                    href="/admin/enviar"
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Enviar vagas
                  </Link>
                  <Link
                    href="/admin/vagas/nova"
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Nova vaga
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Ir para o app →
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </header>
          <main className="py-6">
            {children}
          </main>
        </div>
      </NotificationsProvider>
    </JobsProvider>
  )
}

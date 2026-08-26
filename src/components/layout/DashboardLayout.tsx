'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { JobsProvider } from '@/contexts/JobsContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { NotificationsProvider } from '@/contexts/NotificationsContext'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Header from './Header'

function MobileSidebarOverlay({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/vagas', label: 'Encontrar vagas', icon: '🔍' },
    { href: '/favoritos', label: 'Favoritas', icon: '⭐' },
    { href: '/alertas', label: 'Alertas', icon: '🔔' },
    { href: '/historico', label: 'Histórico', icon: '📜' },
    { href: '/whatsapp', label: 'WhatsApp', icon: '💬' },
    { href: '/perfil', label: 'Meu perfil', icon: '👤' },
    { href: '/configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <div
      className="md:hidden fixed inset-0 bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="h-8 bg-green-600 rounded-full flex items-center justify-center px-2">
              <span className="text-white text-xs font-bold">VZ</span>
            </div>
            <span className="text-lg font-bold text-gray-900">VagaZaps</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            ✕
          </button>
        </div>
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
            <li className="pt-2 mt-2 border-t border-gray-100">
              <button
                onClick={() => { logout(); onClose(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
              >
                <span className="text-lg">🚪</span>
                <span>Sair</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="md:ml-16">
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <main className="px-4 py-6 md:px-6 md:py-8 pb-24 md:pb-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      <MobileNav />

      {mobileMenuOpen && (
        <MobileSidebarOverlay onClose={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <JobsProvider>
      <FavoritesProvider>
        <NotificationsProvider>
          <DashboardShell>{children}</DashboardShell>
        </NotificationsProvider>
      </FavoritesProvider>
    </JobsProvider>
  )
}

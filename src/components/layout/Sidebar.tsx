'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/vagas', label: 'Encontrar vagas', icon: '🔍' },
  { href: '/minhas-vagas', label: 'Minhas vagas', icon: '📋' },
  { href: '/favoritas', label: 'Favoritas', icon: '⭐' },
  { href: '/alertas', label: 'Alertas', icon: '🔔' },
  { href: '/historico', label: 'Histórico', icon: '📜' },
  { href: '/whatsapp', label: 'WhatsApp', icon: '💬' },
  { href: '/perfil', label: 'Meu perfil', icon: '👤' },
  { href: '/configuracoes', label: 'Configurações', icon: '⚙️' },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 flex-col transition-all duration-300"
      style={{ width: expanded ? 256 : 64 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100">
        <div className="min-w-[32px] h-8 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">VZ</span>
        </div>
        {expanded && (
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
            VagaZaps
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg min-w-[24px] text-center">{item.icon}</span>
                  {expanded && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              </li>
            )
          })}

        </ul>
      </nav>

      <div className="border-t border-gray-100 p-2">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <span className="text-lg min-w-[24px] text-center">🚪</span>
          {expanded && <span className="whitespace-nowrap">Sair</span>}
        </button>
      </div>
    </aside>
  )
}

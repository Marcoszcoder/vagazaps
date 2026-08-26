'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1a12]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#4ade80]">VagaZaps</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#como-funciona" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#4ade80]">
            Como funciona
          </a>
          <a href="#planos" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#4ade80]">
            Planos
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#15803d] shadow-sm shadow-[#16a34a]/20"
          >
            Criar conta
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0a1a12] px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5">
              Como funciona
            </a>
            <a href="#planos" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5">
              Planos
            </a>
            <hr className="border-white/10 my-1" />
            <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5">
              Entrar
            </Link>
            <Link href="/cadastro" className="rounded-lg bg-[#16a34a] px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#15803d]">
              Criar conta
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

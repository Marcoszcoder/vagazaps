'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#16a34a]">VagaZaps</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#como-funciona" className="text-sm font-medium text-slate-700 transition-colors hover:text-[#16a34a]">
            Como funciona
          </a>
          <a href="#planos" className="text-sm font-medium text-slate-700 transition-colors hover:text-[#16a34a]">
            Planos
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]"
          >
            Criar conta
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
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
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Como funciona
            </a>
            <a href="#planos" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Planos
            </a>
            <hr className="border-slate-100 my-1" />
            <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
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

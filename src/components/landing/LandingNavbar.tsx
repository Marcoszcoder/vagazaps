'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 pl-3">
          <Image src="/iconezaps.png" alt="VagaZaps" width={36} height={36} className="rounded-lg hidden md:block" />
          <Image src="/iconezaps.png" alt="VagaZaps" width={24} height={24} className="rounded-lg md:hidden" />
          <span className="bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] bg-clip-text text-xl font-bold text-transparent md:text-2xl">VagaZaps</span>
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/login" className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-800">
            Entrar
          </Link>
          <Link href="/cadastro" className="rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] px-3 py-1 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md">
            Ativar
          </Link>
        </div>
      </div>
    </nav>
  )
}

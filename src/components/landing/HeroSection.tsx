'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a12] via-[#0f2918] to-[#16a34a]/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNmEzNGEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg0di0yaDEyem0tOC04djJINHYtMmg4em0xNiA0djJIMjR2LTJoMTJ6TTI0IDM4djJINGV2LTJoMTJ6bTgtNHYySDI4di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/30 bg-[#16a34a]/10 px-4 py-1.5 text-sm font-medium text-[#4ade80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              Monitorando vagas em tempo real
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Pare de procurar vagas.
              <br />
              <span className="text-[#4ade80]">Deixe elas encontrarem você.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
              Configure o emprego que você procura e receba novas oportunidades
              automaticamente, direto no seu WhatsApp. Sem esforço, sem perder tempo.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/cadastro"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/25 transition-all hover:bg-[#15803d] hover:shadow-[#16a34a]/40 hover:scale-[1.02] sm:w-auto"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Começar agora — é grátis
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Ver como funciona
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-slate-400">fontes de vagas</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-xs text-slate-400">atualização</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">automático</div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-[280px] rounded-[2rem] border-[3px] border-slate-600 bg-slate-800 p-3 shadow-2xl shadow-black/40 sm:w-[300px] md:w-[320px]">
              <div className="rounded-[1.5rem] bg-slate-900 p-1">
                <div className="rounded-[1.3rem] overflow-hidden bg-[#0b141a]">
                  <div className="flex items-center gap-3 bg-[#1f2c33] px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16a34a]">
                      <span className="text-sm font-bold text-white">VZ</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">
                        VagaZaps
                      </span>
                      <div className="text-[10px] text-slate-400">online agora</div>
                    </div>
                  </div>

                  <div className="space-y-2 p-4">
                    <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#1d2e35] p-3">
                      <div className="text-[10px] font-bold text-[#4ade80]">
                        🚀 NOVA VAGA ENCONTRADA
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-white">
                        Desenvolvedor Full Stack
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        📍 Curitiba — PR
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-300">
                        💰 R$ 6.500 — R$ 9.000
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 rounded-full bg-slate-700/50 h-1.5">
                          <div className="h-1.5 rounded-full bg-[#16a34a]" style={{ width: '92%' }} />
                        </div>
                        <span className="text-[10px] font-bold text-[#4ade80]">92%</span>
                      </div>
                      <div className="mt-2.5 rounded-lg bg-[#16a34a] px-3 py-1.5 text-center">
                        <span className="text-[10px] font-semibold text-white">
                          Ver vaga completa →
                        </span>
                      </div>
                    </div>

                    <div className="max-w-[75%] ml-auto rounded-lg rounded-tr-none bg-[#005c4b] p-2.5">
                      <p className="text-[11px] text-white">
                        Quero me candidatar! 👋
                      </p>
                      <div className="mt-1 text-right text-[9px] text-slate-300">
                        ✓✓ Lido
                      </div>
                    </div>

                    <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#1d2e35] p-3">
                      <div className="text-[10px] font-bold text-[#4ade80]">
                        🎯 PERFIL ATUALIZADO
                      </div>
                      <p className="mt-1.5 text-xs text-slate-300">
                        Você receberá vagas de <span className="font-semibold text-white">São Paulo</span> e <span className="font-semibold text-white">Curitiba</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

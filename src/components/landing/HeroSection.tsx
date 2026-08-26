'use client'

import Link from 'next/link'

function PhoneMockup() {
  return (
    <div className="w-[200px] sm:w-[230px] lg:w-[250px]">
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[3px] shadow-2xl shadow-black/20">
        <div className="rounded-[2.3rem] bg-slate-900 p-[2px]">
          <div className="relative rounded-[2.1rem] overflow-hidden bg-[#111b21]">
            {/* Dynamic island */}
            <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 pt-2">
              <div className="h-[10px] w-[50px] rounded-full bg-black" />
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1">
              <span className="text-[7px] font-semibold text-white">9:41</span>
              <div className="flex items-center gap-0.5">
                <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
              </div>
            </div>

            {/* Chat header */}
            <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2">
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-sm">
                <span className="text-[8px] font-bold text-white">VZ</span>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-semibold text-white">VagaZaps</span>
                <div className="text-[7px] text-[#22c55e]">● online</div>
              </div>
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Chat bg */}
            <div className="space-y-2 bg-[#0b141a] p-3 min-h-[280px]">
              {/* Date */}
              <div className="text-center">
                <span className="rounded-lg bg-[#182229] px-2 py-0.5 text-[7px] text-slate-400">HOJE</span>
              </div>

              {/* Job 1 */}
              <div className="max-w-[92%] rounded-lg rounded-tl-none bg-[#1d2e35] p-2.5">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[7px]">🎉</span>
                  <span className="text-[7px] font-bold text-[#22c55e]">NOVA VAGA ENCONTRADA</span>
                </div>
                <p className="text-[9px] font-bold text-white leading-tight">Desenvolvedor Full Stack</p>
                <p className="text-[7px] text-slate-300 mt-0.5">📍 Curitiba — PR</p>
                <p className="text-[7px] text-slate-300">💰 R$ 6.500 — R$ 9.000</p>
                <p className="text-[6px] text-slate-500 mt-0.5">🏢 TechCorp • CLT • Home Office</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" style={{ width: '92%' }} />
                  </div>
                  <span className="text-[7px] font-bold text-[#22c55e]">92%</span>
                </div>
                <div className="mt-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-2 py-1 text-center shadow-sm">
                  <span className="text-[7px] font-bold text-white">VER VAGA →</span>
                </div>
              </div>

              {/* User reply */}
              <div className="max-w-[65%] ml-auto rounded-lg rounded-tr-none bg-[#005c4b] p-2">
                <p className="text-[8px] text-white leading-tight">Quero me candidatar! 😍</p>
                <div className="mt-0.5 text-right text-[6px] text-blue-200">9:42 ✓✓</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center gap-1.5 bg-[#1f2c34] px-2 py-2">
              <div className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5">
                <span className="text-[7px] text-slate-500">Digite uma mensagem...</span>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LaptopMockup() {
  return (
    <div className="hidden sm:block w-[340px] lg:w-[460px]">
      {/* Screen */}
      <div className="relative rounded-t-xl bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 p-[3px] shadow-2xl shadow-black/20">
        <div className="rounded-t-lg bg-slate-800 p-[2px]">
          <div className="rounded-t-lg overflow-hidden bg-[#111b21]">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 bg-[#202c33] px-3 py-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 rounded-md bg-[#2a3942] px-3 py-0.5">
                <span className="text-[8px] text-slate-400">web.whatsapp.com</span>
              </div>
              <div className="flex gap-2">
                <svg className="h-2.5 w-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                <svg className="h-2.5 w-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16" /></svg>
                <svg className="h-2.5 w-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </div>

            <div className="flex h-[220px] lg:h-[280px]">
              {/* Sidebar */}
              <div className="w-[32%] border-r border-[#222d34] bg-[#111b21]">
                {/* Search */}
                <div className="px-2 py-2">
                  <div className="rounded-md bg-[#202c33] px-2 py-1.5 flex items-center gap-1.5">
                    <svg className="h-2.5 w-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span className="text-[7px] text-slate-500">Buscar</span>
                  </div>
                </div>
                {/* Active chat */}
                <div className="bg-[#2a3942] px-2 py-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-sm">
                    <span className="text-[8px] font-bold text-white">VZ</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-semibold text-white truncate">VagaZaps</p>
                    <p className="text-[7px] text-[#22c55e] truncate">🎉 NOVA VAGA ENCONTRADA...</p>
                  </div>
                  <span className="text-[6px] text-slate-400">09:41</span>
                </div>
                {/* Other chats */}
                <div className="px-2 py-2 flex items-center gap-2 border-t border-[#222d34]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-[8px] text-white">JR</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-medium text-white truncate">João R.</p>
                    <p className="text-[7px] text-slate-500 truncate">Oi, tudo bem?</p>
                  </div>
                </div>
                <div className="px-2 py-2 flex items-center gap-2 border-t border-[#222d34]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-[8px] text-white">MF</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-medium text-white truncate">Maria F.</p>
                    <p className="text-[7px] text-slate-500 truncate">Entendido, obrigada!</p>
                  </div>
                </div>
              </div>

              {/* Chat area */}
              <div className="flex-1 bg-[#0b141a] p-3 space-y-2">
                {/* Job 1 */}
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-[#1d2e35] p-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[7px]">🎉</span>
                    <span className="text-[7px] font-bold text-[#22c55e]">NOVA VAGA ENCONTRADA</span>
                  </div>
                  <p className="text-[8px] font-bold text-white leading-tight">Desenvolvedor Full Stack</p>
                  <p className="text-[7px] text-slate-300 mt-0.5">📍 Curitiba — PR • 💰 R$ 6.500 a R$ 9.000</p>
                  <p className="text-[6px] text-slate-500">🏢 TechCorp • CLT • Home Office</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" style={{ width: '92%' }} />
                    </div>
                    <span className="text-[7px] font-bold text-[#22c55e]">92%</span>
                  </div>
                  <div className="mt-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-2 py-1 text-center">
                    <span className="text-[7px] font-bold text-white">VER VAGA →</span>
                  </div>
                </div>

                {/* Job 2 */}
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-[#1d2e35] p-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[7px]">🎉</span>
                    <span className="text-[7px] font-bold text-[#22c55e]">NOVA VAGA ENCONTRADA</span>
                  </div>
                  <p className="text-[8px] font-bold text-white leading-tight">Analista de Marketing Digital</p>
                  <p className="text-[7px] text-slate-300 mt-0.5">📍 São Paulo — SP • 💰 R$ 3.800 a R$ 5.200</p>
                  <p className="text-[6px] text-slate-500">🏢 StartupX • CLT • Presencial</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" style={{ width: '87%' }} />
                    </div>
                    <span className="text-[7px] font-bold text-[#22c55e]">87%</span>
                  </div>
                  <div className="mt-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-2 py-1 text-center">
                    <span className="text-[7px] font-bold text-white">VER VAGA →</span>
                  </div>
                </div>

                {/* Job 3 */}
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-[#1d2e35] p-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[7px]">🎉</span>
                    <span className="text-[7px] font-bold text-[#22c55e]">NOVA VAGA ENCONTRADA</span>
                  </div>
                  <p className="text-[8px] font-bold text-white leading-tight">Suporte Técnico Nível 2</p>
                  <p className="text-[7px] text-slate-300 mt-0.5">📍 Remoto • 💰 R$ 4.200</p>
                  <p className="text-[6px] text-slate-500">🏢 CloudHost • PJ • Remoto</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" style={{ width: '80%' }} />
                    </div>
                    <span className="text-[7px] font-bold text-[#22c55e]">80%</span>
                  </div>
                  <div className="mt-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-2 py-1 text-center">
                    <span className="text-[7px] font-bold text-white">VER VAGA →</span>
                  </div>
                </div>

                {/* User reply */}
                <div className="max-w-[50%] ml-auto rounded-lg rounded-tr-none bg-[#005c4b] p-2">
                  <p className="text-[8px] text-white leading-tight">Quero a vaga de Curitiba! 🔥</p>
                  <div className="mt-0.5 text-right text-[6px] text-blue-200">09:42 ✓✓</div>
                </div>

                {/* Reply */}
                <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#1d2e35] p-2">
                  <p className="text-[8px] text-slate-300 leading-tight">Perfeito! Cliquei em &quot;VER VAGA&quot; e te redirecionei para a página da vaga. Boa sorte! 🍀</p>
                  <div className="mt-0.5 text-[6px] text-slate-500">09:42</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Laptop hinge + base */}
      <div className="mx-auto h-1.5 bg-gradient-to-b from-slate-700 to-slate-800" style={{ width: '85%' }} />
      <div className="mx-auto rounded-b-lg bg-gradient-to-b from-slate-700 to-slate-800 p-1">
        <div className="mx-auto h-1 rounded-full bg-slate-600/50" style={{ width: '40%' }} />
      </div>
      <div className="mx-auto h-2 rounded-b-2xl bg-gradient-to-b from-slate-800 to-slate-900" style={{ width: '110%' }} />
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="relative mb-4 inline-block rounded-full bg-gradient-to-r from-[#22c55e] to-[#86efac] px-4 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
            <span className="relative z-10">Robô automático</span>
          </span>
          <h1
            className="text-[32px] leading-[40px] tracking-tight text-[#0f172a] sm:text-[40px] sm:leading-[50px] md:text-[50px] md:leading-[62px] lg:text-[51px] lg:leading-[64px]"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
          >
            Pare de <span className="text-[#ef4444]">perder</span> vagas
            <br />
            que poderiam mudar sua <span className="text-[#16a34a]">vida</span>.
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl lg:mx-auto"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: 'lab(48.496 0 0)' }}
          >
            Você já perdeu vagas incríveis por não conseguir acompanhar dezenas de sites de emprego? Enquanto você cuida da sua rotina, novas oportunidades continuam surgindo. Nosso robô fica de olho por você e envia as vagas direto no seu WhatsApp.
          </p>
          <div className="mt-8 flex flex-row items-center justify-center gap-3">
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#22c55e]/30"
            >
              <svg className="relative z-10 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10">Ativar Alerta</span>
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
            >
              <span className="relative z-10">Ver como funciona</span>
            </a>
          </div>
        </div>

        {/* Device mockups */}
        <div className="relative mt-16 flex items-end justify-center gap-6 lg:gap-10">
          {/* Decorative background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[300px] w-[300px] rounded-full bg-[#22c55e]/5 blur-3xl lg:h-[400px] lg:w-[400px]" />
          </div>
          <div className="absolute top-10 left-[15%] pointer-events-none">
            <div className="h-16 w-16 rounded-2xl border border-[#22c55e]/10 bg-[#22c55e]/5 rotate-12 blur-[1px]" />
          </div>
          <div className="absolute bottom-20 right-[12%] pointer-events-none">
            <div className="h-12 w-12 rounded-full border border-[#22c55e]/10 bg-[#22c55e]/5 -rotate-6 blur-[1px]" />
          </div>
          <div className="absolute top-1/2 right-[8%] pointer-events-none hidden lg:block">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[10px] font-medium text-slate-500">3 vagas hoje</span>
            </div>
          </div>
          <div className="absolute top-1/3 left-[10%] pointer-events-none hidden lg:block">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <svg className="h-3 w-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span className="text-[10px] font-medium text-slate-500">92% match</span>
            </div>
          </div>
          <PhoneMockup />
          <LaptopMockup />
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className="text-2xl leading-tight tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
          >
            Pare de <span className="text-[#dc2626]">perder</span> vagas
            <br />
            que poderiam mudar sua <span className="text-[#15803d]">vida</span>.
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base lg:mx-auto"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, color: 'lab(48.496 0 0)' }}
          >
            Você já perdeu vagas incríveis por não conseguir acompanhar dezenas de sites de emprego? Enquanto você cuida da sua rotina, novas oportunidades continuam surgindo. Nosso robô fica de olho por você e envia as vagas direto no seu WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/cadastro"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#15803d] sm:w-auto"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Começar agora — é grátis
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#16a34a] px-6 py-3 text-sm font-semibold text-[#16a34a] transition-all hover:bg-[#16a34a] hover:text-white sm:w-auto"
            >
              Ver como funciona
            </a>
          </div>
        </div>

        {/* Device mockups */}
        <div className="relative mt-16 flex items-end justify-center gap-6 lg:gap-10">
          {/* Phone */}
          <div className="w-[200px] sm:w-[240px] lg:w-[260px]">
            <div className="rounded-[2rem] border-[3px] border-slate-300 bg-slate-100 p-2 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-1">
                <div className="rounded-[1.3rem] overflow-hidden bg-[#e5ddd5]">
                  <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#16a34a]">
                      <span className="text-[9px] font-bold text-white">VZ</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-white">VagaZaps</span>
                      <div className="text-[8px] text-slate-300">online</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 p-3">
                    <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white p-2 shadow-sm">
                      <div className="text-[7px] font-bold text-[#16a34a]">🚀 NOVA VAGA</div>
                      <p className="mt-1 text-[8px] font-semibold text-[#1e293b]">Desenvolvedor Full Stack</p>
                      <p className="text-[7px] text-slate-500">📍 Curitiba — PR</p>
                      <p className="text-[7px] text-slate-500">💰 R$ 6.500 — R$ 9.000</p>
                      <div className="mt-1 rounded bg-[#dcf8c6] px-1 py-0.5 text-center">
                        <span className="text-[7px] font-bold text-[#16a34a]">92%</span>
                      </div>
                    </div>

                    <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white p-2 shadow-sm">
                      <div className="text-[7px] font-bold text-[#16a34a]">🚀 NOVA VAGA</div>
                      <p className="mt-1 text-[8px] font-semibold text-[#1e293b]">Analista de Marketing</p>
                      <p className="text-[7px] text-slate-500">📍 São Paulo — SP</p>
                      <p className="text-[7px] text-slate-500">💰 R$ 3.800</p>
                      <div className="mt-1 rounded bg-[#dcf8c6] px-1 py-0.5 text-center">
                        <span className="text-[7px] font-bold text-[#16a34a]">87%</span>
                      </div>
                    </div>

                    <div className="max-w-[70%] ml-auto rounded-lg rounded-tr-none bg-[#dcf8c6] p-2 text-right">
                      <p className="text-[8px] text-[#1e293b]">Quero me candidatar! 👋</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop */}
          <div className="hidden sm:block w-[380px] lg:w-[480px]">
            <div className="rounded-t-xl border-[3px] border-b-0 border-slate-300 bg-slate-100 p-1 shadow-xl">
              <div className="rounded-t-lg bg-white">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="flex gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 rounded bg-slate-200 px-3 py-1 text-[9px] text-slate-500">
                    web.whatsapp.com
                  </div>
                </div>

                {/* WhatsApp Web content */}
                <div className="flex h-[200px] lg:h-[260px]">
                  {/* Chat list */}
                  <div className="w-[35%] border-r border-slate-100 bg-white">
                    <div className="border-b border-slate-100 bg-[#075e54] px-2 py-2">
                      <span className="text-[9px] font-semibold text-white">VagaZaps</span>
                    </div>
                    <div className="border-b border-slate-100 bg-[#16a34a]/10 px-2 py-1.5">
                      <p className="text-[8px] font-semibold text-[#1e293b]">VagaZaps</p>
                      <p className="text-[7px] text-slate-500">🚀 NOVA VAGA ENCONTRADA...</p>
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-[8px] font-semibold text-[#1e293b]">Contato</p>
                      <p className="text-[7px] text-slate-500">Oi, tudo bem?</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 bg-[#e5ddd5] p-3 space-y-2">
                    <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-[#16a34a]">🚀 NOVA VAGA ENCONTRADA</div>
                      <p className="mt-1 text-[9px] font-semibold text-[#1e293b]">Desenvolvedor Full Stack</p>
                      <p className="text-[7px] text-slate-500">📍 Curitiba — PR | 💰 R$ 6.500</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="flex-1 rounded-full bg-slate-200 h-1">
                          <div className="h-1 rounded-full bg-[#16a34a]" style={{ width: '92%' }} />
                        </div>
                        <span className="text-[7px] font-bold text-[#16a34a]">92%</span>
                      </div>
                    </div>

                    <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-[#16a34a]">🚀 NOVA VAGA ENCONTRADA</div>
                      <p className="mt-1 text-[9px] font-semibold text-[#1e293b]">Analista de Marketing Digital</p>
                      <p className="text-[7px] text-slate-500">📍 São Paulo — SP | 💰 R$ 3.800</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="flex-1 rounded-full bg-slate-200 h-1">
                          <div className="h-1 rounded-full bg-[#16a34a]" style={{ width: '87%' }} />
                        </div>
                        <span className="text-[7px] font-bold text-[#16a34a]">87%</span>
                      </div>
                    </div>

                    <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-[#16a34a]">🚀 NOVA VAGA ENCONTRADA</div>
                      <p className="mt-1 text-[9px] font-semibold text-[#1e293b]">Suporte Técnico Nível 2</p>
                      <p className="text-[7px] text-slate-500">📍 Remoto | 💰 R$ 4.200</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="flex-1 rounded-full bg-slate-200 h-1">
                          <div className="h-1 rounded-full bg-[#16a34a]" style={{ width: '80%' }} />
                        </div>
                        <span className="text-[7px] font-bold text-[#16a34a]">80%</span>
                      </div>
                    </div>

                    <div className="max-w-[60%] ml-auto rounded-lg rounded-tr-none bg-[#dcf8c6] p-2 text-right">
                      <p className="text-[8px] text-[#1e293b]">Quero me candidatar! 👋</p>
                      <div className="text-right text-[6px] text-slate-400">✓✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div className="mx-auto h-2 rounded-b-lg bg-gradient-to-b from-slate-300 to-slate-400" style={{ width: '110%' }} />
            <div className="mx-auto h-3 rounded-b-xl bg-slate-400" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

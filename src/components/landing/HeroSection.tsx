'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl leading-tight tracking-tight text-[#1e293b] sm:text-4xl md:text-5xl lg:text-5xl" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}>
              Pare de perder vagas
              <br />
              que poderiam mudar sua vida.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-slate-600 lg:mx-0" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: 'lab(48.496 0 0)' }}>
              Você já perdeu vagas incríveis por não conseguir ficar de olho em mais de 20 sites de emprego ao mesmo tempo? Enquanto você estuda ou cuida da sua rotina, novas vagas continuam sendo publicadas. Nosso robô fica de olho por você e envia as melhores oportunidades direto no seu WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/cadastro"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/25 transition-all hover:bg-[#15803d] hover:shadow-[#16a34a]/40 sm:w-auto"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Começar agora — é grátis
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#16a34a] px-8 py-4 text-base font-semibold text-[#16a34a] transition-all hover:bg-[#16a34a] hover:text-white sm:w-auto"
              >
                Ver como funciona
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-[280px] rounded-[2rem] border-[3px] border-slate-300 bg-slate-100 p-3 shadow-xl sm:w-[300px] md:w-[320px]">
              <div className="rounded-[1.5rem] bg-white p-1">
                <div className="rounded-[1.3rem] overflow-hidden bg-[#e5ddd5]">
                  <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16a34a]">
                      <span className="text-sm font-bold text-white">VZ</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      VagaZaps
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
                      <div className="text-[10px] font-bold text-[#16a34a]">
                        🚀 NOVA VAGA ENCONTRADA
                      </div>
                      <p className="mt-2 text-xs font-medium text-[#1e293b]">
                        Desenvolvedor Full Stack
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        📍 Curitiba — PR
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        💰 R$ 6.500 — R$ 9.000
                      </p>
                      <div className="mt-2 rounded bg-[#dcf8c6] px-2 py-1 text-center">
                        <span className="text-[10px] font-bold text-[#16a34a]">
                          Compatibilidade: 92%
                        </span>
                      </div>
                      <div className="mt-2 rounded bg-[#16a34a] px-2 py-1.5 text-center">
                        <span className="text-[10px] font-semibold text-white">
                          [Ver vaga]
                        </span>
                      </div>
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

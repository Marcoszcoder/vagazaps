'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1e293b] sm:text-4xl md:text-5xl lg:text-5xl">
              Pare de procurar vagas. Deixe elas encontrarem você.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 lg:mx-0">
              Configure o emprego que você procura e receba novas oportunidades
              automaticamente, direto no seu WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/cadastro"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#16a34a] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 sm:w-auto"
              >
                Quero encontrar meu emprego
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#16a34a] px-8 py-3.5 text-base font-semibold text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white sm:w-auto"
              >
                Ver como funciona
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
                        🚨 NOVA VAGA ENCONTRADA
                      </div>
                      <p className="mt-2 text-xs font-medium text-[#1e293b]">
                        Auxiliar Administrativo
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        📍 Rondonópolis - MT
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        💰 R$ 2.300
                      </p>
                      <div className="mt-2 rounded bg-[#dcf8c6] px-2 py-1 text-center">
                        <span className="text-[10px] font-bold text-[#16a34a]">
                          Compatibilidade: 94%
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

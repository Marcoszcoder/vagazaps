import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Crie sua conta na VagaZaps',
      description:
        'Cadastre-se em segundos e configure suas preferências de emprego.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Diga o que você procura',
      description:
        'Escolha cidade, profissão, salário e preferências. Quanto mais específico, melhores os resultados.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Receba vagas no WhatsApp',
      description:
        'Quando uma vaga compatível aparece, você recebe uma notificação automaticamente. Sem precisar abrir nenhum app.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
  ]

  return (
    <section id="como-funciona" className="relative bg-[#fafbfc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#16a34a]/10 px-4 py-1.5 text-sm font-semibold text-[#16a34a]">
            Simples e rápido
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl lg:text-5xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Três passos para começar a receber vagas no WhatsApp.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#16a34a]/20 via-[#16a34a]/40 to-[#16a34a]/20 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/20">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-lg shadow-[#16a34a]/20">
                      {step.icon}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a]/10 text-sm font-bold text-[#16a34a]">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#1e293b]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-[#16a34a]/40 lg:block">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#22c55e]/30"
          >
            Começar agora
          </Link>
        </div>
      </div>
    </section>
  )
}

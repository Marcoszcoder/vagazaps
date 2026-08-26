import Link from 'next/link'

export default function PricingSection() {
  const essentialFeatures = [
    'Vagas personalizadas',
    '1 cidade',
    'Até 3 cargos',
    'Filtro de salário',
    'Alertas no WhatsApp',
    'Favoritos',
    'Histórico de vagas',
  ]

  const proFeatures = [
    'Tudo do Essencial',
    'Várias cidades',
    'Mais cargos',
    'Filtros avançados',
    'Modalidade de trabalho',
    'Experiência',
    'Alertas prioritários',
    'Maior personalização',
  ]

  return (
    <section id="planos" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#16a34a]/10 px-4 py-1.5 text-sm font-semibold text-[#16a34a]">
            Planos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl lg:text-5xl">
            Escolha o plano ideal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Comece grátis e evolua quando quiser.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-xl font-bold text-[#1e293b]">
              Essencial
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Para quem está começando a buscar emprego.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-[#1e293b]">R$19,90</span>
              <span className="text-sm text-slate-500">/mês</span>
            </div>
            <ul className="mt-8 space-y-3">
              {essentialFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[#16a34a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/cadastro"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border-2 border-[#16a34a] px-6 py-3 text-sm font-semibold text-[#16a34a] transition-all hover:bg-[#16a34a] hover:text-white"
            >
              Começar agora
            </Link>
          </div>

          <div className="relative rounded-2xl border-2 border-[#16a34a] bg-white p-8 shadow-lg shadow-[#16a34a]/10 ring-1 ring-[#16a34a]/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full bg-[#16a34a] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                Mais popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#1e293b]">
              Pro
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Para quem quer acesso ilimitado e mais controle.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-[#1e293b]">R$35,50</span>
              <span className="text-sm text-slate-500">/mês</span>
            </div>
            <ul className="mt-8 space-y-3">
              {proFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[#16a34a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/cadastro"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#16a34a]/25 transition-all hover:bg-[#15803d] hover:shadow-[#16a34a]/40"
            >
              Quero o Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function BenefitsSection() {
  const benefits = [
    {
      icon: '🚀',
      title: 'Não perca oportunidades',
      description:
        'Você não precisa lembrar de procurar vagas todos os dias.',
    },
    {
      icon: '🎯',
      title: 'Tudo filtrado',
      description:
        'Receba apenas oportunidades de acordo com suas preferências.',
    },
    {
      icon: '⏱️',
      title: 'Economize tempo',
      description: 'Não precisa ficar abrindo vários sites.',
    },
    {
      icon: '⚡',
      title: 'Alertas rápidos',
      description:
        'Quando uma nova oportunidade compatível estiver disponível, você será avisado.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
            Por que usar o VagaZaps?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Pensamos em tudo para facilitar sua busca por emprego.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-colors hover:border-[#16a34a]/30 hover:bg-[#16a34a]/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16a34a]/10 text-2xl">
                {benefit.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1e293b]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

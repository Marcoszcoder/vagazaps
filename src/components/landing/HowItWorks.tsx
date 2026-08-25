export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Diga o que você procura',
      icon: '🎯',
      description:
        'Escolha sua cidade, profissão, salário e preferências.',
    },
    {
      number: '02',
      title: 'Nós monitoramos as oportunidades',
      icon: '🔍',
      description:
        'O VagaZaps identifica novas vagas disponíveis nas fontes cadastradas.',
    },
    {
      number: '03',
      title: 'Você recebe o alerta',
      icon: '📲',
      description:
        'Quando uma vaga compatível aparece, você recebe uma notificação.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Três passos simples para começar a receber vagas no WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#16a34a]/10 text-3xl">
                {step.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#1e293b]">
                <span className="text-[#16a34a]">{step.number}</span> —{' '}
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              🌐 Fontes
            </div>
            <span className="text-2xl text-[#16a34a]">→</span>
            <div className="rounded-xl border-2 border-[#16a34a] bg-[#16a34a]/10 px-6 py-3 text-sm font-bold text-[#16a34a] shadow-sm">
              ⚡ VagaZaps
            </div>
            <span className="text-2xl text-[#16a34a]">→</span>
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              📲 WhatsApp
            </div>
          </div>
          <p className="text-center text-sm text-slate-500">
            Monitoramos as melhores fontes de vagas e enviamos para você.
          </p>
        </div>
      </div>
    </section>
  )
}

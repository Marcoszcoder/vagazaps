const testimonials = [
  {
    name: 'Ana Carolina',
    role: 'Auxiliar Administrativo — SP',
    text: 'Consegui minha vaga atual pelo VagaZaps! Recebi a notificação no WhatsApp e me candidatei na hora. Muito prático.',
    rating: 5,
  },
  {
    name: 'Rafael Santos',
    role: 'Desenvolvedor Full Stack — PR',
    text: 'Economizo pelo menos 1 hora por dia. Antes eu ficava abrindo 3 sites diferentes. Agora tudo chega no WhatsApp.',
    rating: 5,
  },
  {
    name: 'Mariana Oliveira',
    role: 'Assistente de Enfermagem — RJ',
    text: 'O filtro de salário é ótimo. Recebo só vagas que pagam o que eu preciso. Não perco tempo mais.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#fafbfc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#16a34a]/10 px-4 py-1.5 text-sm font-semibold text-[#16a34a]">
            Depoimentos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl lg:text-5xl">
            Quem já usa, recomenda
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Veja o que nossos usuários dizem sobre o VagaZaps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a]/10 text-sm font-bold text-[#16a34a]">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1e293b]">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

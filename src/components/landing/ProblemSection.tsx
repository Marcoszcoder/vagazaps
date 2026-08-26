export default function ProblemSection() {
  return (
    <section className="bg-[#fafbfc] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-[#16a34a]/30 bg-[#16a34a]/10 px-5 py-1.5 text-xs font-semibold tracking-wider text-[#16a34a] uppercase">
            — Fica sempre atualizado —
          </span>
        </div>

        <div className="mt-6 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1e293b]"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
          >
            🤖 O robô que procura vagas enquanto você vive sua rotina
          </h2>
        </div>

        <div className="mt-20 relative">

          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-red-200 via-red-300 to-[#16a34a]/30 sm:block" />

          <div className="space-y-14">

            {/* Problem 1 */}
            <div className="relative sm:pl-12">
              <div className="absolute left-0 top-0 hidden sm:flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-red-200 bg-white text-xs font-bold text-red-500 shadow-sm">
                01
              </div>
              <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 sm:hidden mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">01</span>
                </div>
                <h3
                  className="text-base font-bold text-[#1e293b]"
                  style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
                >
                  Dezenas de sites para acompanhar
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                  LinkedIn, Gupy, Catho, Indeed e vários outros lugares publicam novas vagas todos os dias. É impossível ficar abrindo tudo o tempo inteiro para descobrir o que acabou de sair.
                </p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="relative sm:pl-12">
              <div className="absolute left-0 top-0 hidden sm:flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-red-200 bg-white text-xs font-bold text-red-500 shadow-sm">
                02
              </div>
              <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 sm:hidden mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">02</span>
                </div>
                <h3
                  className="text-base font-bold text-[#1e293b]"
                  style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
                >
                  A vaga pode aparecer quando você está ocupado
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                    Você está trabalhando. Estudando. Dormindo. Resolvendo sua rotina.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                    Enquanto isso, uma nova vaga pode ser publicada.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                    Quando você finalmente entrar no site, ela pode estar perdida entre dezenas de outras.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="relative sm:pl-12">
              <div className="absolute left-0 top-0 hidden sm:flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-red-200 bg-white text-xs font-bold text-red-500 shadow-sm">
                03
              </div>
              <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 sm:hidden mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">03</span>
                </div>
                <h3
                  className="text-base font-bold text-[#1e293b]"
                  style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
                >
                  Você acaba procurando quando lembra
                </h3>
                <div className="mt-2 space-y-1.5">
                  <p className="text-sm text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>Um dia você procura.</p>
                  <p className="text-sm text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>No outro, está ocupado.</p>
                  <p className="text-sm text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>Depois esquece.</p>
                  <p className="text-sm text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>E a busca começa novamente.</p>
                </div>
                <p className="mt-3 text-sm italic text-slate-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Não deveria ser sua obrigação ficar procurando vagas todos os dias.
                </p>
              </div>
            </div>

          </div>

          {/* Solution card */}
          <div className="mt-16 relative sm:pl-12">
            <div className="absolute left-0 top-0 hidden sm:flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[#16a34a] bg-[#16a34a] text-xs font-bold text-white shadow-sm shadow-[#16a34a]/20">
              ✓
            </div>
            <div className="rounded-xl border-2 border-[#16a34a]/30 bg-gradient-to-br from-[#16a34a]/5 to-white p-8 text-center shadow-md shadow-[#16a34a]/5">
              <h2
                className="text-xl sm:text-2xl font-bold tracking-tight text-[#1e293b]"
                style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
              >
                🤖 É aí que entra o <span className="text-[#16a34a]">VagaZaps</span>.
              </h2>
              <div className="mx-auto mt-5 max-w-md space-y-2">
                <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                  Nosso robô fica de olho nas oportunidades por você.
                </p>
                <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                  Quando uma nova vaga que corresponde ao que você procura aparece, ela chega direto no seu WhatsApp.
                </p>
                <p className="text-sm font-medium text-[#1e293b]" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  Você continua sua rotina. O VagaZaps continua procurando.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

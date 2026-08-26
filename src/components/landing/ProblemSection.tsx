export default function ProblemSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1e293b]"
            style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
          >
            🤖 O robô que procura vagas enquanto você vive sua rotina
          </h2>
        </div>

        <div className="mt-16 space-y-16">

          {/* Problem 1 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">01</span>
              <h3
                className="text-lg font-bold text-[#1e293b]"
                style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
              >
                Dezenas de sites para acompanhar
              </h3>
            </div>
            <p className="mt-3 pl-11 text-[15px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              LinkedIn, Gupy, Catho, Indeed e vários outros lugares publicam novas vagas todos os dias.
              É impossível ficar abrindo tudo o tempo inteiro para descobrir o que acabou de sair.
            </p>
          </div>

          {/* Problem 2 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">02</span>
              <h3
                className="text-lg font-bold text-[#1e293b]"
                style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
              >
                A vaga pode aparecer quando você está ocupado
              </h3>
            </div>
            <p className="mt-3 pl-11 text-[15px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Você está trabalhando. Estudando. Dormindo. Resolvendo sua rotina.
            </p>
            <p className="mt-2 pl-11 text-[15px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Enquanto isso, uma nova vaga pode ser publicada.
            </p>
            <p className="mt-2 pl-11 text-[15px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Quando você finalmente entrar no site, ela pode estar perdida entre dezenas de outras.
            </p>
          </div>

          {/* Problem 3 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">03</span>
              <h3
                className="text-lg font-bold text-[#1e293b]"
                style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
              >
                Você acaba procurando quando lembra
              </h3>
            </div>
            <div className="mt-3 pl-11 space-y-2">
              <p className="text-[15px] text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                Um dia você procura.
              </p>
              <p className="text-[15px] text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                No outro, está ocupado.
              </p>
              <p className="text-[15px] text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                Depois esquece.
              </p>
              <p className="text-[15px] text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
                E a busca começa novamente.
              </p>
            </div>
            <p className="mt-4 pl-11 text-[15px] font-medium italic text-slate-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Não deveria ser sua obrigação ficar procurando vagas todos os dias.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200" />

          {/* Solution */}
          <div className="text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1e293b]"
              style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 800 }}
            >
              🤖 É aí que entra o <span className="text-[#16a34a]">VagaZaps</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Nosso robô fica de olho nas oportunidades por você.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Quando uma nova vaga que corresponde ao que você procura aparece, ela chega direto no seu WhatsApp.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Você continua sua rotina. O VagaZaps continua procurando.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

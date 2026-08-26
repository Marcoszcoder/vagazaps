import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a12] via-[#0f2918] to-[#16a34a]/20 py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNmEzNGEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg0di0yaDEyem0tOC04djJINHYtMmg4em0xNiA0djJIMjR2LTJoMTJ6TTI0IDM4djJINGV2LTJoMTJ6bTgtNHYySDI4di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Seu próximo emprego pode
          <br />
          aparecer <span className="text-[#4ade80]">hoje</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
          Configure seus interesses e deixe o VagaZaps fazer a busca por você.
          É rápido, gratuito e automático.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#16a34a] shadow-lg shadow-black/20 transition-all hover:bg-slate-100 hover:scale-[1.02]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Começar agora — é grátis
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
          >
            Já tenho conta
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Sem cartão de crédito
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Cancele quando quiser
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Setup em 2 minutos
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="bg-[#16a34a] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Seu próximo emprego pode aparecer hoje.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Configure seus interesses e deixe o VagaZaps fazer a busca por você.
        </p>
        <Link
          href="/cadastro"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-[#16a34a] shadow-sm transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#16a34a]"
        >
          Começar agora
        </Link>
      </div>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-bold text-[#16a34a]">VagaZaps</span>
            <p className="mt-3 text-sm text-slate-400">
              As vagas que combinam com você, direto no seu WhatsApp.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#como-funciona" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#planos" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Planos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Conta
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/login" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Entrar
                </a>
              </li>
              <li>
                <a href="/cadastro" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Criar conta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 VagaZaps. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

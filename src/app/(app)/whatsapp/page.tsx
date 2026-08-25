'use client'

export default function WhatsAppPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            Integração em desenvolvimento
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <p className="text-gray-600 leading-relaxed">
          Em breve você receberá suas vagas diretamente no WhatsApp. Estamos trabalhando para tornar a integração rápida e segura.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-80 bg-[#ECE5DD] rounded-3xl overflow-hidden shadow-xl border-4 border-gray-800">
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              VZ
            </div>
            <div>
              <p className="text-white font-semibold text-sm">VagaZaps</p>
              <p className="text-green-200 text-xs">online</p>
            </div>
          </div>

          <div className="px-3 py-4 space-y-3 min-h-[320px]">
            <div className="flex justify-center">
              <span className="text-[10px] text-gray-500 bg-white/70 px-2 py-0.5 rounded-full">
                HOJE
              </span>
            </div>

            <div className="flex">
              <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-sm text-gray-800">🚨 Nova vaga encontrada!</p>
                <p className="text-[10px] text-gray-400 text-right mt-1">09:30</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-sm text-gray-800 font-medium">Analista de Suporte TI</p>
                <p className="text-sm text-gray-600 mt-1">
                  📍 Rondonópolis - MT<br />
                  💰 R$3.000
                </p>
                <p className="text-sm text-gray-800 mt-2">
                  Compatibilidade: <span className="text-green-600 font-bold">94%</span>
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-1">09:30</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-sm text-gray-800">
                  👉 Ver vaga:{' '}
                  <span className="text-blue-600 underline">Abrir oportunidade</span>
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-1">09:31</p>
              </div>
            </div>
          </div>

          <div className="bg-white px-3 py-2.5 flex items-center gap-2 border-t border-gray-200">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
              Digite uma mensagem...
            </div>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 text-center">
        <p className="text-sm text-gray-500">
          Esta é uma simulação. A integração real com WhatsApp será disponibilizada em breve.
        </p>
      </div>
    </div>
  )
}

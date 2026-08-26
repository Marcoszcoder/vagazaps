'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function WhatsAppPage() {
  const { user, updateUser } = useAuth()
  const [phone, setPhone] = useState(user?.phone || '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    setSaved(false)
    setError('')
  }

  function handleSave() {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) {
      setError('Número inválido. Use o formato: (DDD) 99999-9999')
      return
    }
    if (!digits.startsWith('55')) {
      updateUser({ phone: `55${digits}` })
    } else {
      updateUser({ phone: digits })
    }
    setSaved(true)
    setError('')
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
        <p className="text-gray-500 mt-1">Informe seu número para receber notificações de vagas.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seu número de WhatsApp</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(66) 99999-9999"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Formato: (DDD) 99999-9999</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">Número salvo com sucesso!</p>
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Salvar número
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Como funciona</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <span className="text-lg">1️⃣</span>
            <p>Informe seu <strong>número de WhatsApp</strong> acima</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2️⃣</span>
            <p>Nossa equipe enviará vagas <strong>compatíveis com seu perfil</strong></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3️⃣</span>
            <p>Você receberá as vagas <strong>direto no WhatsApp</strong></p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <strong>Nota:</strong> A conexão do WhatsApp é feita pelo administrador do sistema.
          Você apenas precisa informar seu número para receber as notificações.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Plan } from '@/lib/types'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

const PLAN_STYLES: Record<Plan, { bg: string; text: string; label: string }> = {
  FREE: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Gratuito' },
  ESSENTIAL: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Essential' },
  PRO: { bg: 'bg-green-50', text: 'text-green-700', label: 'Pro' },
}

export default function PerfilPage() {
  const { user, updateUser, isLoading } = useAuth()
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [city, setCity] = useState(user?.city || '')
  const [state, setState] = useState(user?.state || '')

  if (isLoading || !user) {
    return <LoadingSpinner text="Carregando perfil..." />
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const planStyle = PLAN_STYLES[user.plan]

  function handleSave() {
    updateUser({ name, email, phone, city, state })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="text-gray-500 mt-1">Gerencie suas informações pessoais.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${planStyle.bg} ${planStyle.text}`}>
            {user.plan}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white text-sm"
              >
                <option value="">Selecione</option>
                {BRAZILIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {saved && (
          <div className="mt-4 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={handleSave} className="flex-1">
            Salvar alterações
          </Button>
          <Button variant="outline" onClick={() => router.push('/onboarding')} className="flex-1">
            Editar preferências
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Plano atual</h3>
        <p className="text-sm text-gray-500 mb-3">
          VagaZaps <span className={`font-bold ${planStyle.text}`}>{user.plan}</span>
        </p>
        {user.plan !== 'PRO' && (
          <Button variant="outline" size="sm" onClick={() => router.push('/onboarding')}>
            Fazer upgrade
          </Button>
        )}
        {user.plan === 'PRO' && (
          <p className="text-xs text-gray-400">Você já tem acesso a todos os recursos.</p>
        )}
      </div>
    </div>
  )
}

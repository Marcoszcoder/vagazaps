'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserAlerts, addAlert, toggleAlert } from '@/lib/mock/alerts'
import { JobAlert } from '@/lib/types'
import EmptyState from '@/components/ui/EmptyState'

export default function AlertasPage() {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<JobAlert[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newSalary, setNewSalary] = useState('')

  useEffect(() => {
    if (user) {
      setAlerts(getUserAlerts(user.id))
    }
  }, [user])

  function handleToggle(id: string) {
    toggleAlert(id)
    if (user) setAlerts([...getUserAlerts(user.id)])
  }

  function handleCreate() {
    if (!user || !newTitle.trim() || !newCity.trim()) return
    addAlert({
      userId: user.id,
      jobTitle: newTitle.trim(),
      city: newCity.trim(),
      salaryMin: parseInt(newSalary.replace(/[^\d]/g, '')) || 0,
      active: true,
    })
    setAlerts([...getUserAlerts(user.id)])
    setNewTitle('')
    setNewCity('')
    setNewSalary('')
    setShowForm(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          + Criar novo alerta
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Novo alerta</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Título da vaga</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Analista de TI"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Cidade</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Ex: Cuiabá"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Salário mínimo</label>
              <input
                type="text"
                value={newSalary}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, '')
                  setNewSalary(raw ? parseInt(raw).toLocaleString('pt-BR') : '')
                }}
                placeholder="R$ 0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!newTitle.trim() || !newCity.trim()}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Criar alerta
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{alert.jobTitle}</p>
                <p className="text-sm text-gray-500 mt-0.5">📍 {alert.city}</p>
                {alert.salaryMin > 0 && (
                  <p className="text-sm text-green-600 mt-0.5">
                    💰 R$ {alert.salaryMin.toLocaleString('pt-BR')}
                  </p>
                )}
              </div>

              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                alert.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {alert.active ? '🟢 Ativo' : '🔴 Inativo'}
              </span>

              <button
                onClick={() => handleToggle(alert.id)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  alert.active ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    alert.active ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <EmptyState
            icon="🔔"
            title="Nenhum alerta configurado"
            description="Crie alertas para ser notificado quando surgirem vagas que combinam com você."
            action={{ label: 'Criar alerta', onClick: () => setShowForm(true) }}
          />
        )
      )}
    </div>
  )
}

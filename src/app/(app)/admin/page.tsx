'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import { useNotifications } from '@/contexts/NotificationsContext'
import StatsCard from '@/components/ui/StatsCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getAllUsers } from '@/lib/mock/users'
import { getAllSources } from '@/lib/mock/sources'

interface CollectionResult {
  success: boolean
  newJobs: number
  totalNotifications: number
  results: { sourceName: string; collected: number; newJobs: number; error?: string }[]
}

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { jobs, refreshJobs } = useJobs()
  const { notifications } = useNotifications()
  const router = useRouter()
  const [collecting, setCollecting] = useState(false)
  const [collectionResult, setCollectionResult] = useState<CollectionResult | null>(null)
  const [collectionError, setCollectionError] = useState('')

  if (authLoading) return <LoadingSpinner text="Carregando painel..." />

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">🔒</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso restrito</h2>
        <p className="text-sm text-gray-500">Faça login para acessar o painel administrativo.</p>
      </div>
    )
  }

  if (!user.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">🔒</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso restrito</h2>
        <p className="text-sm text-gray-500 mb-4">Apenas administradores podem acessar esta página.</p>
        <p className="text-xs text-gray-400">Conta: {user.email}</p>
      </div>
    )
  }

  const allUsers = getAllUsers()
  const sources = getAllSources()
  const activeSources = sources.filter((s) => s.status === 'active').length
  const recentNotifications = notifications.slice(0, 5)
  const realJobs = jobs.filter(j => j.source === 'Empregos.com.br' || j.source === 'Catho')

  async function handleRunCollection() {
    setCollecting(true)
    setCollectionResult(null)
    setCollectionError('')
    try {
      const res = await fetch('/api/collect', { method: 'POST' })
      const data: CollectionResult = await res.json()
      if (data.success) {
        setCollectionResult(data)
        refreshJobs()
      } else {
        setCollectionError(data.results?.[0]?.error || 'Erro desconhecido na coleta')
      }
    } catch (err) {
      setCollectionError('Falha ao conectar com o servidor de coleta')
    }
    setCollecting(false)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-500 mt-1">Visão geral do sistema VagaZaps.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard title="Usuários" value={allUsers.length} icon="👤" color="blue" />
        <StatsCard title="Assinantes" value={allUsers.filter((u) => u.plan !== 'FREE').length} icon="💳" color="green" />
        <StatsCard title="Vagas reais" value={realJobs.length} icon="🌐" color="green" />
        <StatsCard title="Vagas totais" value={jobs.length} icon="💼" color="purple" />
        <StatsCard title="Fontes ativas" value={activeSources} icon="🔗" color="yellow" />
        <StatsCard title="Notificações" value={notifications.length} icon="🔔" color="red" />
        <StatsCard title="Alertas ativos" value={notifications.filter(n => n.status === 'UNREAD').length} icon="📬" color="blue" />
        <StatsCard title="Vagas mock" value={jobs.length - realJobs.length} icon="📋" color="gray" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Coleta de vagas reais</h2>
        <p className="text-sm text-gray-500 mb-4">
          Busca vagas automaticamente no Empregos.com.br e Catho. As vagas coletadas passam pelo matching e geram notificações.
        </p>

        <button
          onClick={handleRunCollection}
          disabled={collecting}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {collecting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Coletando vagas dos sites...
            </span>
          ) : (
            '🚀 Executar coleta agora'
          )}
        </button>

        {collectionResult && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 mb-2">✅ Coleta concluída!</p>
            <div className="space-y-1">
              {collectionResult.results.map((r, i) => (
                <p key={i} className="text-sm text-green-700">
                  {r.sourceName}: {r.collected} coletadas, {r.newJobs} novas
                  {r.error && <span className="text-red-600"> (erro: {r.error})</span>}
                </p>
              ))}
              <p className="text-sm text-green-700 font-medium pt-1">
                Total: {collectionResult.newJobs} novas vagas | {collectionResult.totalNotifications} notificações criadas
              </p>
            </div>
          </div>
        )}

        {collectionError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">❌ {collectionError}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Atividade recente</h2>
        {recentNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentNotifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  notif.status === 'UNREAD' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{notif.title}</p>
                  <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(notif.sentAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma atividade recente.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Ações rápidas</h2>
        <div className="space-y-3">
          <button
            onClick={() => router.push('/admin/vagas/nova')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <span className="text-xl">➕</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Cadastrar nova vaga</p>
              <p className="text-xs text-gray-500">Criar uma vaga manualmente</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => router.push('/admin/enviar')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <span className="text-xl">📤</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Enviar vagas para interessados</p>
              <p className="text-xs text-gray-500">Notificar usuários compatíveis</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

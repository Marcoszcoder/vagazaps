'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import StatsCard from '@/components/ui/StatsCard'
import JobCard from '@/components/ui/JobCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getUserPreference } from '@/lib/mock/preferences'
import { calculateMatchScore } from '@/lib/services/matchingService'

const POLL_INTERVAL_MS = 5 * 60 * 1000

export default function DashboardPage() {
  const { user } = useAuth()
  const { jobs, getRecommended, refreshJobs } = useJobs()
  const { favorites } = useFavorites()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [lastPollResult, setLastPollResult] = useState<{ newJobs: number; totalNotifications: number } | null>(null)
  const [polling, setPolling] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const poll = async () => {
      try {
        setPolling(true)
        const res = await fetch('/api/collect', { method: 'POST' })
        const data = await res.json()
        if (data.success && data.newJobs > 0) {
          setLastPollResult({ newJobs: data.newJobs, totalNotifications: data.totalNotifications })
          refreshJobs()
        }
      } catch {
        // Silent fail for background polling
      }
      setPolling(false)
    }

    poll()
    const interval = setInterval(poll, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [mounted, refreshJobs])

  if (!mounted || !user) {
    return <LoadingSpinner text="Carregando dashboard..." />
  }

  if (!user.onboardingCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">👋</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Complete seu perfil</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Para encontrarmos as melhores vagas para você, precisamos de algumas informações.
        </p>
        <button
          onClick={() => router.push('/onboarding')}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Começar onboarding
        </button>
      </div>
    )
  }

  const firstName = user.name.split(' ')[0]

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const newJobsCount = jobs.filter((j) => new Date(j.collectedAt) >= sevenDaysAgo).length
  const highMatchCount = jobs.filter((j) => {
    const pref = getUserPreference(user.id)
    if (!pref) return false
    const result = calculateMatchScore(pref, j)
    return result.score >= 70
  }).length
  const favoritesCount = favorites.length

  const recommended = getRecommended().slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Olá, {firstName} 👋</h1>
        <p className="text-gray-500 mt-1">Aqui estão as vagas que encontramos para você.</p>
      </div>

      {lastPollResult && lastPollResult.newJobs > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-800">Novas vagas encontradas!</p>
            <p className="text-sm text-green-700">
              {lastPollResult.newJobs} novas vagas e {lastPollResult.totalNotifications} notificações criadas.
            </p>
          </div>
          <button
            onClick={() => setLastPollResult(null)}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Dispensar
          </button>
        </div>
      )}

      {polling && (
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <span className="animate-spin inline-block">⏳</span> Buscando novas vagas...
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Novas vagas" value={newJobsCount} icon="🆕" color="green" />
        <StatsCard title="Alta compatibilidade" value={highMatchCount} icon="🎯" color="blue" />
        <StatsCard title="Favoritas" value={favoritesCount} icon="⭐" color="yellow" />
        <StatsCard title="Vagas recebidas" value={jobs.length} icon="📋" color="purple" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Encontramos novas oportunidades para você</h2>
          <Link href="/vagas" className="text-sm text-green-600 hover:text-green-700 font-medium">
            Ver todas →
          </Link>
        </div>

        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                matchResult={job.matchResult}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <span className="text-3xl mb-3 block">🔍</span>
            <p className="text-sm text-gray-500">Nenhuma vaga recomendada no momento. Tente ajustar suas preferências.</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link
          href="/vagas"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Ver todas as vagas
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

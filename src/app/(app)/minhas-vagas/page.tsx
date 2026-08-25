'use client'

import { useMemo } from 'react'
import JobCard from '@/components/ui/JobCard'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import { getUserPreference } from '@/lib/mock/preferences'

export default function MinhasVagasPage() {
  const { user } = useAuth()
  const { jobs, loading } = useJobs()

  const myJobs = useMemo(() => {
    if (!user) return []
    const pref = getUserPreference(user.id)
    if (!pref) return []

    return jobs
      .map((job) => {
        let score = 0
        if (pref.cities.some(c => c.toLowerCase() === job.city.toLowerCase())) score += 30
        if (pref.jobTitles.some(t => job.title.toLowerCase().includes(t.toLowerCase()) || job.keywords.some(k => k.toLowerCase().includes(t.toLowerCase())))) score += 30
        if (job.salaryMax >= pref.salaryMin) score += 20
        if (pref.workMode.includes(job.workMode)) score += 10
        score += 10

        return { job, score }
      })
      .filter(({ score }) => score >= 50)
      .sort((a, b) => b.score - a.score)
      .map(({ job, score }) => ({
        ...job,
        matchResult: { score, label: score >= 90 ? 'EXCELENTE' : score >= 70 ? 'BOA' : 'COMPATIVEL' as const, reasons: [] }
      }))
  }, [user, jobs])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Minhas Vagas</h1>
      <p className="text-gray-500 mb-6">Vagas que combinam com o seu perfil</p>

      {myJobs.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Nenhuma vaga encontrada"
          description="Complete suas preferências para encontrarmos vagas compatíveis."
          action={{ label: 'Configurar preferências', onClick: () => window.location.href = '/onboarding' }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              matchResult={job.matchResult}
            />
          ))}
        </div>
      )}
    </div>
  )
}

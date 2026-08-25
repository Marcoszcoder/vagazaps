'use client'

import { use, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useJobs } from '@/contexts/JobsContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useAuth } from '@/contexts/AuthContext'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getUserPreference } from '@/lib/mock/preferences'
import { calculateMatchScore } from '@/lib/services/matchingService'

const EXP_LABELS: Record<string, string> = {
  SEM_EXPERIENCIA: 'Sem experiência',
  '6_MESES': '6 meses',
  '1_ANO': '1 ano',
  '2_ANOS': '2 anos',
  '3_MAIS': '3+ anos',
}

const WORK_LABELS: Record<string, string> = {
  PRESENCIAL: 'Presencial',
  HIBRIDO: 'Híbrido',
  REMOTO: 'Remoto',
}

const CONTRACT_LABELS: Record<string, string> = {
  CLT: 'CLT',
  PJ: 'PJ',
  ESTAGIO: 'Estágio',
  TEMPORARIO: 'Temporário',
  Freelancer: 'Freelancer',
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getJob } = useJobs()
  const { isFavorited, toggleFavorite } = useFavorites()
  const { user } = useAuth()
  const router = useRouter()

  const job = getJob(id)

  const matchResult = useMemo(() => {
    if (!job || !user) return undefined
    const pref = getUserPreference(user.id)
    if (!pref) return undefined
    return calculateMatchScore(pref, job)
  }, [job, user])

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <span className="text-5xl mb-4 block">🔍</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vaga não encontrada</h1>
        <p className="text-gray-500 mb-6">Esta vaga não existe ou foi removida.</p>
        <Link href="/vagas" className="text-green-600 hover:text-green-700 font-medium">
          ← Voltar para vagas
        </Link>
      </div>
    )
  }

  const favorited = isFavorited(job.id)

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{job.company}</p>
          </div>
          {matchResult && (
            <div className={`flex items-center justify-center w-16 h-16 rounded-full border-2 text-lg font-bold shrink-0 ${
              matchResult.score >= 80 ? 'text-green-600 bg-green-50 border-green-200' :
              matchResult.score >= 50 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
              'text-red-600 bg-red-50 border-red-200'
            }`}>
              {matchResult.score}%
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="green">📍 {job.city} - {job.state}</Badge>
          <Badge variant="yellow">💰 R$ {job.salaryMin.toLocaleString('pt-BR')} - R$ {job.salaryMax.toLocaleString('pt-BR')}</Badge>
          <Badge variant="blue">{WORK_LABELS[job.workMode] || job.workMode}</Badge>
          <Badge variant="gray">{CONTRACT_LABELS[job.contractType] || job.contractType}</Badge>
          <Badge variant="gray">{EXP_LABELS[job.experience] || job.experience}</Badge>
        </div>

        {matchResult && matchResult.reasons.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Análise de compatibilidade</h3>
            <div className="space-y-1">
              {matchResult.reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span>{r.compatible ? '✅' : '⚠️'}</span>
                  <span className={r.compatible ? 'text-gray-700' : 'text-yellow-700'}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          {job.requirements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Requisitos</h2>
              <ul className="space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Benefícios</h2>
              <ul className="space-y-1">
                {job.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">✓</span>
                    {ben}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-sm text-gray-400 space-y-1">
            <p>Publicada em: {new Date(job.publishedAt).toLocaleDateString('pt-BR')}</p>
            <p>Fonte: {job.source}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Candidatar-se
          </a>
          <button
            onClick={() => toggleFavorite(job.id)}
            className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
              favorited
                ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {favorited ? '⭐ Favoritada' : '☆ Favoritar'}
          </button>
        </div>
      </div>
    </div>
  )
}

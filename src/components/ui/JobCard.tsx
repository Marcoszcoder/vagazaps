'use client'

import Link from 'next/link'
import { useFavorites } from '@/contexts/FavoritesContext'
import Badge from '../ui/Badge'

interface Job {
  id: string
  title: string
  company: string
  city: string
  state: string
  salaryMin?: number
  salaryMax?: number
  workMode: string
  contractType: string
  description?: string
  source?: string
  sourceUrl?: string
  publishedAt?: string
}

interface MatchResult {
  score: number
}

interface JobCardProps {
  job: Job
  matchResult?: MatchResult
  showActions?: boolean
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
  if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  return 'text-red-600 bg-red-50 border-red-200'
}

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null
  const format = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  if (min && max) return `${format(min)} - ${format(max)}`
  if (min) return `A partir de ${format(min)}`
  return `Até ${format(max!)}`
}

function getSourceBadgeColor(source?: string) {
  if (!source) return 'gray'
  const s = source.toLowerCase()
  if (s.includes('empregos')) return 'blue'
  if (s.includes('catho')) return 'purple'
  if (s.includes('gupy')) return 'green'
  if (s.includes('linkedin')) return 'linkedin'
  return 'gray'
}

function formatRelativeDate(dateStr?: string): string | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)
  
  if (diffMin < 1) return 'agora'
  if (diffMin < 60) return `há ${diffMin}min`
  if (diffHrs < 24) return `há ${diffHrs}h`
  if (diffDays === 1) return 'ontem'
  if (diffDays < 7) return `há ${diffDays} dias`
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function JobCard({ job, matchResult, showActions = true }: JobCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const favorited = isFavorited(job.id)
  const salary = formatSalary(job.salaryMin, job.salaryMax)
  const hasSourceUrl = !!job.sourceUrl
  const published = formatRelativeDate(job.publishedAt)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{job.company}</p>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span>📍 {job.city}{job.state && job.state !== 'NA' ? ` - ${job.state}` : ''}</span>
            {published && <span>🕐 {published}</span>}
          </div>
          {salary && (
            <p className="text-sm font-medium text-green-700 mt-1">💰 {salary}</p>
          )}
        </div>

        {matchResult && (
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-bold shrink-0 ${getScoreColor(matchResult.score)}`}
          >
            {matchResult.score}%
          </div>
        )}
      </div>

      {job.description && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{job.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant={job.workMode === 'Remoto' ? 'green' : job.workMode === 'Híbrido' ? 'blue' : 'gray'}>
          {job.workMode}
        </Badge>
        <Badge variant="yellow">{job.contractType}</Badge>
        {job.source && (
          <Badge variant={getSourceBadgeColor(job.source)}>{job.source}</Badge>
        )}
      </div>

      {showActions && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
          {hasSourceUrl ? (
            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Ver vaga no site →
            </a>
          ) : (
            <Link
              href={`/vagas/${job.id}`}
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Ver detalhes
            </Link>
          )}
          <button
            onClick={() => toggleFavorite(job.id)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
            aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorited ? '⭐' : '☆'}
          </button>
        </div>
      )}
    </div>
  )
}

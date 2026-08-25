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
  url?: string
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

export default function JobCard({ job, matchResult, showActions = true }: JobCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const favorited = isFavorited(job.id)
  const salary = formatSalary(job.salaryMin, job.salaryMax)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{job.company}</p>
          <p className="text-sm text-gray-500 mt-1">
            📍 {job.city} - {job.state}
          </p>
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

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant={job.workMode === 'Remoto' ? 'green' : job.workMode === 'Híbrido' ? 'blue' : 'gray'}>
          {job.workMode}
        </Badge>
        <Badge variant="yellow">{job.contractType}</Badge>
      </div>

      {showActions && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
          <Link
            href={job.url || `/vagas/${job.id}`}
            target={job.url ? '_blank' : undefined}
            rel={job.url ? 'noopener noreferrer' : undefined}
            className="flex-1 text-center px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Ver vaga
          </Link>
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

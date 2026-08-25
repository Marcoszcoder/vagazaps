'use client'

import { useFavorites } from '@/contexts/FavoritesContext'
import { useJobs } from '@/contexts/JobsContext'
import JobCard from '@/components/ui/JobCard'
import EmptyState from '@/components/ui/EmptyState'
import { useRouter } from 'next/navigation'

export default function FavoritosPage() {
  const { favorites } = useFavorites()
  const { getJob, getJobMatch } = useJobs()
  const router = useRouter()

  const favoriteJobs = favorites
    .map((fav) => {
      const job = getJob(fav.jobId)
      return job ? { ...job, favoriteCreatedAt: fav.createdAt } : null
    })
    .filter(Boolean) as (ReturnType<typeof getJob> & { favoriteCreatedAt: string })[]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Vagas Favoritas</h1>
        {favoriteJobs.length > 0 && (
          <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-sm font-medium rounded-full">
            {favoriteJobs.length}
          </span>
        )}
      </div>

      {favoriteJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteJobs.map((job) => (
            <JobCard key={job.id} job={job} matchResult={getJobMatch(job)} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="⭐"
          title="Nenhuma favorita ainda"
          description="Salve suas vagas favoritas para encontrá-las facilmente."
          action={{ label: 'Explorar vagas', onClick: () => router.push('/vagas') }}
        />
      )}
    </div>
  )
}

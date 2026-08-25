'use client'
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Job, JobFilters, MatchResult } from '@/lib/types'
import { getAllJobs as fetchAllJobs, getJobById as fetchJobById, addJob as addJobToStore, getJobsByFilters as filterJobs } from '@/lib/mock/jobs'
import { getUserPreference } from '@/lib/mock/preferences'
import { useAuth } from './AuthContext'
import { calculateMatchScore, getRecommendedJobs } from '@/lib/services/matchingService'

interface JobsContextType {
  jobs: Job[]
  loading: boolean
  getJob: (id: string) => Job | undefined
  getJobMatch: (job: Job) => MatchResult | undefined
  getRecommended: () => (Job & { matchResult: MatchResult })[]
  filterJobsList: (filters: JobFilters) => Job[]
  addJob: (job: Job) => void
  runCollection: () => Promise<{ newJobs: number; totalProcessed: number }>
  refreshJobs: () => void
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const refreshJobs = useCallback(() => {
    setJobs(fetchAllJobs())
  }, [])

  useEffect(() => {
    setJobs(fetchAllJobs())
  }, [])

  const getJob = (id: string) => fetchJobById(id)

  const getJobMatch = (job: Job): MatchResult | undefined => {
    if (!user) return undefined
    const pref = getUserPreference(user.id)
    if (!pref) return undefined
    return calculateMatchScore(pref, job)
  }

  const getRecommended = () => {
    if (!user) return []
    const pref = getUserPreference(user.id)
    if (!pref) return []
    const recommended = getRecommendedJobs(pref, jobs)
    return recommended.map((job) => ({
      ...job,
      matchResult: calculateMatchScore(pref, job),
    }))
  }

  const filterJobsList = (filters: JobFilters) => filterJobs(filters)

  const addJobToContext = (job: Job) => {
    addJobToStore(job)
    setJobs(fetchAllJobs())
  }

  const runCollection = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/collect', { method: 'POST' })
      const data = await res.json()
      setJobs(fetchAllJobs())
      return { newJobs: data.newJobs || 0, totalProcessed: data.results?.reduce((s: number, r: { collected: number }) => s + r.collected, 0) || 0 }
    } catch {
      return { newJobs: 0, totalProcessed: 0 }
    } finally {
      setLoading(false)
    }
  }

  return (
    <JobsContext.Provider value={{ jobs, loading, getJob, getJobMatch, getRecommended, filterJobsList, addJob: addJobToContext, runCollection, refreshJobs }}>
      {children}
    </JobsContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobsContext)
  if (!context) throw new Error('useJobs must be used within JobsProvider')
  return context
}

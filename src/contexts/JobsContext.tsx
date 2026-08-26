'use client'
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Job, JobFilters, MatchResult } from '@/lib/types'
import { getJobsByFilters as filterJobs } from '@/lib/mock/jobs'
import { getUserPreference } from '@/lib/mock/preferences'
import { useAuth } from './AuthContext'
import { calculateMatchScore, getRecommendedJobs } from '@/lib/services/matchingService'

const STORAGE_KEY = 'vagazaps_jobs'
const STORAGE_TIMESTAMP = 'vagazaps_jobs_timestamp'
const STORAGE_LAST_COLLECT = 'vagazaps_last_collect'
const STORAGE_DAILY_COUNT = 'vagazaps_daily_count'
const STORAGE_DAILY_DATE = 'vagazaps_daily_date'
const ONE_DAY_MS = 24 * 60 * 60 * 1000
const AUTO_COLLECT_INTERVAL_MS = 30 * 60 * 1000
const DAILY_LIMIT = 250

const STORAGE_COLLECTING = 'vagazaps_collecting'

interface JobsContextType {
  jobs: Job[]
  loading: boolean
  getJob: (id: string) => Job | undefined
  getJobMatch: (job: Job) => MatchResult | undefined
  getRecommended: () => (Job & { matchResult: MatchResult })[]
  filterJobsList: (filters: JobFilters) => Job[]
  addJob: (job: Job) => void
  runCollection: () => Promise<{ newJobs: number; totalProcessed: number; dailyLimit?: boolean }>
  refreshJobs: () => void
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

function loadFromStorage(): Job[] {
  try {
    if (typeof window === 'undefined') return []
    
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP)
    if (timestamp) {
      const age = Date.now() - parseInt(timestamp, 10)
      if (age > ONE_DAY_MS) {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(STORAGE_TIMESTAMP)
        return []
      }
    }
    
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(jobs: Job[]) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    if (!localStorage.getItem(STORAGE_TIMESTAMP)) {
      localStorage.setItem(STORAGE_TIMESTAMP, Date.now().toString())
    }
  } catch {}
}

function canCollectToday(): boolean {
  try {
    if (typeof window === 'undefined') return false
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem(STORAGE_DAILY_DATE)
    
    if (savedDate !== today) {
      localStorage.setItem(STORAGE_DAILY_DATE, today)
      localStorage.setItem(STORAGE_DAILY_COUNT, '0')
      return true
    }
    
    const count = parseInt(localStorage.getItem(STORAGE_DAILY_COUNT) || '0', 10)
    return count < DAILY_LIMIT
  } catch {
    return false
  }
}

function incrementDailyCount(increment: number) {
  try {
    if (typeof window === 'undefined') return
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem(STORAGE_DAILY_DATE)
    
    if (savedDate !== today) {
      localStorage.setItem(STORAGE_DAILY_DATE, today)
      localStorage.setItem(STORAGE_DAILY_COUNT, String(increment))
    } else {
      const count = parseInt(localStorage.getItem(STORAGE_DAILY_COUNT) || '0', 10)
      localStorage.setItem(STORAGE_DAILY_COUNT, String(count + increment))
    }
  } catch {}
}

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setJobs(loadFromStorage())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const lastCollect = localStorage.getItem(STORAGE_LAST_COLLECT)
      const now = Date.now()
      
      if (!lastCollect || now - parseInt(lastCollect, 10) > AUTO_COLLECT_INTERVAL_MS) {
        if (canCollectToday() && !localStorage.getItem(STORAGE_COLLECTING)) {
          localStorage.setItem(STORAGE_COLLECTING, '1')
          fetch('/api/collect', { method: 'POST' })
            .then(r => r.json())
            .then(data => {
              if (data.success && data.jobs) {
                const existing = loadFromStorage()
                const existingIds = new Set(existing.map((j: Job) => j.id))
                const newJobs: Job[] = data.jobs.filter((j: Job) => !existingIds.has(j.id))
                const merged = [...existing, ...newJobs]
                saveToStorage(merged)
                setJobs(merged)
                incrementDailyCount(newJobs.length)
              }
              localStorage.setItem(STORAGE_LAST_COLLECT, Date.now().toString())
            })
            .catch(() => {})
            .finally(() => localStorage.removeItem(STORAGE_COLLECTING))
        }
      }
    }, AUTO_COLLECT_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  const refreshJobs = useCallback(() => {
    setJobs(loadFromStorage())
  }, [])

  const getJob = (id: string) => jobs.find((j) => j.id === id)

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
    setJobs((prev) => {
      const next = [...prev, job]
      saveToStorage(next)
      return next
    })
  }

  const runCollection = async () => {
    if (!canCollectToday()) {
      return { newJobs: 0, totalProcessed: 0, dailyLimit: true }
    }
    if (localStorage.getItem(STORAGE_COLLECTING)) {
      return { newJobs: 0, totalProcessed: 0 }
    }

    localStorage.setItem(STORAGE_COLLECTING, '1')
    setLoading(true)
    try {
      const res = await fetch('/api/collect', { method: 'POST' })
      const data = await res.json()

      if (data.success && data.jobs) {
        const existing = loadFromStorage()
        const existingIds = new Set(existing.map((j: Job) => j.id))
        const newJobs: Job[] = data.jobs.filter((j: Job) => !existingIds.has(j.id))
        const merged = [...existing, ...newJobs]
        saveToStorage(merged)
        setJobs(merged)
        
        incrementDailyCount(newJobs.length)
      } else {
        setJobs(loadFromStorage())
      }

      return { newJobs: data.newJobs || 0, totalProcessed: data.results?.reduce((s: number, r: { collected: number }) => s + r.collected, 0) || 0 }
    } catch {
      return { newJobs: 0, totalProcessed: 0, dailyLimit: false }
    } finally {
      setLoading(false)
      localStorage.removeItem(STORAGE_COLLECTING)
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

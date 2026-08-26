import { Job, JobSource } from '../types'
import { getAllJobs, addJob } from '../mock/jobs'
import { getAllSources } from '../mock/sources'
import { scrapeEmpregos } from './scrapers/empregosScraper'
import { scrapeCatho } from './scrapers/cathoScraper'
import { scrapeLinkedIn } from './scrapers/linkedinScraper'
import { enqueueCollector, CollectorTask } from './collectorQueue'

function generateHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash.toString(36)
}

export function jobAlreadyExists(job: Job, existingJobs: Job[]): boolean {
  return existingJobs.some((existing) => {
    if (existing.sourceUrl && job.sourceUrl && existing.sourceUrl === job.sourceUrl) return true
    if (existing.title.toLowerCase() === job.title.toLowerCase() && existing.company.toLowerCase() === job.company.toLowerCase() && existing.city.toLowerCase() === job.city.toLowerCase()) return true
    const existingHash = generateHash(`${existing.title.toLowerCase()}|${existing.company.toLowerCase()}|${existing.city.toLowerCase()}`)
    const newHash = generateHash(`${job.title.toLowerCase()}|${job.company.toLowerCase()}|${job.city.toLowerCase()}`)
    return existingHash === newHash
  })
}

export function saveNewJob(job: Job): Job {
  addJob(job)
  return job
}

export function processNewJob(job: Job): { saved: boolean; job: Job } {
  const existing = getAllJobs()
  if (jobAlreadyExists(job, existing)) {
    return { saved: false, job }
  }
  saveNewJob(job)
  return { saved: true, job }
}

export interface CollectionResult {
  sourceName: string
  collected: number
  newJobs: number
  error?: string
}

const collectors: CollectorTask[] = [
  { name: 'Empregos.com.br', weight: 'light', execute: scrapeEmpregos },
  { name: 'Catho', weight: 'light', execute: scrapeCatho },
  { name: 'LinkedIn', weight: 'heavy', execute: scrapeLinkedIn, timeoutMs: 90_000 },
]

export async function collectFromAllSources(): Promise<{ newJobs: Job[]; results: CollectionResult[] }> {
  const results: CollectionResult[] = []
  const allNewJobs: Job[] = []

  const collectorPromises = collectors.map(async (task) => {
    try {
      const jobs = await enqueueCollector(task)
      let newCount = 0
      for (const job of jobs) {
        const result = processNewJob(job)
        if (result.saved) {
          allNewJobs.push(result.job)
          newCount++
        }
      }
      results.push({ sourceName: task.name, collected: jobs.length, newJobs: newCount })
    } catch (error) {
      results.push({ sourceName: task.name, collected: 0, newJobs: 0, error: String(error) })
    }
  })

  await Promise.all(collectorPromises)
  return { newJobs: allNewJobs, results }
}

export function collectJobs(): { newJobs: Job[]; totalProcessed: number } {
  const allJobs = getAllJobs()
  return { newJobs: [], totalProcessed: allJobs.length }
}

export function normalizeJob(raw: Record<string, unknown>): Job {
  return {
    id: (raw.id as string) || `job-${Date.now()}`,
    title: (raw.title as string) || 'Vaga sem título',
    company: (raw.company as string) || 'Empresa não informada',
    city: (raw.city as string) || 'Não informado',
    state: (raw.state as string) || 'NA',
    salaryMin: Number(raw.salaryMin) || 0,
    salaryMax: Number(raw.salaryMax) || 0,
    workMode: (raw.workMode as Job['workMode']) || 'PRESENCIAL',
    contractType: (raw.contractType as Job['contractType']) || 'CLT',
    experience: (raw.experience as Job['experience']) || 'SEM_EXPERIENCIA',
    description: (raw.description as string) || '',
    requirements: (raw.requirements as string[]) || [],
    benefits: (raw.benefits as string[]) || [],
    source: (raw.source as string) || 'Manual',
    sourceUrl: (raw.sourceUrl as string) || '',
    publishedAt: (raw.publishedAt as string) || new Date().toISOString(),
    collectedAt: new Date().toISOString(),
    keywords: (raw.keywords as string[]) || [],
  }
}

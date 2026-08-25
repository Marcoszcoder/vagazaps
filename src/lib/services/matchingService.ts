import {
  User,
  UserPreference,
  Job,
  MatchResult,
  ExperienceLevel,
} from '../types'
import { getAllJobs } from '../mock/jobs'
import { getUserPreference } from '../mock/preferences'
import { getAllUsers } from '../mock/users'

const EXPERIENCE_ORDER: Record<ExperienceLevel, number> = {
  SEM_EXPERIENCIA: 0,
  '6_MESES': 1,
  '1_ANO': 2,
  '2_ANOS': 3,
  '3_MAIS': 4,
}

export function calculateMatchScore(user: UserPreference, job: Job): MatchResult {
  const reasons: { text: string; compatible: boolean }[] = []
  let score = 0

  const cityMatch = user.cities.some(
    (c) => c.toLowerCase() === job.city.toLowerCase()
  )
  reasons.push({ text: 'Cidade compatível', compatible: cityMatch })
  if (cityMatch) score += 30

  const titleMatch = user.jobTitles.some((title) => {
    const lower = title.toLowerCase()
    return (
      job.title.toLowerCase().includes(lower) ||
      job.keywords.some((k) => k.toLowerCase().includes(lower))
    )
  })
  reasons.push({ text: 'Cargo compatível', compatible: titleMatch })
  if (titleMatch) score += 30

  const salaryMatch = job.salaryMax >= user.salaryMin
  reasons.push({ text: 'Salário compatível', compatible: salaryMatch })
  if (salaryMatch) score += 20

  const userExp = EXPERIENCE_ORDER[user.experience]
  const jobExp = EXPERIENCE_ORDER[job.experience]
  const expCompatible = userExp >= jobExp
  reasons.push({ text: 'Experiência compatível', compatible: expCompatible })
  if (expCompatible) score += 10

  const workModeMatch = user.workMode.includes(job.workMode)
  reasons.push({ text: 'Modalidade de trabalho compatível', compatible: workModeMatch })
  if (workModeMatch) score += 10

  let label: MatchResult['label']
  if (score >= 90) label = 'EXCELENTE'
  else if (score >= 70) label = 'BOA'
  else if (score >= 50) label = 'COMPATIVEL'
  else label = 'BAIXA'

  return { score, label, reasons }
}

export function isJobRelevant(user: UserPreference, job: Job, minScore?: number): boolean {
  const result = calculateMatchScore(user, job)
  return result.score >= (minScore ?? 50)
}

export function getMatchingUsers(job: Job, users: User[], preferences: Map<string, UserPreference>): User[] {
  return users.filter((user) => {
    const pref = preferences.get(user.id)
    if (!pref) return false
    return isJobRelevant(pref, job)
  })
}

export function getRecommendedJobs(user: UserPreference, jobs: Job[]): Job[] {
  return jobs
    .map((job) => ({ job, score: calculateMatchScore(user, job).score }))
    .filter((item) => item.score >= 50)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.job)
}

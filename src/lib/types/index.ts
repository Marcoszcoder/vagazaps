export type Plan = 'FREE' | 'ESSENTIAL' | 'PRO'

export type WorkMode = 'PRESENCIAL' | 'HIBRIDO' | 'REMOTO'

export type ContractType = 'CLT' | 'PJ' | 'ESTAGIO' | 'TEMPORARIO' | 'Freelancer'

export type ExperienceLevel = 'SEM_EXPERIENCIA' | '6_MESES' | '1_ANO' | '2_ANOS' | '3_MAIS'

export type NotificationType = 'NEW_JOB' | 'HIGH_MATCH' | 'PREFERENCE_UPDATED' | 'SYSTEM'

export type NotificationStatus = 'UNREAD' | 'READ' | 'SENT' | 'PENDING' | 'FAILED' | 'CANCELLED'

export type SendStatus = 'pending' | 'sent' | 'failed' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  city: string
  state: string
  plan: Plan
  isAdmin: boolean
  onboardingCompleted: boolean
  createdAt: string
}

export interface UserPreference {
  userId: string
  cities: string[]
  states: string[]
  jobTitles: string[]
  salaryMin: number
  workMode: WorkMode[]
  experience: ExperienceLevel
  contractTypes: ContractType[]
}

export interface Job {
  id: string
  title: string
  company: string
  city: string
  state: string
  salaryMin: number
  salaryMax: number
  workMode: WorkMode
  contractType: ContractType
  experience: ExperienceLevel
  description: string
  requirements: string[]
  benefits: string[]
  source: string
  sourceUrl: string
  publishedAt: string
  collectedAt: string
  keywords: string[]
}

export interface Favorite {
  id: string
  userId: string
  jobId: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  jobId?: string
  type: NotificationType
  title: string
  message: string
  status: NotificationStatus
  sentAt: string
}

export interface JobAlert {
  id: string
  userId: string
  jobTitle: string
  city: string
  salaryMin: number
  active: boolean
  createdAt: string
}

export interface Subscription {
  id: string
  userId: string
  plan: Plan
  status: 'active' | 'cancelled' | 'expired'
  startedAt: string
  expiresAt: string
}

export interface JobSource {
  id: string
  name: string
  status: 'active' | 'inactive'
  lastSync: string
  type: 'api' | 'scraping' | 'manual' | 'mock'
}

export interface MatchResult {
  score: number
  label: 'EXCELENTE' | 'BOA' | 'COMPATIVEL' | 'BAIXA'
  reasons: { text: string; compatible: boolean }[]
}

export interface SendJobNotification {
  id: string
  userId: string
  jobId: string
  status: SendStatus
  sentAt?: string
  createdAt: string
}

export interface JobFilters {
  city?: string
  state?: string
  title?: string
  salaryMin?: number
  salaryMax?: number
  workMode?: WorkMode
  experience?: ExperienceLevel
  contractType?: ContractType
  sortBy?: 'recent' | 'salary' | 'match'
}

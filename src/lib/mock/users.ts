import { User } from '../types'

export const DEMO_EMAIL = 'adielmarcos@gmail.com'
export const DEMO_PASSWORD = 'carros02'

const users: User[] = [
  {
    id: 'user-001',
    name: 'Adiel Marcos',
    email: 'adielmarcos@gmail.com',
    phone: '(66) 99207-9746',
    city: 'Rondonópolis',
    state: 'MT',
    plan: 'PRO',
    isAdmin: true,
    onboardingCompleted: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'user-002',
    name: 'Mariana Oliveira',
    email: 'mariana.oliveira@email.com',
    phone: '(65) 98888-5678',
    city: 'Cuiabá',
    state: 'MT',
    plan: 'ESSENTIAL',
    isAdmin: false,
    onboardingCompleted: true,
    createdAt: '2025-02-10T14:30:00Z',
  },
  {
    id: 'user-003',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@email.com',
    phone: '(67) 97777-9012',
    city: 'Campo Grande',
    state: 'MS',
    plan: 'FREE',
    isAdmin: false,
    onboardingCompleted: true,
    createdAt: '2025-03-05T09:15:00Z',
  },
  {
    id: 'user-004',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    city: 'São Paulo',
    state: 'SP',
    plan: 'PRO',
    isAdmin: false,
    onboardingCompleted: true,
    createdAt: '2025-01-28T16:45:00Z',
  },
  {
    id: 'user-005',
    name: 'Roberto Nascimento',
    email: 'roberto.nascimento@email.com',
    phone: '(66) 96666-3456',
    city: 'Primavera do Leste',
    state: 'MT',
    plan: 'ESSENTIAL',
    isAdmin: false,
    onboardingCompleted: false,
    createdAt: '2025-04-12T11:00:00Z',
  },
  {
    id: 'user-006',
    name: 'Ana Paula Ferreira',
    email: 'ana.ferreira@email.com',
    phone: '(66) 95555-7890',
    city: 'Sorriso',
    state: 'MT',
    plan: 'FREE',
    isAdmin: false,
    onboardingCompleted: true,
    createdAt: '2025-05-20T08:20:00Z',
  },
]

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email)
}

const STORAGE_KEY = 'vagazaps_user_phones'

function getStoredPhones(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function storeUserPhone(userId: string, phone: string) {
  if (typeof window === 'undefined') return
  const phones = getStoredPhones()
  phones[userId] = phone
  localStorage.setItem(STORAGE_KEY, JSON.stringify(phones))
}

export function getAllUsers(): User[] {
  const phones = getStoredPhones()
  return users.map(u => ({
    ...u,
    phone: phones[u.id] || u.phone,
  }))
}

import { User } from '../types'
import { getUserByEmail, DEMO_EMAIL, DEMO_PASSWORD } from '../mock/users'

const STORAGE_USERS = 'vagazaps_users'
const STORAGE_PASSWORDS = 'vagazaps_passwords'

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

function getStoredUsers(): User[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(STORAGE_USERS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveStoredUsers(users: User[]) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
  } catch {}
}

function getStoredPasswords(): Record<string, string> {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(STORAGE_PASSWORDS)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveStoredPasswords(passwords: Record<string, string>) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_PASSWORDS, JSON.stringify(passwords))
  } catch {}
}

export function login(email: string, password: string): AuthResult {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const user = getUserByEmail(email)
    if (user) return { success: true, user }
  }

  const storedUsers = getStoredUsers()
  const storedPasswords = getStoredPasswords()

  const user = storedUsers.find(u => u.email === email)
  if (user && storedPasswords[email] === password) {
    return { success: true, user }
  }

  return { success: false, error: 'E-mail ou senha incorretos.' }
}

export function register(data: {
  name: string
  email: string
  password: string
  city: string
  state: string
}): AuthResult {
  const storedUsers = getStoredUsers()

  const existingUser = getUserByEmail(data.email) || storedUsers.find(u => u.email === data.email)
  if (existingUser) {
    return { success: false, error: 'Este e-mail já está cadastrado.' }
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    city: data.city,
    state: data.state,
    plan: 'FREE',
    isAdmin: false,
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
  }

  const updatedUsers = [...storedUsers, newUser]
  saveStoredUsers(updatedUsers)

  const storedPasswords = getStoredPasswords()
  storedPasswords[data.email] = data.password
  saveStoredPasswords(storedPasswords)

  return { success: true, user: newUser }
}

export function createUserByAdmin(data: {
  name: string
  email: string
  password: string
  city: string
  state: string
  phone?: string
  plan: 'FREE' | 'ESSENTIAL' | 'PRO'
}): AuthResult {
  const storedUsers = getStoredUsers()

  const existingUser = getUserByEmail(data.email) || storedUsers.find(u => u.email === data.email)
  if (existingUser) {
    return { success: false, error: 'Este e-mail já está cadastrado.' }
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city,
    state: data.state,
    plan: data.plan,
    isAdmin: false,
    onboardingCompleted: true,
    createdAt: new Date().toISOString(),
  }

  const updatedUsers = [...storedUsers, newUser]
  saveStoredUsers(updatedUsers)

  const storedPasswords = getStoredPasswords()
  storedPasswords[data.email] = data.password
  saveStoredPasswords(storedPasswords)

  return { success: true, user: newUser }
}

export function getAllStoredUsers(): User[] {
  return getStoredUsers()
}

export function deleteUser(email: string): boolean {
  const storedUsers = getStoredUsers()
  const filtered = storedUsers.filter(u => u.email !== email)
  if (filtered.length === storedUsers.length) return false
  saveStoredUsers(filtered)

  const storedPasswords = getStoredPasswords()
  delete storedPasswords[email]
  saveStoredPasswords(storedPasswords)
  return true
}

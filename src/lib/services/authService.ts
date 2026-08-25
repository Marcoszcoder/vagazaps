import { User } from '../types'
import { getUserByEmail, DEMO_EMAIL, DEMO_PASSWORD } from '../mock/users'

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

export function login(email: string, password: string): AuthResult {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const user = getUserByEmail(email)
    if (user) return { success: true, user }
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
  return { success: true, user: newUser }
}

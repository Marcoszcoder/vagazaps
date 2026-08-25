import { JobAlert } from '../types'

const alerts: JobAlert[] = [
  {
    id: 'alert-001',
    userId: 'user-001',
    jobTitle: 'Analista de TI',
    city: 'Rondonópolis',
    salaryMin: 4000,
    active: true,
    createdAt: '2025-06-01T10:00:00Z',
  },
  {
    id: 'alert-002',
    userId: 'user-001',
    jobTitle: 'Suporte Técnico',
    city: 'Cuiabá',
    salaryMin: 2500,
    active: true,
    createdAt: '2025-06-05T14:30:00Z',
  },
]

export function getUserAlerts(userId: string): JobAlert[] {
  return alerts.filter((a) => a.userId === userId)
}

export function addAlert(alert: Omit<JobAlert, 'id' | 'createdAt'>): JobAlert {
  const newAlert: JobAlert = {
    ...alert,
    id: `alert-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  alerts.push(newAlert)
  return newAlert
}

export function removeAlert(id: string): void {
  const index = alerts.findIndex((a) => a.id === id)
  if (index >= 0) {
    alerts.splice(index, 1)
  }
}

export function toggleAlert(id: string): void {
  const alert = alerts.find((a) => a.id === id)
  if (alert) {
    alert.active = !alert.active
  }
}

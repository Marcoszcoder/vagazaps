import { Notification } from '../types'

const notifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    jobId: 'job-009',
    type: 'HIGH_MATCH',
    title: 'Nova vaga com alta compatibilidade!',
    message: 'A vaga de Desenvolvedor Full Stack na DigitalNexus tem 92% de compatibilidade com seu perfil.',
    status: 'UNREAD',
    sentAt: '2025-06-08T16:00:00Z',
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    jobId: 'job-005',
    type: 'NEW_JOB',
    title: 'Nova vaga em Primavera do Leste',
    message: 'Uma vaga de Analista de TI foi publicada em Primavera do Leste com salário até R$ 7.500.',
    status: 'READ',
    sentAt: '2025-05-28T10:30:00Z',
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    type: 'PREFERENCE_UPDATED',
    title: 'Preferências atualizadas',
    message: 'Suas preferências de vaga foram atualizadas com sucesso. Novas correspondências serão enviadas.',
    status: 'READ',
    sentAt: '2025-06-10T08:00:00Z',
  },
  {
    id: 'notif-004',
    userId: 'user-001',
    jobId: 'job-021',
    type: 'HIGH_MATCH',
    title: 'Vaga de Analista de Dados!',
    message: 'A vaga de Analista de Dados na AgroAnalytics tem 88% de compatibilidade. Não perca!',
    status: 'UNREAD',
    sentAt: '2025-06-20T15:30:00Z',
  },
  {
    id: 'notif-005',
    userId: 'user-001',
    type: 'SYSTEM',
    title: 'Bem-vindo ao VagaZaps!',
    message: 'Sua conta foi criada com sucesso. Complete seu onboarding para receber as melhores vagas.',
    status: 'READ',
    sentAt: '2025-01-15T10:05:00Z',
  },
  {
    id: 'notif-006',
    userId: 'user-001',
    jobId: 'job-002',
    type: 'NEW_JOB',
    title: 'Vaga de Suporte Técnico em Cuiabá',
    message: 'Uma nova vaga de Suporte Técnico Nível 1 foi publicada em Cuiabá com regime HÍBRIDO.',
    status: 'SENT',
    sentAt: '2025-06-02T15:00:00Z',
  },
]

export function getUserNotifications(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId)
}

export function addNotification(notif: Omit<Notification, 'id'>): Notification {
  const newNotif: Notification = {
    ...notif,
    id: `notif-${Date.now()}`,
  }
  notifications.push(newNotif)
  return newNotif
}

export function markNotificationRead(id: string): void {
  const notif = notifications.find((n) => n.id === id)
  if (notif) {
    notif.status = 'READ'
  }
}

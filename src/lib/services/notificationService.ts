import { Notification, NotificationType } from '../types'
import { addNotification, markNotificationRead } from '../mock/notifications'

export function createNotification(params: {
  userId: string
  jobId?: string
  type: NotificationType
  title: string
  message: string
}): Notification {
  return addNotification({
    userId: params.userId,
    jobId: params.jobId,
    type: params.type,
    title: params.title,
    message: params.message,
    status: 'PENDING',
    sentAt: new Date().toISOString(),
  })
}

export function queueNotification(notification: Notification): void {
  console.log(`[Queue] Notificação ${notification.id} enfileirada para envio`)
}

export function sendNotification(notification: Notification): void {
  console.log(
    `[MOCK WhatsApp] Notificação ${notification.id} enviada para usuário ${notification.userId}: ${notification.title}`
  )
  markAsSent(notification.id)
}

export function markAsSent(id: string): void {
  console.log(`[Notification] ${id} marcada como enviada`)
}

export function markAsFailed(id: string): void {
  console.log(`[Notification] ${id} marcada como falha`)
}

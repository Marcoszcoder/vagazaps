import { SendJobNotification } from '../types'

const sendHistory: SendJobNotification[] = [
  {
    id: 'send-001',
    userId: 'user-001',
    jobId: 'job-002',
    status: 'sent',
    sentAt: '2025-06-02T15:05:00Z',
    createdAt: '2025-06-02T15:00:00Z',
  },
  {
    id: 'send-002',
    userId: 'user-001',
    jobId: 'job-005',
    status: 'sent',
    sentAt: '2025-05-28T10:35:00Z',
    createdAt: '2025-05-28T10:30:00Z',
  },
  {
    id: 'send-003',
    userId: 'user-001',
    jobId: 'job-009',
    status: 'sent',
    sentAt: '2025-06-08T16:05:00Z',
    createdAt: '2025-06-08T16:00:00Z',
  },
  {
    id: 'send-004',
    userId: 'user-002',
    jobId: 'job-016',
    status: 'sent',
    sentAt: '2025-06-15T13:05:00Z',
    createdAt: '2025-06-15T13:00:00Z',
  },
  {
    id: 'send-005',
    userId: 'user-001',
    jobId: 'job-021',
    status: 'pending',
    createdAt: '2025-06-20T15:30:00Z',
  },
]

export function getSendHistory(): SendJobNotification[] {
  return [...sendHistory]
}

export function addSendEntry(entry: Omit<SendJobNotification, 'id' | 'createdAt'>): SendJobNotification {
  const newEntry: SendJobNotification = {
    ...entry,
    id: `send-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  sendHistory.push(newEntry)
  return newEntry
}

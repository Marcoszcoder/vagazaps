'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Notification } from '@/lib/types'
import { getUserNotifications, markNotificationRead } from '@/lib/mock/notifications'
import { useAuth } from './AuthContext'

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markRead: (id: string) => void
  refresh: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()

  const refresh = useCallback(() => {
    if (user) setNotifications(getUserNotifications(user.id))
  }, [user])

  useState(() => {
    if (user) setNotifications(getUserNotifications(user.id))
  })

  const markRead = (id: string) => {
    markNotificationRead(id)
    if (user) setNotifications(getUserNotifications(user.id))
  }

  const unreadCount = notifications.filter((n) => n.status === 'UNREAD').length

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markRead, refresh }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider')
  return context
}

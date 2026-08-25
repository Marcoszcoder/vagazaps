'use client'

import { useNotifications } from '@/contexts/NotificationsContext'
import EmptyState from '@/components/ui/EmptyState'

const TYPE_ICONS: Record<string, string> = {
  NEW_JOB: '🚨',
  HIGH_MATCH: '⭐',
  PREFERENCE_UPDATED: '📌',
  SYSTEM: 'ℹ️',
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr)
  return {
    date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default function NotificacoesPage() {
  const { notifications, unreadCount, markRead } = useNotifications()

  const sorted = [...notifications].sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  )

  function markAllRead() {
    notifications.forEach((n) => {
      if (n.status === 'UNREAD') markRead(n.id)
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              {unreadCount} não lida{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-2">
          {sorted.map((notif) => {
            const isUnread = notif.status === 'UNREAD'
            const { date, time } = formatDateTime(notif.sentAt)
            const icon = TYPE_ICONS[notif.type] || 'ℹ️'

            return (
              <button
                key={notif.id}
                onClick={() => {
                  if (isUnread) markRead(notif.id)
                }}
                className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                  isUnread
                    ? 'bg-green-50/50 border-green-100 hover:bg-green-50'
                    : 'bg-white border-gray-100 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl mt-0.5 shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notif.title}
                    </p>
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {date} às {time}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon="🔔"
          title="Nenhuma notificação ainda"
          description="Quando houver novas vagas ou atualizações, elas aparecerão aqui."
        />
      )}
    </div>
  )
}

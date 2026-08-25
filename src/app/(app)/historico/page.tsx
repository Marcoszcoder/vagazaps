'use client'

import { useNotifications } from '@/contexts/NotificationsContext'
import { useJobs } from '@/contexts/JobsContext'
import EmptyState from '@/components/ui/EmptyState'
import Badge from '@/components/ui/Badge'
import { useRouter } from 'next/navigation'

const STATUS_MAP: Record<string, { label: string; variant: 'green' | 'blue' | 'yellow' | 'gray' | 'red' }> = {
  UNREAD: { label: 'Recebida', variant: 'green' },
  READ: { label: 'Visualizada', variant: 'blue' },
  SENT: { label: 'Enviada', variant: 'yellow' },
  PENDING: { label: 'Pendente', variant: 'gray' },
  FAILED: { label: 'Falhou', variant: 'red' },
  CANCELLED: { label: 'Cancelada', variant: 'gray' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function HistoricoPage() {
  const { notifications } = useNotifications()
  const { getJob } = useJobs()
  const router = useRouter()

  const jobNotifications = notifications
    .filter((n) => n.type === 'NEW_JOB' && n.jobId)
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Histórico de Vagas</h1>

      {jobNotifications.length > 0 ? (
        <>
          <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Vaga</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Empresa</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Compatibilidade</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobNotifications.map((notif) => {
                  const job = notif.jobId ? getJob(notif.jobId) : undefined
                  const status = STATUS_MAP[notif.status] || STATUS_MAP.UNREAD

                  return (
                    <tr
                      key={notif.id}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => notif.jobId && router.push(`/vagas/${notif.jobId}`)}
                    >
                      <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(notif.sentAt)}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {job?.title || notif.title}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {job?.company || '—'}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {job ? `${job.city} - ${job.state}` : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {jobNotifications.map((notif) => {
              const job = notif.jobId ? getJob(notif.jobId) : undefined
              const status = STATUS_MAP[notif.status] || STATUS_MAP.UNREAD

              return (
                <div
                  key={notif.id}
                  className="bg-white rounded-xl border border-gray-100 p-4 space-y-2 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => notif.jobId && router.push(`/vagas/${notif.jobId}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">{job?.title || notif.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{job?.company || '—'}</p>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{formatDate(notif.sentAt)}</span>
                    {job && <span>📍 {job.city} - {job.state}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <EmptyState
          icon="📋"
          title="Nenhum histórico ainda"
          description="Suas vagas recebidas aparecerão aqui."
        />
      )}
    </div>
  )
}

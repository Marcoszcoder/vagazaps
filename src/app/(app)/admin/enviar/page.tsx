'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Badge from '@/components/ui/Badge'
import { getAllUsers } from '@/lib/mock/users'
import { getUserPreference } from '@/lib/mock/preferences'
import { calculateMatchScore } from '@/lib/services/matchingService'
import { User, Job } from '@/lib/types'

interface MatchingUser {
  user: User
  score: number
}

export default function EnviarPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { jobs } = useJobs()
  const router = useRouter()

  const [sending, setSending] = useState(false)
  const [sendComplete, setSendComplete] = useState(false)
  const [progress, setProgress] = useState({ processed: 0, sent: 0, pending: 0 })

  if (authLoading) return <LoadingSpinner text="Carregando..." />
  if (!user || !user.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">🔒</span>
        <h2 className="text-xl font-bold text-gray-900">Acesso restrito</h2>
        <p className="text-sm text-gray-500">Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const latestJob: Job | undefined = jobs.length > 0 ? jobs[jobs.length - 1] : undefined

  const matchingUsers: MatchingUser[] = latestJob
    ? getAllUsers()
        .map((u) => {
          const pref = getUserPreference(u.id)
          if (!pref) return null
          const result = calculateMatchScore(pref, latestJob)
          return { user: u, score: result.score }
        })
        .filter((item): item is MatchingUser => item !== null && item.score >= 50)
        .sort((a, b) => b.score - a.score)
    : []

  const totalRecipients = matchingUsers.length

  function handleSendToAll() {
    if (totalRecipients === 0) return
    setSending(true)
    setProgress({ processed: 0, sent: 0, pending: totalRecipients })

    let processed = 0
    const interval = setInterval(() => {
      processed += 1
      const sent = processed >= totalRecipients ? totalRecipients : Math.max(0, processed - 2)
      const pending = Math.max(0, totalRecipients - processed)
      setProgress({ processed, sent, pending })
      if (processed >= totalRecipients) {
        clearInterval(interval)
        setTimeout(() => {
          setSending(false)
          setSendComplete(true)
          setProgress({ processed: totalRecipients, sent: totalRecipients, pending: 0 })
        }, 500)
      }
    }, 200)
  }

  function getScoreBadge(score: number) {
    if (score >= 90) return <Badge variant="green">EXCELENTE</Badge>
    if (score >= 70) return <Badge variant="blue">BOA</Badge>
    if (score >= 50) return <Badge variant="yellow">COMPATÍVEL</Badge>
    return <Badge variant="gray">BAIXA</Badge>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enviar vagas para interessados</h1>
        <p className="text-gray-500 mt-1">Envie notificações para usuários compatíveis.</p>
      </div>

      {!latestJob ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <span className="text-3xl mb-3 block">📋</span>
          <p className="text-sm text-gray-500 mb-4">Nenhuma vaga disponível para envio.</p>
          <Button variant="outline" onClick={() => router.push('/admin/vagas/nova')}>
            Cadastrar nova vaga
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Última vaga cadastrada</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{latestJob.title}</h3>
                <p className="text-sm text-gray-500">{latestJob.company} — {latestJob.city}/{latestJob.state}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {latestJob.workMode === 'PRESENCIAL' ? 'Presencial' : latestJob.workMode === 'HIBRIDO' ? 'Híbrido' : 'Remoto'} · {latestJob.contractType} · R$ {latestJob.salaryMin.toLocaleString('pt-BR')} - R$ {latestJob.salaryMax.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Usuários interessados ({matchingUsers.length})
            </h2>
            {matchingUsers.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {matchingUsers.map(({ user: u, score }) => (
                  <div key={u.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                      {u.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.city}/{u.state} · {u.plan}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">{score}%</span>
                      {getScoreBadge(score)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum usuário compatível encontrado.</p>
            )}
          </div>

          {!sending && !sendComplete && (
            <Button onClick={handleSendToAll} disabled={totalRecipients === 0}>
              Enviar para todos ({totalRecipients} destinatários)
            </Button>
          )}

          {sending && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
              <p className="text-sm font-medium text-gray-900">Enviando notificações...</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>{totalRecipients} destinatários</p>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-200"
                    style={{ width: `${(progress.processed / totalRecipients) * 100}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span>{progress.processed} processados</span>
                  <span className="text-green-600 font-medium">{progress.sent} enviados</span>
                  {progress.pending > 0 && <span className="text-yellow-600">{progress.pending} aguardando</span>}
                </div>
              </div>
            </div>
          )}

          {sendComplete && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✅</span>
                <p className="text-sm font-bold text-green-800">Envio concluído!</p>
              </div>
              <p className="text-sm text-green-700">
                {progress.sent} notificações enviadas com sucesso para usuários interessados na vaga <strong>{latestJob.title}</strong>.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => { setSendComplete(false); setProgress({ processed: 0, sent: 0, pending: 0 }); }}>
                  Enviar novamente
                </Button>
                <Button variant="ghost" size="sm" onClick={() => router.push('/admin')}>
                  Voltar ao painel
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

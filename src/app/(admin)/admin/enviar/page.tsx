'use client'

import { useState } from 'react'
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

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://vagazaps-whatsapp.onrender.com'

interface MatchingUser {
  user: User
  score: number
  sent: boolean
  error?: string
}

function formatJobMessage(job: Job): string {
  const salary = job.salaryMin > 0 
    ? `💰 R$ ${job.salaryMin.toLocaleString('pt-BR')}${job.salaryMax > job.salaryMin ? ` - R$ ${job.salaryMax.toLocaleString('pt-BR')}` : ''}`
    : '💰 A combinar'
  
  const location = job.city && job.state && job.state !== 'NA'
    ? `📍 ${job.city} - ${job.state}`
    : job.city 
      ? `📍 ${job.city}`
      : ''

  const workMode = job.workMode === 'PRESENCIAL' ? 'Presencial' : job.workMode === 'HIBRIDO' ? 'Híbrido' : 'Remoto'

  let msg = `🔔 *Nova vaga encontrada!*\n\n`
  msg += `💼 *${job.title}*\n`
  msg += `🏢 ${job.company}\n`
  if (location) msg += `${location}\n`
  msg += `${salary}\n`
  msg += `📋 ${job.contractType} · ${workMode}\n`
  if (job.sourceUrl) msg += `\n🔗 Ver no site: ${job.sourceUrl}`
  msg += `\n\n_VagaZaps - Encontrando as melhores vagas pra você_`
  
  return msg
}

export default function EnviarPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { jobs } = useJobs()
  const router = useRouter()

  const [sending, setSending] = useState(false)
  const [sendComplete, setSendComplete] = useState(false)
  const [matchingUsers, setMatchingUsers] = useState<MatchingUser[]>([])
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [sendMode, setSendMode] = useState<'latest' | 'all'>('latest')

  if (authLoading) return <LoadingSpinner text="Carregando..." />

  const jobsToSend = sendMode === 'latest' 
    ? (jobs.length > 0 ? [jobs[jobs.length - 1]] : [])
    : jobs.filter(j => selectedJobs.includes(j.id))

  function toggleJobSelection(jobId: string) {
    setSelectedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    )
  }

  async function handleSend() {
    if (jobsToSend.length === 0) return
    
    setSending(true)
    setMatchingUsers([])

    const usersWithPhones = getAllUsers().filter(u => u.phone)
    
    const matched: MatchingUser[] = usersWithPhones.map(u => {
      const pref = getUserPreference(u.id)
      if (!pref) return null
      
      let bestScore = 0
      for (const job of jobsToSend) {
        const result = calculateMatchScore(pref, job)
        if (result.score > bestScore) bestScore = result.score
      }
      
      return bestScore >= 50 ? { user: u, score: bestScore, sent: false } : null
    }).filter((item): item is MatchingUser => item !== null)
      .sort((a, b) => b.score - a.score)

    setMatchingUsers(matched)

    for (let i = 0; i < matched.length; i++) {
      const mu = matched[i]
      const phone = mu.user.phone?.replace(/\D/g, '') || ''
      
      if (!phone) {
        matched[i] = { ...mu, error: 'Sem telefone' }
        setMatchingUsers([...matched])
        continue
      }

      try {
        const messages = jobsToSend.map(job => ({
          phone,
          message: formatJobMessage(job),
        }))

        const res = await fetch(`${WHATSAPP_API}/api/send-batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        })

        const data = await res.json()
        matched[i] = { ...mu, sent: data.success, error: data.success ? undefined : 'Falha no envio' }
      } catch {
        matched[i] = { ...mu, error: 'Erro de conexão' }
      }
      
      setMatchingUsers([...matched])
      
      await new Promise(r => setTimeout(r, 1500))
    }

    setSending(false)
    setSendComplete(true)
  }

  function getScoreBadge(score: number) {
    if (score >= 90) return <Badge variant="green">EXCELENTE</Badge>
    if (score >= 70) return <Badge variant="blue">BOA</Badge>
    if (score >= 50) return <Badge variant="yellow">COMPATÍVEL</Badge>
    return <Badge variant="gray">BAIXA</Badge>
  }

  const sentCount = matchingUsers.filter(u => u.sent).length
  const errorCount = matchingUsers.filter(u => u.error).length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enviar vagas via WhatsApp</h1>
        <p className="text-gray-500 mt-1">Envie detalhes das vagas para usuários compatíveis.</p>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <span className="text-3xl mb-3 block">📋</span>
          <p className="text-sm text-gray-500 mb-4">Nenhuma vaga disponível. Colete vagas primeiro.</p>
          <Button variant="outline" onClick={() => router.push('/vagas')}>
            Ir para Vagas
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Modo de envio</h2>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setSendMode('latest')}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  sendMode === 'latest' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Última vaga coletada
              </button>
              <button
                onClick={() => setSendMode('all')}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  sendMode === 'all' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Selecionar vagas ({jobs.length})
              </button>
            </div>

            {sendMode === 'all' && (
              <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-100 rounded-lg p-3">
                {jobs.map(job => (
                  <label key={job.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company} · {job.source}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {jobsToSend.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Pré-visualização da mensagem ({jobsToSend.length} {jobsToSend.length === 1 ? 'vaga' : 'vagas'})
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono text-xs">
                {formatJobMessage(jobsToSend[0])}
              </div>
              {jobsToSend.length > 1 && (
                <p className="text-xs text-gray-400 mt-2">+ {jobsToSend.length - 1} {jobsToSend.length - 1 === 1 ? 'outra vaga' : 'outras vagas'}</p>
              )}
            </div>
          )}

          {!sending && !sendComplete && (
            <Button onClick={handleSend} disabled={jobsToSend.length === 0}>
              Enviar via WhatsApp ({jobsToSend.length} {jobsToSend.length === 1 ? 'vaga' : 'vagas'})
            </Button>
          )}

          {sending && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
              <p className="text-sm font-medium text-gray-900">Enviando mensagens...</p>
              <div className="space-y-2">
                {matchingUsers.map((mu, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      mu.sent ? 'bg-green-500' : mu.error ? 'bg-red-500' : 'bg-yellow-400 animate-pulse'
                    }`} />
                    <span className="flex-1 truncate">{mu.user.name}</span>
                    {mu.sent && <span className="text-green-600 text-xs">✓ Enviado</span>}
                    {mu.error && <span className="text-red-600 text-xs">{mu.error}</span>}
                    {!mu.sent && !mu.error && <span className="text-yellow-600 text-xs">Enviando...</span>}
                  </div>
                ))}
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
                {sentCount} mensagens enviadas com sucesso
                {errorCount > 0 && ` · ${errorCount} falhas`}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => { setSendComplete(false); setMatchingUsers([]); }}>
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
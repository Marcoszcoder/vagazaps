'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import { useNotifications } from '@/contexts/NotificationsContext'
import StatsCard from '@/components/ui/StatsCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getAllUsers } from '@/lib/mock/users'
import { getAllSources } from '@/lib/mock/sources'

interface ConnectionState {
  status: string
  phone: string | null
  hasQr: boolean
}

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { jobs, runCollection } = useJobs()
  const { notifications } = useNotifications()
  const router = useRouter()
  const [collecting, setCollecting] = useState(false)
  const [collectionResult, setCollectionResult] = useState<{ success: boolean; newJobs: number } | null>(null)
  const [collectionError, setCollectionError] = useState('')

  const [connection, setConnection] = useState<ConnectionState>({ status: 'disconnected', phone: null, hasQr: false })
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [whatsappError, setWhatsappError] = useState('')
  const [autoRunning, setAutoRunning] = useState(false)
  const [autoLog, setAutoLog] = useState<string[]>([])
  const jobIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const addLog = useCallback((msg: string) => {
    setAutoLog(prev => [`[${new Date().toLocaleTimeString('pt-BR')}] ${msg}`, ...prev].slice(0, 30))
  }, [])

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/whatsapp-status')
      const data = await res.json()
      setConnection(data)
    } catch {
      setConnection({ status: 'offline', phone: null, hasQr: false })
    }
  }, [])

  const fetchQr = useCallback(async () => {
    try {
      const res = await fetch('/api/whatsapp-qr')
      const data = await res.json()
      if (data.qr) setQrCode(data.qr)
    } catch {}
  }, [])

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 3000)
    return () => clearInterval(interval)
  }, [checkStatus])

  useEffect(() => {
    if (connection.status === 'qr_ready') {
      fetchQr()
      const interval = setInterval(fetchQr, 2000)
      return () => clearInterval(interval)
    }
    if (connection.status === 'connected') {
      setQrCode(null)
    }
  }, [connection.status, fetchQr])

  async function handleConnect() {
    setWhatsappLoading(true)
    setWhatsappError('')
    try {
      const res = await fetch('/api/whatsapp-connect', { method: 'POST' })
      const data = await res.json()
      if (!data.success) setWhatsappError(data.error || 'Erro ao conectar')
    } catch {
      setWhatsappError('Não foi possível conectar ao servidor.')
    }
    setWhatsappLoading(false)
  }

  async function handleDisconnect() {
    try {
      await fetch('/api/whatsapp-disconnect', { method: 'POST' })
      setQrCode(null)
      setConnection({ status: 'disconnected', phone: null, hasQr: false })
      if (jobIntervalRef.current) {
        clearInterval(jobIntervalRef.current)
        jobIntervalRef.current = null
      }
      setAutoRunning(false)
    } catch {
      setWhatsappError('Erro ao desconectar')
    }
  }

  async function sendToPhone(phone: string, message: string): Promise<boolean> {
    const res = await fetch('/api/whatsapp-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    })
    const data = await res.json()
    return data.success
  }

  async function handleStartAuto() {
    if (autoRunning) return
    setAutoRunning(true)
    addLog('🚀 Iniciando envio automático...')

    const allUsrs = getAllUsers()
    const withPhone = allUsrs.filter((u): u is typeof u & { phone: string } => !!u.phone && u.phone.length >= 13)
    addLog(`📋 ${withPhone.length} clientes com número`)

    if (withPhone.length === 0) {
      addLog('❌ Nenhum cliente com número de WhatsApp')
      setAutoRunning(false)
      return
    }

    addLog('📨 Enviando boas-vindas...')
    let sent = 0
    for (const u of withPhone) {
      try {
        const ok = await sendToPhone(u.phone, `Olá, ${u.name}! 👋\n\nBem-vindo ao *VagaZaps*!\n\nEstamos analisando seu perfil e em instantes você receberá as primeiras vagas compatíveis com o que você procura.\n\nFique de olho no seu WhatsApp! 📲`)
        if (ok) {
          sent++
          addLog(`✅ Boas-vindas → ${u.name} (${u.phone})`)
        } else {
          addLog(`❌ Falha → ${u.name} (${u.phone})`)
        }
        await new Promise(r => setTimeout(r, 3000))
      } catch {
        addLog(`❌ Erro → ${u.name}`)
      }
    }
    addLog(`📨 Boas-vindas: ${sent}/${withPhone.length} enviados`)

    addLog('⏳ Aguardando 2 minutos para primeira vaga...')
    await new Promise(r => setTimeout(r, 2 * 60 * 1000))

    async function sendJob() {
      if (jobs.length === 0) {
        addLog('⚠️ Sem vagas disponíveis')
        return
      }
      const job = jobs[Math.floor(Math.random() * jobs.length)]
      let jobSent = 0
      const currentUsers = getAllUsers().filter((u): u is typeof u & { phone: string } => !!u.phone && u.phone.length >= 13)
      for (const u of currentUsers) {
        try {
          const msg = `🚨 *NOVA VAGA*\n\n💼 *${job.title}*\n📍 ${job.city}\n💰 R$ ${(job.salaryMin || 0).toLocaleString('pt-BR')} - R$ ${(job.salaryMax || 0).toLocaleString('pt-BR')}\n\n👉 ${job.sourceUrl || 'Acesse o VagaZaps'}`
          const ok = await sendToPhone(u.phone, msg)
          if (ok) jobSent++
          await new Promise(r => setTimeout(r, 3000))
        } catch {}
      }
      addLog(`📤 "${job.title}" → ${jobSent} clientes`)
    }

    await sendJob()
    addLog('🔄 Próxima vaga em 5 minutos...')

    jobIntervalRef.current = setInterval(async () => {
      await sendJob()
      addLog('🔄 Próxima vaga em 5 minutos...')
    }, 5 * 60 * 1000)
  }

  useEffect(() => {
    return () => {
      if (jobIntervalRef.current) clearInterval(jobIntervalRef.current)
    }
  }, [])

  function getWhatsappStatusDisplay() {
    switch (connection.status) {
      case 'connected': return { text: 'Conectado', color: 'green', icon: '✅' }
      case 'qr_ready': return { text: 'Escaneie o QR Code', color: 'yellow', icon: '📱' }
      case 'connecting': return { text: 'Conectando...', color: 'blue', icon: '🔄' }
      case 'disconnected': return { text: 'Desconectado', color: 'gray', icon: '⚪' }
      case 'logged_out': return { text: 'Deslogado', color: 'red', icon: '🔴' }
      case 'offline': return { text: 'Backend offline', color: 'red', icon: '⚠️' }
      default: return { text: connection.status, color: 'gray', icon: '❓' }
    }
  }

  if (authLoading) return <LoadingSpinner text="Carregando painel..." />

  const allUsers = getAllUsers()
  const usersWithPhone = allUsers.filter(u => u.phone && u.phone.length >= 13)
  const sources = getAllSources()
  const activeSources = sources.filter((s) => s.status === 'active').length
  const recentNotifications = notifications.slice(0, 5)
  const realJobs = jobs.filter(j => j.source === 'Empregos.com.br' || j.source === 'Catho')
  const whatsappStatus = getWhatsappStatusDisplay()

  async function handleRunCollection() {
    setCollecting(true)
    setCollectionResult(null)
    setCollectionError('')
    try {
      const result = await runCollection()
      setCollectionResult({ success: true, newJobs: result.newJobs })
    } catch {
      setCollectionError('Falha ao conectar com o servidor de coleta')
    }
    setCollecting(false)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Master</h1>
        <p className="text-gray-500 mt-1">Controle total do sistema VagaZaps.</p>
      </div>

      {/* WhatsApp Control */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">WhatsApp</h2>
            <p className="text-sm text-gray-500 mt-1">Conecte e envie vagas automaticamente.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              whatsappStatus.color === 'green' ? 'bg-green-500' :
              whatsappStatus.color === 'yellow' ? 'bg-yellow-500 animate-pulse' :
              whatsappStatus.color === 'blue' ? 'bg-blue-500 animate-spin' :
              whatsappStatus.color === 'red' ? 'bg-red-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">{whatsappStatus.icon} {whatsappStatus.text}</span>
          </div>
        </div>

        {connection.phone && (
          <p className="text-xs text-gray-400 mb-4">Telefone: {connection.phone}</p>
        )}

        {whatsappError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{whatsappError}</p>
          </div>
        )}

        {connection.status === 'qr_ready' && qrCode && (
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrCode)}`} alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-xs text-gray-400">WhatsApp → Dispositivos conectados → Conectar dispositivo</p>
          </div>
        )}

        {connection.status === 'connected' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 font-medium">✅ WhatsApp conectado!</p>
            <p className="text-sm text-green-700 mt-1">
              {autoRunning ? 'Envio automático ativo — vagas a cada 5 min.' : 'Clique "Ativar envio automático" para começar.'}
            </p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {connection.status !== 'connected' && connection.status !== 'qr_ready' ? (
            <button onClick={handleConnect} disabled={whatsappLoading}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
              {whatsappLoading ? 'Conectando...' : 'Conectar WhatsApp'}
            </button>
          ) : (
            <button onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
              Desconectar
            </button>
          )}
          {connection.status === 'connected' && !autoRunning && (
            <button onClick={handleStartAuto}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
              🚀 Ativar envio automático
            </button>
          )}
          {autoRunning && (
            <button onClick={() => {
              if (jobIntervalRef.current) { clearInterval(jobIntervalRef.current); jobIntervalRef.current = null }
              setAutoRunning(false)
              addLog('⏹️ Envio automático parado')
            }}
              className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-colors">
              ⏹️ Parar envio
            </button>
          )}
        </div>
      </div>

      {/* Log */}
      {autoLog.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">Log de envio</h2>
          <div className="max-h-64 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-3">
            {autoLog.map((log, i) => (
              <p key={i} className="text-xs text-gray-700 font-mono">{log}</p>
            ))}
          </div>
        </div>
      )}

      {/* Phone Numbers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Números ({usersWithPhone.length})</h2>
        {usersWithPhone.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {usersWithPhone.map(u => (
              <div key={u.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                <p className="text-sm font-mono text-gray-700">{u.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhum número cadastrado.</p>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard title="Usuários" value={allUsers.length} icon="👤" color="blue" />
        <StatsCard title="Com WhatsApp" value={usersWithPhone.length} icon="📱" color="green" />
        <StatsCard title="Vagas reais" value={realJobs.length} icon="🌐" color="green" />
        <StatsCard title="Vagas totais" value={jobs.length} icon="💼" color="purple" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Coleta de vagas</h2>
        <button onClick={handleRunCollection} disabled={collecting}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
          {collecting ? 'Coletando...' : '🚀 Coletar vagas agora'}
        </button>
        {collectionResult && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">✅ {collectionResult.newJobs} novas vagas</p>
          </div>
        )}
        {collectionError && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">❌ {collectionError}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Atividade recente</h2>
        {recentNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentNotifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.status === 'UNREAD' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{notif.title}</p>
                  <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma atividade.</p>
        )}
      </div>
    </div>
  )
}

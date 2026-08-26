'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs } from '@/contexts/JobsContext'
import { useNotifications } from '@/contexts/NotificationsContext'
import StatsCard from '@/components/ui/StatsCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getAllUsers } from '@/lib/mock/users'
import { getAllSources } from '@/lib/mock/sources'

const WHATSAPP_API = 'https://vagazaps-whatsapp.onrender.com'

interface ConnectionState {
  status: string
  phone: string | null
  hasQr: boolean
}

interface CollectionResult {
  success: boolean
  newJobs: number
  totalNotifications: number
  results: { sourceName: string; collected: number; newJobs: number; error?: string }[]
}

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { jobs, runCollection } = useJobs()
  const { notifications } = useNotifications()
  const router = useRouter()
  const [collecting, setCollecting] = useState(false)
  const [collectionResult, setCollectionResult] = useState<CollectionResult | null>(null)
  const [collectionError, setCollectionError] = useState('')

  // WhatsApp state
  const [connection, setConnection] = useState<ConnectionState>({ status: 'disconnected', phone: null, hasQr: false })
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [whatsappError, setWhatsappError] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState('')

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch(`${WHATSAPP_API}/api/status`)
      const data = await res.json()
      setConnection(data)
    } catch {
      setConnection({ status: 'offline', phone: null, hasQr: false })
    }
  }, [])

  const fetchQr = useCallback(async () => {
    try {
      const res = await fetch(`${WHATSAPP_API}/api/qr`)
      const data = await res.json()
      if (data.qr) {
        setQrCode(data.qr)
      }
    } catch {
      // ignore
    }
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
      const res = await fetch(`${WHATSAPP_API}/api/connect`, { method: 'POST' })
      const data = await res.json()
      if (!data.success) {
        setWhatsappError(data.error || 'Erro ao conectar')
      }
    } catch {
      setWhatsappError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
    }
    setWhatsappLoading(false)
  }

  async function handleDisconnect() {
    try {
      await fetch(`${WHATSAPP_API}/api/disconnect`, { method: 'POST' })
      setQrCode(null)
      setConnection({ status: 'disconnected', phone: null, hasQr: false })
    } catch {
      setWhatsappError('Erro ao desconectar')
    }
  }

  function getWhatsappStatusDisplay() {
    switch (connection.status) {
      case 'connected':
        return { text: 'Conectado', color: 'green', icon: '✅' }
      case 'qr_ready':
        return { text: 'Aguardando QR Code', color: 'yellow', icon: '📱' }
      case 'connecting':
        return { text: 'Conectando...', color: 'blue', icon: '🔄' }
      case 'disconnected':
        return { text: 'Desconectado', color: 'gray', icon: '⚪' }
      case 'logged_out':
        return { text: 'Desconectado (logout)', color: 'red', icon: '🔴' }
      case 'offline':
        return { text: 'Backend offline', color: 'red', icon: '⚠️' }
      default:
        return { text: connection.status, color: 'gray', icon: '❓' }
    }
  }

  async function handleSendTest() {
    setSending(true)
    setSendResult('')
    const allUsrs = getAllUsers()
    const withPhone = allUsrs.filter(u => u.phone && u.phone.length >= 13)

    if (withPhone.length === 0) {
      setSendResult('Nenhum usuário com número de WhatsApp cadastrado.')
      setSending(false)
      return
    }

    let sent = 0
    let failed = 0

    for (const u of withPhone) {
      try {
        const res = await fetch('/api/whatsapp-send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: u.phone,
            message: `Olá, ${u.name}! 👋\n\nBem-vindo ao *VagaZaps*!\n\nEstamos analisando seu perfil e em instantes você receberá as primeiras vagas compatíveis com o que você procura.\n\nFique de olho no seu WhatsApp! 📲`
          }),
        })
        const data = await res.json()
        if (data.success) sent++
        else failed++
        await new Promise(r => setTimeout(r, 2000))
      } catch {
        failed++
      }
    }

    setSendResult(`Enviado: ${sent} | Falhou: ${failed} | Total: ${withPhone.length} números`)
    setSending(false)
  }

  if (authLoading) return <LoadingSpinner text="Carregando painel..." />

  const allUsers = getAllUsers()
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
      setCollectionResult({
        success: true,
        newJobs: result.newJobs,
        totalNotifications: 0,
        results: [{ sourceName: 'Empregos.com.br', collected: 0, newJobs: 0 }, { sourceName: 'Catho', collected: 0, newJobs: 0 }],
      })
    } catch (err) {
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

      {/* WhatsApp Master Control */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">WhatsApp - Controle Master</h2>
            <p className="text-sm text-gray-500 mt-1">Conecte o WhatsApp do sistema para enviar vagas aos clientes.</p>
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
          <p className="text-xs text-gray-400 mb-4">Telefone conectado: {connection.phone}</p>
        )}

        {whatsappError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{whatsappError}</p>
          </div>
        )}

        {connection.status === 'qr_ready' && qrCode && (
          <div className="flex flex-col items-center gap-4 mb-4">
            <p className="text-sm text-gray-600">Escaneie o QR Code com o WhatsApp do sistema</p>
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrCode)}`}
                alt="QR Code WhatsApp"
                className="w-64 h-64"
              />
            </div>
            <p className="text-xs text-gray-400">WhatsApp → Menu → Dispositivos conectados → Conectar dispositivo</p>
          </div>
        )}

        {connection.status === 'connected' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 font-medium">WhatsApp conectado com sucesso!</p>
            <p className="text-sm text-green-700 mt-1">O sistema está pronto para enviar vagas via WhatsApp.</p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {connection.status !== 'connected' && connection.status !== 'qr_ready' ? (
            <button
              onClick={handleConnect}
              disabled={whatsappLoading || connection.status === 'connecting'}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {whatsappLoading ? 'Conectando...' : 'Conectar WhatsApp'}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              Desconectar
            </button>
          )}
          {connection.status === 'connected' && (
            <button
              onClick={handleSendTest}
              disabled={sending}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? 'Enviando...' : '📤 Enviar mensagem para todos'}
            </button>
          )}
        </div>

        {sendResult && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">{sendResult}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard title="Usuários" value={allUsers.length} icon="👤" color="blue" />
        <StatsCard title="Assinantes" value={allUsers.filter((u) => u.plan !== 'FREE').length} icon="💳" color="green" />
        <StatsCard title="Vagas reais" value={realJobs.length} icon="🌐" color="green" />
        <StatsCard title="Vagas totais" value={jobs.length} icon="💼" color="purple" />
        <StatsCard title="Fontes ativas" value={activeSources} icon="🔗" color="yellow" />
        <StatsCard title="Notificações" value={notifications.length} icon="🔔" color="red" />
        <StatsCard title="Alertas ativos" value={notifications.filter(n => n.status === 'UNREAD').length} icon="📬" color="blue" />
        <StatsCard title="Vagas mock" value={jobs.length - realJobs.length} icon="📋" color="gray" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Coleta de vagas reais</h2>
        <p className="text-sm text-gray-500 mb-4">
          Busca vagas automaticamente no Empregos.com.br, Catho e LinkedIn. As vagas coletadas passam pelo matching e geram notificações.
        </p>

        <button
          onClick={handleRunCollection}
          disabled={collecting}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {collecting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Coletando vagas dos sites...
            </span>
          ) : (
            '🚀 Executar coleta agora'
          )}
        </button>

        {collectionResult && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 mb-2">✅ Coleta concluída!</p>
            <div className="space-y-1">
              {collectionResult.results.map((r, i) => (
                <p key={i} className="text-sm text-green-700">
                  {r.sourceName}: {r.collected} coletadas, {r.newJobs} novas
                  {r.error && <span className="text-red-600"> (erro: {r.error})</span>}
                </p>
              ))}
              <p className="text-sm text-green-700 font-medium pt-1">
                Total: {collectionResult.newJobs} novas vagas | {collectionResult.totalNotifications} notificações criadas
              </p>
            </div>
          </div>
        )}

        {collectionError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
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
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  notif.status === 'UNREAD' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{notif.title}</p>
                  <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(notif.sentAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma atividade recente.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Ações rápidas</h2>
        <div className="space-y-3">
          <button
            onClick={() => router.push('/admin/vagas/nova')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <span className="text-xl">➕</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Cadastrar nova vaga</p>
              <p className="text-xs text-gray-500">Criar uma vaga manualmente</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => router.push('/admin/enviar')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <span className="text-xl">📤</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Enviar vagas para interessados</p>
              <p className="text-xs text-gray-500">Notificar usuários compatíveis</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

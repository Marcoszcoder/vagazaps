'use client'

import { useState, useEffect, useCallback } from 'react'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || 'https://vagazaps-whatsapp.onrender.com'

interface ConnectionState {
  status: string
  phone: string | null
  hasQr: boolean
}

export default function WhatsAppPage() {
  const [connection, setConnection] = useState<ConnectionState>({ status: 'disconnected', phone: null, hasQr: false })
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [testPhone, setTestPhone] = useState('')
  const [testMessage, setTestMessage] = useState('')
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
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${WHATSAPP_API}/api/connect`, { method: 'POST' })
      const data = await res.json()
      if (!data.success) {
        setError(data.error || 'Erro ao conectar')
      }
    } catch {
      setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
    }
    setLoading(false)
  }

  async function handleDisconnect() {
    try {
      await fetch(`${WHATSAPP_API}/api/disconnect`, { method: 'POST' })
      setQrCode(null)
      setConnection({ status: 'disconnected', phone: null, hasQr: false })
    } catch {
      setError('Erro ao desconectar')
    }
  }

  async function handleSendTest() {
    if (!testPhone || !testMessage) return
    setSending(true)
    setSendResult('')
    try {
      const res = await fetch(`${WHATSAPP_API}/api/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testPhone, message: testMessage }),
      })
      const data = await res.json()
      if (data.success) {
        setSendResult('Mensagem enviada com sucesso!')
        setTestMessage('')
      } else {
        setSendResult(`Erro: ${data.error}`)
      }
    } catch {
      setSendResult('Erro ao enviar mensagem')
    }
    setSending(false)
  }

  function renderQrCode() {
    if (!qrCode) return null

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrCode)}`

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">Escaneie o QR Code com seu WhatsApp</p>
        <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
          <img src={qrUrl} alt="QR Code WhatsApp" className="w-64 h-64" />
        </div>
        <p className="text-xs text-gray-400">WhatsApp → Menu → Dispositivos conectados → Conectar dispositivo</p>
      </div>
    )
  }

  function getStatusDisplay() {
    switch (connection.status) {
      case 'connected':
        return { text: 'Conectado', color: 'green', icon: '✅' }
      case 'qr_ready':
        return { text: 'Aguardando leitura do QR Code', color: 'yellow', icon: '📱' }
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

  const statusDisplay = getStatusDisplay()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
        <p className="text-gray-500 mt-1">Conecte seu WhatsApp para receber notificações de vagas.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Status da Conexão</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${
                statusDisplay.color === 'green' ? 'bg-green-500' :
                statusDisplay.color === 'yellow' ? 'bg-yellow-500 animate-pulse' :
                statusDisplay.color === 'blue' ? 'bg-blue-500 animate-spin' :
                statusDisplay.color === 'red' ? 'bg-red-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">{statusDisplay.icon} {statusDisplay.text}</span>
            </div>
            {connection.phone && (
              <p className="text-xs text-gray-400 mt-1">Telefone: {connection.phone}</p>
            )}
          </div>

          <div className="flex gap-2">
            {connection.status !== 'connected' && connection.status !== 'qr_ready' ? (
              <button
                onClick={handleConnect}
                disabled={loading || connection.status === 'connecting'}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Conectando...' : 'Conectar WhatsApp'}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Desconectar
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {connection.status === 'qr_ready' && renderQrCode()}

        {connection.status === 'connected' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">WhatsApp conectado com sucesso!</p>
            <p className="text-sm text-green-700 mt-1">Você receberá notificações de vagas compatíveis no seu WhatsApp.</p>
          </div>
        )}
      </div>

      {connection.status === 'connected' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Testar Envio</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="5511999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Olá! Esta é uma mensagem de teste do VagaZaps."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSendTest}
              disabled={sending || !testPhone || !testMessage}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? 'Enviando...' : 'Enviar mensagem de teste'}
            </button>
            {sendResult && (
              <p className={`text-sm ${sendResult.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                {sendResult}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Como funciona</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <span className="text-lg">1️⃣</span>
            <p>Clique em <strong>Conectar WhatsApp</strong> para iniciar a conexão</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2️⃣</span>
            <p>Escaneie o <strong>QR Code</strong> que aparecerá usando seu WhatsApp</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3️⃣</span>
            <p>Pronto! Você receberá notificações de vagas automaticamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useJobs } from '@/contexts/JobsContext'
import { Job, WorkMode, ContractType, ExperienceLevel, UserPreference } from '@/lib/types'
import { getMatchingUsers } from '@/lib/services/matchingService'
import { getAllUsers } from '@/lib/mock/users'
import { getUserPreference } from '@/lib/mock/preferences'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

export default function NovaVagaPage() {
  const router = useRouter()
  const { addJob, jobs } = useJobs()
  const [published, setPublished] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [sending, setSending] = useState(false)
  const [sendProgress, setSendProgress] = useState({ total: 0, processed: 0, sent: 0, pending: 0 })
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    title: '',
    company: '',
    city: '',
    state: 'MT',
    salaryMin: '',
    salaryMax: '',
    contractType: 'CLT' as ContractType,
    workMode: 'PRESENCIAL' as WorkMode,
    experience: 'SEM_EXPERIENCIA' as ExperienceLevel,
    description: '',
    requirements: '',
    benefits: '',
    sourceUrl: '',
    source: 'Manual',
    keywords: '',
  })

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newJob: Job = {
      id: `job-manual-${Date.now()}`,
      title: form.title,
      company: form.company,
      city: form.city,
      state: form.state,
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      workMode: form.workMode,
      contractType: form.contractType,
      experience: form.experience,
      description: form.description,
      requirements: form.requirements.split(',').map(s => s.trim()).filter(Boolean),
      benefits: form.benefits.split(',').map(s => s.trim()).filter(Boolean),
      source: form.source,
      sourceUrl: form.sourceUrl || '#',
      publishedAt: new Date().toISOString(),
      collectedAt: new Date().toISOString(),
      keywords: form.keywords.split(',').map(s => s.trim()).filter(Boolean),
    }

    addJob(newJob)

    const users = getAllUsers()
    const prefMap = new Map<string, UserPreference>()
    for (const u of users) {
      const pref = getUserPreference(u.id)
      if (pref) prefMap.set(u.id, pref)
    }
    const interested = getMatchingUsers(newJob, users, prefMap)

    setMatchCount(interested.length)
    setPublished(true)
  }

  const handleSend = () => {
    setSending(true)
    setSendProgress({ total: matchCount, processed: 0, sent: 0, pending: matchCount })

    let processed = 0
    const interval = setInterval(() => {
      processed++
      const sent = Math.min(processed, matchCount - (processed > matchCount - 2 ? 0 : Math.floor(Math.random() * 2)))
      setSendProgress({
        total: matchCount,
        processed,
        sent,
        pending: Math.max(0, matchCount - processed),
      })
      if (processed >= matchCount) {
        clearInterval(interval)
        setTimeout(() => setSent(true), 500)
      }
    }, 150)
  }

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vagas enviadas com sucesso!</h1>
        <p className="text-gray-500 mb-6">
          {sendProgress.sent} notificações foram enviadas para usuários interessados.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Voltar ao painel
          </button>
          <button
            onClick={() => {
              setPublished(false)
              setSent(false)
              setForm({
                title: '', company: '', city: '', state: 'MT', salaryMin: '', salaryMax: '',
                contractType: 'CLT', workMode: 'PRESENCIAL', experience: 'SEM_EXPERIENCIA',
                description: '', requirements: '', benefits: '', sourceUrl: '', source: 'Manual', keywords: '',
              })
            }}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cadastrar outra vaga
          </button>
        </div>
      </div>
    )
  }

  if (sending) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Enviando notificações...</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4 text-sm text-gray-600">
            {sendProgress.total} destinatários
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(sendProgress.processed / sendProgress.total) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{sendProgress.processed}</div>
              <div className="text-sm text-gray-500">Processados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{sendProgress.sent}</div>
              <div className="text-sm text-gray-500">Enviados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{sendProgress.pending}</div>
              <div className="text-sm text-gray-500">Aguardando</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (published) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✅</span>
            <h2 className="text-lg font-bold text-green-800">Vaga cadastrada com sucesso!</h2>
          </div>
          <p className="text-green-700">
            Encontramos <strong>{matchCount}</strong> usuários potencialmente interessados nesta vaga.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSend}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Enviar para interessados
          </button>
          <button
            onClick={() => router.push('/admin/enviar')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Visualizar interessados
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-2.5 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Não enviar agora
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Cadastrar nova vaga</h1>
      <p className="text-gray-500 mb-6">Preencha os dados da vaga para publicá-la no sistema.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input type="text" required value={form.title} onChange={e => update('title', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
              <input type="text" required value={form.company} onChange={e => update('company', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
              <input type="text" required value={form.city} onChange={e => update('city', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
              <select value={form.state} onChange={e => update('state', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
                {BRAZILIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salário mínimo</label>
              <input type="number" value={form.salaryMin} onChange={e => update('salaryMin', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salário máximo</label>
              <input type="number" value={form.salaryMax} onChange={e => update('salaryMax', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de contratação</label>
              <select value={form.contractType} onChange={e => update('contractType', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="ESTAGIO">Estágio</option>
                <option value="TEMPORARIO">Temporário</option>
                <option value="Freelancer">Freelancer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidade</label>
              <select value={form.workMode} onChange={e => update('workMode', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
                <option value="PRESENCIAL">Presencial</option>
                <option value="HIBRIDO">Híbrido</option>
                <option value="REMOTO">Remoto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experiência</label>
              <select value={form.experience} onChange={e => update('experience', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
                <option value="SEM_EXPERIENCIA">Sem experiência</option>
                <option value="6_MESES">6 meses</option>
                <option value="1_ANO">1 ano</option>
                <option value="2_ANOS">2 anos</option>
                <option value="3_MAIS">3+ anos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
              <textarea required rows={4} value={form.description} onChange={e => update('description', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos (separados por vírgula)</label>
              <input type="text" value={form.requirements} onChange={e => update('requirements', e.target.value)}
                placeholder="Ex: Excel, Comunicação, Organização"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benefícios (separados por vírgula)</label>
              <input type="text" value={form.benefits} onChange={e => update('benefits', e.target.value)}
                placeholder="Ex: Vale transporte, Vale refeição, Plano de saúde"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Palavras-chave (separadas por vírgula)</label>
              <input type="text" value={form.keywords} onChange={e => update('keywords', e.target.value)}
                placeholder="Ex: administrativo, atendimento, suporte"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fonte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL original</label>
              <input type="url" value={form.sourceUrl} onChange={e => update('sourceUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fonte</label>
              <input type="text" value={form.source} onChange={e => update('source', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Publicar vaga
          </button>
          <button type="button" onClick={() => router.push('/admin')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

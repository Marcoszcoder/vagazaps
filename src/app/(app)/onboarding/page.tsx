'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { setUserPreference } from '@/lib/mock/preferences'
import { ExperienceLevel, WorkMode } from '@/lib/types'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

const JOB_OPTIONS = [
  'Auxiliar administrativo','Vendedor','Atendente','TI','Suporte técnico',
  'Motorista','Auxiliar de logística','Operador de caixa','Serviços gerais',
  'Construção','Desenvolvedor','Estágio',
]

const EXPERIENCE_MAP: { label: string; value: ExperienceLevel }[] = [
  { label: 'Sem experiência', value: 'SEM_EXPERIENCIA' },
  { label: '6 meses', value: '6_MESES' },
  { label: '1 ano', value: '1_ANO' },
  { label: '2 anos', value: '2_ANOS' },
  { label: '3+ anos', value: '3_MAIS' },
]

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [step, setStep] = useState(1)

  const [city, setCity] = useState(user?.city || '')
  const [state, setState] = useState(user?.state || '')
  const [workModes, setWorkModes] = useState<WorkMode[]>([])
  const [jobTitles, setJobTitles] = useState<string[]>([])
  const [customJob, setCustomJob] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [experience, setExperience] = useState<ExperienceLevel>('SEM_EXPERIENCIA')
  const [channel, setChannel] = useState<'email' | null>(null)

  const progress = (step / TOTAL_STEPS) * 100

  function toggleWorkMode(mode: WorkMode) {
    setWorkModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    )
  }

  function toggleJobTitle(title: string) {
    setJobTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  function addCustomJob() {
    const trimmed = customJob.trim()
    if (trimmed && !jobTitles.includes(trimmed)) {
      setJobTitles((prev) => [...prev, trimmed])
      setCustomJob('')
    }
  }

  function parseSalary(): number {
    const raw = salaryMin.replace(/[^\d,]/g, '').replace(',', '.')
    return parseFloat(raw) || 0
  }

  function handleFinish() {
    if (!user) return
    setUserPreference({
      userId: user.id,
      cities: city ? [city] : [],
      states: state ? [state] : [],
      jobTitles,
      salaryMin: parseSalary(),
      workMode: workModes.length > 0 ? workModes : ['PRESENCIAL'],
      experience,
      contractTypes: ['CLT'],
    })
    updateUser({ onboardingCompleted: true })
    router.push('/dashboard')
  }

  const canNext = () => {
    if (step === 1) return city.trim().length > 0 && state.length > 0
    if (step === 2) return jobTitles.length > 0
    if (step === 3) return salaryMin.trim().length > 0
    if (step === 4) return true
    if (step === 5) return channel !== null
    return false
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Onde você quer trabalhar?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Rondonópolis"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                <option value="">Selecione o estado</option>
                {BRAZILIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalidade de trabalho</label>
              <div className="flex flex-wrap gap-3">
                {(['PRESENCIAL', 'HIBRIDO', 'REMOTO'] as WorkMode[]).map((mode) => (
                  <label
                    key={mode}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                      workModes.includes(mode)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={workModes.includes(mode)}
                      onChange={() => toggleWorkMode(mode)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      workModes.includes(mode) ? 'bg-green-600 border-green-600' : 'border-gray-300'
                    }`}>
                      {workModes.includes(mode) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm font-medium">
                      {mode === 'PRESENCIAL' ? 'Presencial' : mode === 'HIBRIDO' ? 'Híbrido' : 'Remoto'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Que tipo de trabalho você procura?</h2>
            <div className="flex flex-wrap gap-2">
              {JOB_OPTIONS.map((title) => (
                <button
                  key={title}
                  onClick={() => toggleJobTitle(title)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    jobTitles.includes(title)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outro cargo (personalizado)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customJob}
                  onChange={(e) => setCustomJob(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomJob())}
                  placeholder="Digite e pressione Enter"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <button
                  onClick={addCustomJob}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Adicionar
                </button>
              </div>
            </div>
            {jobTitles.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Selecionados:</p>
                <div className="flex flex-wrap gap-2">
                  {jobTitles.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {t}
                      <button onClick={() => toggleJobTitle(t)} className="ml-1 text-green-500 hover:text-green-700">&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Qual salário mínimo você procura?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salário mínimo (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
                <input
                  type="text"
                  value={salaryMin}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d]/g, '')
                    if (raw) {
                      const num = parseInt(raw)
                      setSalaryMin(num.toLocaleString('pt-BR'))
                    } else {
                      setSalaryMin('')
                    }
                  }}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-lg"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Digite apenas números. Ex: 2500</p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Sua experiência</h2>
            <div className="space-y-3">
              {EXPERIENCE_MAP.map((exp) => (
                <label
                  key={exp.value}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg border cursor-pointer transition-colors ${
                    experience === exp.value
                      ? 'bg-green-50 border-green-500'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    checked={experience === exp.value}
                    onChange={() => setExperience(exp.value)}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    experience === exp.value ? 'border-green-600' : 'border-gray-300'
                  }`}>
                    {experience === exp.value && (
                      <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{exp.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Como você quer receber?</h2>
            <div className="space-y-3">
              <button
                disabled
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60"
              >
                <span className="text-3xl">💬</span>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-400">WhatsApp — em breve</p>
                  <p className="text-xs text-gray-400">WhatsApp será disponível em breve!</p>
                </div>
                <span className="text-xs bg-gray-200 text-gray-400 px-2 py-1 rounded-full">Em breve</span>
              </button>
              <button
                onClick={() => setChannel('email')}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors ${
                  channel === 'email'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-green-400'
                }`}
              >
                <span className="text-3xl">📧</span>
                <div className="text-left flex-1">
                  <p className="font-semibold">E-mail</p>
                  <p className="text-xs text-gray-500">Receba vagas por e-mail</p>
                </div>
                {channel === 'email' && (
                  <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">WhatsApp será disponível em breve!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1 flex flex-col">
        <div className="mb-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">VagaZaps</h1>
          <p className="text-sm text-gray-500 mt-1">Configure seu perfil em poucos passos</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Passo {step} de {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1">
          {renderStep()}
        </div>

        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voltar
            </button>
          )}
          <button
            onClick={() => {
              if (step === TOTAL_STEPS) {
                handleFinish()
              } else {
                setStep((s) => s + 1)
              }
            }}
            disabled={!canNext()}
            className="flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === TOTAL_STEPS ? 'Finalizar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  )
}

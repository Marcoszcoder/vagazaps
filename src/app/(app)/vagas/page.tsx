'use client'

import { useState, useMemo } from 'react'
import { useJobs } from '@/contexts/JobsContext'
import JobCard from '@/components/ui/JobCard'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { JobFilters, WorkMode, ContractType, ExperienceLevel } from '@/lib/types'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

const WORK_MODES: { label: string; value: WorkMode | '' }[] = [
  { label: 'Todos', value: '' },
  { label: 'Presencial', value: 'PRESENCIAL' },
  { label: 'Híbrido', value: 'HIBRIDO' },
  { label: 'Remoto', value: 'REMOTO' },
]

const CONTRACT_TYPES: { label: string; value: ContractType | '' }[] = [
  { label: 'Todos', value: '' },
  { label: 'CLT', value: 'CLT' },
  { label: 'PJ', value: 'PJ' },
  { label: 'Estágio', value: 'ESTAGIO' },
  { label: 'Temporário', value: 'TEMPORARIO' },
  { label: 'Freelancer', value: 'Freelancer' },
]

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel | '' }[] = [
  { label: 'Todas', value: '' },
  { label: 'Sem experiência', value: 'SEM_EXPERIENCIA' },
  { label: '6 meses', value: '6_MESES' },
  { label: '1 ano', value: '1_ANO' },
  { label: '2 anos', value: '2_ANOS' },
  { label: '3+ anos', value: '3_MAIS' },
]

const SORT_OPTIONS = [
  { label: 'Mais recentes', value: 'recent' as const },
  { label: 'Maior salário', value: 'salary' as const },
  { label: 'Maior compatibilidade', value: 'match' as const },
]

export default function VagasPage() {
  const { jobs, loading, filterJobsList, getJobMatch } = useJobs()
  const [showFilters, setShowFilters] = useState(false)

  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [workMode, setWorkMode] = useState<WorkMode | ''>('')
  const [contractType, setContractType] = useState<ContractType | ''>('')
  const [experience, setExperience] = useState<ExperienceLevel | ''>('')
  const [salaryMin, setSalaryMin] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'match'>('recent')

  const activeFiltersCount = [city, state, workMode, contractType, experience, salaryMin].filter(Boolean).length

  const filteredJobs = useMemo(() => {
    const filters: JobFilters = {}
    if (city.trim()) filters.city = city.trim()
    if (state) filters.state = state
    if (workMode) filters.workMode = workMode
    if (contractType) filters.contractType = contractType
    if (experience) filters.experience = experience
    if (salaryMin) filters.salaryMin = parseInt(salaryMin.replace(/[^\d]/g, '')) || 0
    if (sortBy) filters.sortBy = sortBy

    let result = filterJobsList(filters)

    if (sortBy === 'match') {
      result = [...result].sort((a, b) => {
        const matchA = getJobMatch(a)
        const matchB = getJobMatch(b)
        return (matchB?.score || 0) - (matchA?.score || 0)
      })
    }

    return result
  }, [city, state, workMode, contractType, experience, salaryMin, sortBy, jobs, filterJobsList, getJobMatch])

  function clearFilters() {
    setCity('')
    setState('')
    setWorkMode('')
    setContractType('')
    setExperience('')
    setSalaryMin('')
    setSortBy('recent')
  }

  if (loading) {
    return <LoadingSpinner text="Carregando vagas..." />
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Encontrar vagas</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Rondonópolis"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                <option value="">Todos</option>
                {BRAZILIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Modalidade</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                {WORK_MODES.map((wm) => (
                  <option key={wm.value} value={wm.value}>{wm.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Contrato</label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as ContractType | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                {CONTRACT_TYPES.map((ct) => (
                  <option key={ct.value} value={ct.value}>{ct.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Experiência</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as ExperienceLevel | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <option key={exp.value} value={exp.value}>{exp.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Salário mínimo</label>
              <input
                type="text"
                value={salaryMin}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, '')
                  setSalaryMin(raw ? parseInt(raw).toLocaleString('pt-BR') : '')
                }}
                placeholder="R$ 0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{filteredJobs.length}</span> vagas encontradas
      </p>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} matchResult={getJobMatch(job)} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="Nenhuma vaga encontrada"
          description="Tente ajustar os filtros para encontrar mais oportunidades."
          action={{ label: 'Limpar filtros', onClick: clearFilters }}
        />
      )}
    </div>
  )
}

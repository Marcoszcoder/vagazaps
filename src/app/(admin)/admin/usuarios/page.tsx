'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createUserByAdmin, getAllStoredUsers, deleteUser } from '@/lib/services/authService'
import { getAllUsers } from '@/lib/mock/users'
import { User } from '@/lib/types'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

export default function UsuariosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    state: 'MT',
    phone: '',
    plan: 'FREE' as 'FREE' | 'ESSENTIAL' | 'PRO',
  })

  useEffect(() => {
    loadUsers()
  }, [])

  function loadUsers() {
    const mock = getAllUsers()
    const stored = getAllStoredUsers()
    const all = [...mock, ...stored]
    const unique = all.filter((u, i, arr) => arr.findIndex(x => x.email === u.email) === i)
    setAllUsers(unique)
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.email || !form.password || !form.city) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    const result = createUserByAdmin({
      name: form.name,
      email: form.email,
      password: form.password,
      city: form.city,
      state: form.state,
      phone: form.phone || undefined,
      plan: form.plan,
    })

    if (result.success) {
      setSuccess(`Usuário ${form.email} criado com sucesso!`)
      setForm({ name: '', email: '', password: '', city: '', state: 'MT', phone: '', plan: 'FREE' })
      setShowForm(false)
      loadUsers()
    } else {
      setError(result.error || 'Erro ao criar usuário')
    }
  }

  function handleDelete(email: string) {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${email}?`)) return
    deleteUser(email)
    loadUsers()
  }

  function getPlanBadge(plan: string) {
    switch (plan) {
      case 'PRO': return <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">PRO</span>
      case 'ESSENTIAL': return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">ESSENTIAL</span>
      default: return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">FREE</span>
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-500 mt-1">Crie e gerencie contas de clientes.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          {showForm ? '✕ Cancelar' : '➕ Novo usuário'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Criar novo usuário</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="(66) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
              <input
                type="text"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: Rondonópolis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
              <select
                value={form.state}
                onChange={e => setForm({ ...form, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                {BRAZILIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plano</label>
              <select
                value={form.plan}
                onChange={e => setForm({ ...form, plan: e.target.value as 'FREE' | 'ESSENTIAL' | 'PRO' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              >
                <option value="FREE">FREE</option>
                <option value="ESSENTIAL">ESSENTIAL</option>
                <option value="PRO">PRO</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Criar usuário
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {allUsers.length} usuário{allUsers.length !== 1 ? 's' : ''} cadastrado{allUsers.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {allUsers.map(u => (
            <div key={u.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-600">
                  {u.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                  {u.isAdmin && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 rounded">ADMIN</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>

              <div className="text-xs text-gray-500 hidden sm:block">
                {u.city}/{u.state}
              </div>

              <div className="hidden md:block">
                {getPlanBadge(u.plan)}
              </div>

              {u.phone && (
                <div className="text-xs text-gray-400 hidden lg:block">
                  {u.phone}
                </div>
              )}

              {!u.isAdmin && (
                <button
                  onClick={() => handleDelete(u.email)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Excluir
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

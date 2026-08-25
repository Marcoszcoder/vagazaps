'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export default function CadastroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = 'Nome é obrigatório.'
    if (!email.trim()) newErrors.email = 'E-mail é obrigatório.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'E-mail inválido.'
    if (!password) newErrors.password = 'Senha é obrigatória.'
    else if (password.length < 6)
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'As senhas não coincidem.'
    if (!city.trim()) newErrors.city = 'Cidade é obrigatória.'
    if (!state) newErrors.state = 'Estado é obrigatório.'
    if (!acceptedTerms)
      newErrors.terms = 'Você precisa aceitar os termos de uso.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
      city: city.trim(),
      state,
    })

    if (result.success) {
      router.push('/onboarding')
    } else {
      setErrors({ general: result.error || 'Erro ao criar conta.' })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold text-[#16a34a]">
              VagaZaps
            </Link>
            <h1 className="mt-4 text-xl font-bold text-[#1e293b]">
              Criar sua conta
            </h1>
          </div>

          {errors.general && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                  errors.name
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                }`}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                  errors.password
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                Cidade
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                  errors.city
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                }`}
                placeholder="Sua cidade"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-slate-700">
                Estado
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-[#1e293b] shadow-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.state
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:border-[#16a34a] focus:ring-[#16a34a]'
                } ${!state ? 'text-slate-400' : ''}`}
              >
                <option value="" disabled>
                  Selecione o estado
                </option>
                {BRAZILIAN_STATES.map((s) => (
                  <option key={s.value} value={s.value} className="text-[#1e293b]">
                    {s.label}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-xs text-red-600">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span className="text-sm text-slate-600">
                  Aceito os{' '}
                  <a href="#" className="font-medium text-[#16a34a] hover:underline">
                    termos de uso
                  </a>{' '}
                  e{' '}
                  <a href="#" className="font-medium text-[#16a34a] hover:underline">
                    política de privacidade
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-600">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Já tenho uma conta{' '}
            <Link href="/login" className="font-medium text-[#16a34a] hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

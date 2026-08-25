'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ConfiguracoesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [emailNotif, setEmailNotif] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (isLoading || !user) {
    return <LoadingSpinner text="Carregando configurações..." />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500 mt-1">Gerencie suas preferências e conta.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Notificações</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações por e-mail</p>
              <p className="text-xs text-gray-500">Receba alertas de novas vagas por e-mail</p>
            </div>
            <button
              onClick={() => setEmailNotif(!emailNotif)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotif ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotif ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações por WhatsApp</p>
              <p className="text-xs text-gray-500">Receba vagas diretamente no WhatsApp</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Em breve</span>
              <button disabled className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Conta</h2>
        <div className="space-y-3">
          <Button variant="outline" size="sm">
            Alterar senha
          </Button>

          <div className="border-t border-gray-100 pt-3">
            {!showDeleteConfirm ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Excluir conta
              </Button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                <p className="text-sm text-red-700 font-medium">
                  Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                    Cancelar
                  </Button>
                  <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                    Confirmar exclusão
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Integração WhatsApp</h2>
        <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <span className="text-lg">🟡</span>
          <div>
            <p className="text-sm font-medium text-yellow-800">Em desenvolvimento</p>
            <p className="text-xs text-yellow-600">A integração com WhatsApp estará disponível em breve.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Sobre</h2>
        <div className="space-y-3 text-sm">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">VagaZaps v1.0.0</span> — MVP
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push('/onboarding')}
              className="text-left text-green-600 hover:text-green-700 font-medium"
            >
              Termos de uso
            </button>
            <button
              onClick={() => router.push('/onboarding')}
              className="text-left text-green-600 hover:text-green-700 font-medium"
            >
              Política de privacidade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

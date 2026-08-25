import { Job } from '../types'

export interface WhatsAppProvider {
  sendMessage(phone: string, message: string): Promise<{ success: boolean; messageId?: string }>
}

export class MockWhatsAppProvider implements WhatsAppProvider {
  async sendMessage(phone: string, message: string): Promise<{ success: boolean; messageId?: string }> {
    await new Promise((r) => setTimeout(r, 500))
    console.log(`[MOCK WhatsApp] Enviando para ${phone}: ${message}`)
    return { success: true, messageId: `mock-${Date.now()}` }
  }
}

export function getWhatsAppProvider(): WhatsAppProvider {
  return new MockWhatsAppProvider()
}

export function formatJobMessage(job: Job, matchScore: number): string {
  return `🚨 NOVA VAGA ENCONTRADA\n\n${job.title}\n\n📍 ${job.city} - ${job.state}\n💰 R$ ${job.salaryMin.toLocaleString('pt-BR')} - R$ ${job.salaryMax.toLocaleString('pt-BR')}\n\nCompatibilidade: ${matchScore}%\n\n👉 Ver vaga: ${job.sourceUrl}`
}

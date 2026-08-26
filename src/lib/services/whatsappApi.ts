const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://vagazaps-whatsapp.onrender.com'

export async function sendWhatsAppMessage(phone: string, message: string): Promise<{ success: boolean; messageId?: string }> {
  try {
    const res = await fetch(`${WHATSAPP_API}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    })
    const data = await res.json()
    return data
  } catch {
    return { success: false }
  }
}

export function getWelcomeMessage(userName: string): string {
  return `Olá, ${userName}! 👋\n\nBem-vindo ao *VagaZaps*!\n\nEstamos analisando seu perfil e em instantes você receberá as primeiras vagas compatíveis com o que você procura.\n\nFique de olho no seu WhatsApp! 📲`
}

export function getJobMessage(job: { title: string; city: string; salaryMin: number; salaryMax: number; company?: string; workMode?: string; sourceUrl: string }, matchScore: number): string {
  let msg = `🚨 *NOVA VAGA ENCONTRADA*\n\n`
  msg += `💼 *${job.title}*\n`
  msg += `📍 ${job.city}`
  if (job.company) msg += ` • ${job.company}`
  msg += `\n💰 R$ ${job.salaryMin.toLocaleString('pt-BR')} - R$ ${job.salaryMax.toLocaleString('pt-BR')}`
  if (job.workMode) msg += `\n🏠 ${job.workMode}`
  msg += `\n\n🎯 Compatibilidade: *${matchScore}%*\n`
  msg += `\n👉 ${job.sourceUrl}`
  return msg
}

export function getFollowUpMessage(userName: string): string {
  return `E aí, ${userName}! 😊\n\nEspero que esteja gostando das vagas que enviamos!\n\nSe precisar ajustar suas preferências, é só acessar o painel do VagaZaps.\n\nBoa sorte na sua busca! 🍀`
}

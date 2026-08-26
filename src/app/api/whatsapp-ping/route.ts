import { NextResponse } from 'next/server'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://nodejs-production-5edf4.up.railway.app'

export async function GET() {
  try {
    const res = await fetch(`${WHATSAPP_API}/health`, { method: 'GET' })
    const data = await res.json()
    console.log(`[API/whatsapp-ping] status=${data.status} alive=${data.alive}`)
    return NextResponse.json({ ok: true, backend: data })
  } catch (error) {
    console.error('[API/whatsapp-ping] Error:', error)
    return NextResponse.json({ ok: false, error: 'Backend unreachable' }, { status: 502 })
  }
}

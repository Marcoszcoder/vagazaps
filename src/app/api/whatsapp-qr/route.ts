import { NextResponse } from 'next/server'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://vagazaps-whatsapp.onrender.com'

export async function GET() {
  try {
    const res = await fetch(`${WHATSAPP_API}/api/qr`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ qr: null, status: 'offline' })
  }
}

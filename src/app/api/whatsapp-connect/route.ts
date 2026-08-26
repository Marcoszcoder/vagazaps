import { NextRequest, NextResponse } from 'next/server'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://nodejs-production-5edf4.up.railway.app'

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(`${WHATSAPP_API}/api/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ success: false, error: 'Backend unreachable' }, { status: 502 })
  }
}

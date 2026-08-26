import { NextRequest, NextResponse } from 'next/server'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://vagazaps-whatsapp.onrender.com'

export async function POST(req: NextRequest) {
  try {
    const { phone, message } = await req.json()

    if (!phone || !message) {
      return NextResponse.json({ success: false, error: 'phone and message required' }, { status: 400 })
    }

    const res = await fetch(`${WHATSAPP_API}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    })

    const data = await res.json()
    console.log(`[API/whatsapp-send] phone=${phone} success=${data.success}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[API/whatsapp-send] Error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

const WHATSAPP_API = process.env.NEXT_PUBLIC_WHATSAPP_API || 'https://vagazaps-whatsapp.onrender.com'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'messages array required' }, { status: 400 })
    }

    const res = await fetch(`${WHATSAPP_API}/api/send-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    const data = await res.json()
    console.log(`[API/whatsapp-batch] sent=${messages.length} success=${data.success}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[API/whatsapp-batch] Error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send batch' }, { status: 500 })
  }
}

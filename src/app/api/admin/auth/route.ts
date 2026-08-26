import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { login, password } = await request.json()

    const adminLogin = process.env.ADMIN_LOGIN
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminLogin || !adminPassword) {
      return NextResponse.json({ success: false, error: 'Configuração admin não encontrada' }, { status: 500 })
    }

    if (login === adminLogin && password === adminPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Credenciais inválidas' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, error: 'Erro ao processar requisição' }, { status: 500 })
  }
}

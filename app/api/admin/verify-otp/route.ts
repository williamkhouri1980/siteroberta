import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  const otpId    = req.cookies.get('admin_otp_pending')?.value

  if (!otpId || !code) {
    return NextResponse.json({ error: 'Sessão expirada. Faça login novamente.' }, { status: 400 })
  }

  // Busca o OTP no Supabase
  const { data: otp } = await supabaseAdmin
    .from('admin_otp')
    .select('*')
    .eq('id', otpId)
    .single()

  if (!otp) {
    return NextResponse.json({ error: 'Código inválido ou sessão expirada.' }, { status: 401 })
  }

  // Já utilizado
  if (otp.used) {
    return NextResponse.json({ error: 'Código já utilizado. Faça login novamente.' }, { status: 401 })
  }

  // Expirado
  if (new Date(otp.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Código expirado. Faça login novamente.' }, { status: 401 })
  }

  // Muitas tentativas (máx 5)
  if (otp.attempts >= 5) {
    return NextResponse.json({ error: 'Muitas tentativas incorretas. Faça login novamente.' }, { status: 429 })
  }

  // Código errado → incrementa tentativas
  if (otp.code !== String(code).trim()) {
    await supabaseAdmin
      .from('admin_otp')
      .update({ attempts: otp.attempts + 1 })
      .eq('id', otpId)

    const restantes = 4 - otp.attempts
    return NextResponse.json({
      error: restantes > 0
        ? `Código incorreto. ${restantes} tentativa${restantes !== 1 ? 's' : ''} restante${restantes !== 1 ? 's' : ''}.`
        : 'Código incorreto. Última tentativa esgotada.'
    }, { status: 401 })
  }

  // Código correto → marca como usado
  await supabaseAdmin
    .from('admin_otp')
    .update({ used: true })
    .eq('id', otpId)

  // Cria sessão (8 horas)
  const secret = process.env.ADMIN_SESSION_SECRET!
  const res    = NextResponse.json({ ok: true })

  res.cookies.set('admin_otp_pending', '', { maxAge: 0, path: '/' })
  res.cookies.set('admin_session', secret, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 8, // 8 horas (era 7 dias)
    path:     '/',
  })

  return res
}

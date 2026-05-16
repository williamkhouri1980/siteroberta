import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json({ error: 'Servidor mal configurado' }, { status: 500 })
  }

  if (password !== adminPassword) {
    // Delay para dificultar brute-force em timing attacks
    await new Promise(r => setTimeout(r, 800))
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  // Gera código de 6 dígitos
  const code      = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

  // Limpa OTPs expirados (housekeeping)
  await supabaseAdmin
    .from('admin_otp')
    .delete()
    .lt('expires_at', new Date().toISOString())

  // Insere novo OTP
  const { data: otp, error } = await supabaseAdmin
    .from('admin_otp')
    .insert({ code, expires_at: expiresAt.toISOString(), attempts: 0 })
    .select('id')
    .single()

  if (error || !otp) {
    console.error('OTP insert error:', error)
    return NextResponse.json({ error: 'Erro ao gerar código. Tente novamente.' }, { status: 500 })
  }

  // Envia email para os destinatários configurados
  const recipients = (process.env.ADMIN_OTP_EMAILS ?? '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean)

  try {
    await resend.emails.send({
      from:    'Admin Dra. Roberta <no-reply@robertapulcheri.com.br>',
      to:      recipients,
      subject: `Código de acesso ao painel: ${code}`,
      html: `
        <div style="font-family: monospace; max-width: 480px; margin: 0 auto; padding: 40px 32px; background: #f4f5f7;">
          <p style="font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8f99; margin: 0 0 32px;">
            Painel Administrativo · Dra. Roberta Pulcheri Ramos
          </p>
          <p style="font-size: 14px; color: #1a1f2b; margin: 0 0 24px;">
            Código de verificação solicitado:
          </p>
          <div style="background: #1a1f2b; border-radius: 8px; padding: 28px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 0.28em; color: #9AC4D8;">
              ${code}
            </span>
          </div>
          <p style="font-size: 12px; color: #8a8f99; line-height: 1.7; margin: 0;">
            Válido por <strong>10 minutos</strong>. Use apenas uma vez.<br>
            Se não foi você, ignore este email — a senha continua protegida.
          </p>
        </div>
      `,
    })
  } catch (emailError) {
    console.error('Email send error:', emailError)
    await supabaseAdmin.from('admin_otp').delete().eq('id', otp.id)
    return NextResponse.json({ error: 'Erro ao enviar email. Tente novamente.' }, { status: 500 })
  }

  // Cookie temporário com ID do OTP (httpOnly — invisível ao JS)
  const res = NextResponse.json({ pending: true })
  res.cookies.set('admin_otp_pending', otp.id, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   10 * 60,
    path:     '/',
  })

  return res
}

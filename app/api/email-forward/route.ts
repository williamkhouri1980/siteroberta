import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Token simples para evitar chamadas não autorizadas ao webhook
const WEBHOOK_TOKEN = process.env.EMAIL_FORWARD_TOKEN

export async function POST(req: NextRequest) {
  // Verifica token de segurança
  const token = req.nextUrl.searchParams.get('token')
  if (!WEBHOOK_TOKEN || token !== WEBHOOK_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: {
    from?:    string
    to?:      string | string[]
    subject?: string
    html?:    string
    text?:    string
  }

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const from    = payload.from    ?? 'desconhecido'
  const subject = payload.subject ?? '(sem assunto)'
  const html    = payload.html
  const text    = payload.text

  // Corpo do e-mail encaminhado
  const forwardedHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f4f5f7; padding: 12px 20px; border-radius: 8px; margin-bottom: 24px;
                  font-size: 12px; color: #555;">
        <strong>Encaminhado de:</strong> ${from}<br>
        <strong>Para:</strong> contato@robertapulcheri.com.br<br>
        <strong>Assunto original:</strong> ${subject}
      </div>
      ${html ?? `<p style="white-space: pre-wrap;">${text ?? ''}</p>`}
    </div>
  `

  const { error } = await resend.emails.send({
    from:     'contato@robertapulcheri.com.br',
    to:       'robertapulcheri@gmail.com',
    replyTo:  from,
    subject:  `[Contato Site] ${subject}`,
    html:     forwardedHtml,
  })

  if (error) {
    console.error('Email forward error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

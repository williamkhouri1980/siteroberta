'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PulmiTree from '@/components/PulmiTree'

type Step = 'password' | 'otp'

export default function LoginPage() {
  const [step, setStep]         = useState<Step>('password')
  const [password, setPassword] = useState('')
  const [otp, setOtp]           = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const otpRef                  = useRef<HTMLInputElement>(null)
  const router                  = useRouter()

  // Foca no campo OTP ao entrar no passo 2
  useEffect(() => {
    if (step === 'otp') otpRef.current?.focus()
  }, [step])

  // ── Passo 1: verificar senha ──────────────────────────────────
  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      setStep('otp')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erro ao verificar senha')
    }
    setLoading(false)
  }

  // ── Passo 2: verificar OTP ────────────────────────────────────
  async function handleOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/verify-otp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ code: otp }),
    })

    if (res.ok) {
      window.location.href = '/admin'
    } else {
      const data = await res.json()
      setError(data.error ?? 'Código inválido')
      setOtp('')
    }
    setLoading(false)
  }

  return (
    <div className="adm-login">
      <div className="adm-login-box">
        <div className="adm-login-brand">
          <div className="adm-login-logo-wrap">
            <PulmiTree size={72} dark />
          </div>
          <h1>Painel Administrativo</h1>
          <p>Dra. Roberta Pulcheri Ramos</p>
        </div>

        {/* ── PASSO 1: Senha ── */}
        {step === 'password' && (
          <form onSubmit={handlePassword}>
            <div className="adm-field">
              <label className="adm-label">Senha de acesso</label>
              <input
                className="adm-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoFocus
                required
              />
            </div>
            {error && <p className="adm-error" style={{ marginBottom: '0.75rem' }}>{error}</p>}
            <button
              className="adm-btn-primary"
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {loading ? 'Verificando…' : 'Continuar →'}
            </button>
          </form>
        )}

        {/* ── PASSO 2: Código OTP ── */}
        {step === 'otp' && (
          <form onSubmit={handleOtp}>
            <div className="adm-login-otp-info">
              <span className="adm-login-otp-icon">✉</span>
              <p>Código enviado para seu email.<br />Válido por <strong>10 minutos</strong>.</p>
            </div>
            <div className="adm-field">
              <label className="adm-label">Código de 6 dígitos</label>
              <input
                ref={otpRef}
                className="adm-input adm-input-otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                required
              />
            </div>
            {error && <p className="adm-error" style={{ marginBottom: '0.75rem' }}>{error}</p>}
            <button
              className="adm-btn-primary"
              type="submit"
              disabled={loading || otp.length < 6}
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {loading ? 'Verificando…' : 'Entrar'}
            </button>
            <button
              type="button"
              className="adm-login-back"
              onClick={() => { setStep('password'); setError(''); setOtp('') }}
            >
              ← Voltar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

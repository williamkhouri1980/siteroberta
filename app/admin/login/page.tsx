'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erro ao entrar')
      setLoading(false)
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login-box">
        <div className="adm-login-brand">
          <div className="adm-login-logo-wrap">RPR</div>
          <h1>Painel Administrativo</h1>
          <p>Dra. Roberta Pulcheri Ramos</p>
        </div>
        <form onSubmit={handleSubmit}>
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
          <button className="adm-btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

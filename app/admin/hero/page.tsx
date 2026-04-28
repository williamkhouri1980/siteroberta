'use client'
import { useContent } from '../useContent'

const initial = {
  eyebrow:       '',
  h1:            '',
  corpo:         '',
  ctaPrimario:   '',
  ctaSecundario: '',
}

export default function HeroPage() {
  const { data, setData, loading, saving, msg, save } = useContent('hero', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  return (
    <>
      <h1 className="adm-page-title">Hero — Seção Principal</h1>
      <p className="adm-page-desc">Primeiro bloco visível da página. O H1 é crítico para SEO.</p>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Eyebrow (texto pequeno acima do título)</label>
          <input className="adm-input" value={data.eyebrow} onChange={e => setData({ ...data, eyebrow: e.target.value })} placeholder="Pneumologia · São Paulo · Telemedicina Global" />
        </div>
        <div className="adm-field">
          <label className="adm-label">Título principal H1 — crítico para SEO</label>
          <textarea className="adm-textarea" value={data.h1} onChange={e => setData({ ...data, h1: e.target.value })} style={{ minHeight: '70px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Parágrafo de apoio</label>
          <textarea className="adm-textarea" value={data.corpo} onChange={e => setData({ ...data, corpo: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="adm-field">
            <label className="adm-label">CTA primário (WhatsApp)</label>
            <input className="adm-input" value={data.ctaPrimario} onChange={e => setData({ ...data, ctaPrimario: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">CTA secundário</label>
            <input className="adm-input" value={data.ctaSecundario} onChange={e => setData({ ...data, ctaSecundario: e.target.value })} />
          </div>
        </div>
        <div className="adm-actions">
          <button className="adm-btn-primary" onClick={() => save(data)} disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </button>
          {msg && <span className={msg.type === 'ok' ? 'adm-success' : 'adm-error'}>{msg.text}</span>}
        </div>
      </div>
    </>
  )
}

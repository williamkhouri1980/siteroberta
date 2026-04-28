'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { useContent } from '../useContent'

const initial = {
  eyebrow:       '',
  h1:            '',
  corpo:         '',
  ctaPrimario:   '',
  ctaSecundario: '',
  fotoUrl:       '',
}

export default function HeroPage() {
  const { data, setData, loading, saving, msg, save } = useContent('hero', initial)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadMsg(null)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const json = await res.json()

    setUploading(false)

    if (res.ok) {
      setData({ ...data, fotoUrl: json.url })
      setUploadMsg({ type: 'ok', text: 'Foto enviada! Clique em Salvar para confirmar.' })
    } else {
      setUploadMsg({ type: 'err', text: json.error ?? 'Erro no upload' })
    }

    setTimeout(() => setUploadMsg(null), 4000)
  }

  return (
    <>
      <h1 className="adm-page-title">Hero — Seção Principal</h1>
      <p className="adm-page-desc">Primeiro bloco visível da página. O H1 é crítico para SEO.</p>

      <div className="adm-card">
        <div className="adm-card-title">Foto da Dra. Roberta</div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flexShrink: 0 }}>
            {data.fotoUrl ? (
              <img
                src={data.fotoUrl}
                alt="Foto atual"
                style={{ width: 120, height: 160, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--adm-border)' }}
              />
            ) : (
              <div style={{ width: 120, height: 160, background: 'var(--adm-bg)', border: '1px dashed var(--adm-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-muted)', fontSize: '0.75rem', textAlign: 'center', padding: '0.5rem' }}>
                Foto atual<br />(padrão do site)
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--adm-muted)', fontSize: '0.82rem', margin: '0 0 0.75rem' }}>
              Formatos: JPG, PNG, WebP. Recomendado: proporção retrato (2:3), mínimo 800px de largura.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            <button
              className="adm-btn-secondary"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Enviando…' : 'Escolher nova foto'}
            </button>
            {uploadMsg && (
              <p className={uploadMsg.type === 'ok' ? 'adm-success' : 'adm-error'} style={{ marginTop: '0.5rem' }}>
                {uploadMsg.text}
              </p>
            )}
            {data.fotoUrl && (
              <button
                className="adm-btn-danger"
                style={{ marginTop: '0.5rem', display: 'block' }}
                onClick={() => setData({ ...data, fotoUrl: '' })}
              >
                Remover foto (volta ao padrão)
              </button>
            )}
          </div>
        </div>
      </div>

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

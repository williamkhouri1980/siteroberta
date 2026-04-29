'use client'
import { useRef, useState } from 'react'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = {
  eyebrow: '', h1: '', corpo: '', ctaPrimario: '', ctaSecundario: '', fotoUrl: '',
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB   = 8
const MIN_WIDTH_PX  = 600

function getImageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload  = () => { URL.revokeObjectURL(url); resolve({ w: img.naturalWidth, h: img.naturalHeight }) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não foi possível ler as dimensões')) }
    img.src = url
  })
}

export default function HeroPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('hero', initial)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState<{ type: 'ok' | 'err' | 'warn'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadMsg({ type: 'err', text: 'Formato inválido. Use JPG, PNG ou WebP.' })
      return
    }

    // Tamanho
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadMsg({ type: 'err', text: `Arquivo muito grande. Máximo ${MAX_SIZE_MB}MB.` })
      return
    }

    // Dimensões e proporção
    try {
      const { w, h } = await getImageDimensions(file)
      if (w < MIN_WIDTH_PX) {
        setUploadMsg({ type: 'err', text: `Imagem muito pequena (${w}px de largura). Mínimo ${MIN_WIDTH_PX}px.` })
        return
      }
      if (w >= h) {
        setUploadMsg({ type: 'err', text: `Use uma foto no formato retrato (vertical). A imagem enviada é ${w}×${h}px — mais larga do que alta.` })
        return
      }
      const ratio = h / w
      if (ratio < 1.2) {
        setUploadMsg({ type: 'warn', text: `Foto quase quadrada (${w}×${h}px). O ideal é proporção 2:3 ou mais alta. O resultado pode não ficar perfeito.` })
        // avisa mas não bloqueia
      }
    } catch {
      // se não conseguir ler, deixa o servidor decidir
    }

    setUploading(true)
    if (!uploadMsg || uploadMsg.type !== 'warn') setUploadMsg(null)
    const form = new FormData()
    form.append('file', file)
    const res  = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const json = await res.json()
    setUploading(false)
    if (res.ok) {
      setData({ ...data, fotoUrl: json.url })
      setUploadMsg({ type: 'ok', text: 'Foto enviada! Salve o rascunho para confirmar.' })
    } else {
      setUploadMsg({ type: 'err', text: json.error ?? 'Erro no upload' })
    }
    setTimeout(() => setUploadMsg(null), 5000)
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Hero — Seção Principal</h1>
        <p className="adm-page-desc">Primeiro bloco visível. O H1 é o texto mais importante para SEO.</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Foto da Dra. Roberta</div>
        <div className="adm-upload-area">
          {data.fotoUrl ? (
            <img src={data.fotoUrl} alt="Foto atual" className="adm-upload-preview" style={{ width: 100, height: 136 }} />
          ) : (
            <div className="adm-upload-preview" style={{ width: 100, height: 136 }}>
              <span style={{ fontSize: '0.7rem' }}>Foto padrão do site</span>
            </div>
          )}
          <div className="adm-upload-controls">
            <p className="adm-upload-hint">JPG, PNG ou WebP. Proporção retrato (2:3). Mínimo 800px de largura.</p>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleUpload} />
            <button className="adm-btn-secondary" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: 'fit-content' }}>
              {uploading ? 'Enviando…' : 'Escolher nova foto'}
            </button>
            {uploadMsg && (
              <p className={
                uploadMsg.type === 'ok'   ? 'adm-success' :
                uploadMsg.type === 'warn' ? 'adm-warn'    : 'adm-error'
              }>{uploadMsg.text}</p>
            )}
            {data.fotoUrl && (
              <button className="adm-btn-danger" onClick={() => setData({ ...data, fotoUrl: '' })} style={{ width: 'fit-content', fontSize: '0.78rem' }}>
                Remover — usar foto padrão
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Textos</div>
        <div className="adm-field">
          <label className="adm-label">Eyebrow</label>
          <span className="adm-hint">Texto pequeno acima do título principal</span>
          <input className="adm-input" value={data.eyebrow} onChange={e => setData({ ...data, eyebrow: e.target.value })} placeholder="Pneumologia · São Paulo · Telemedicina Global" />
        </div>
        <div className="adm-field">
          <label className="adm-label">Título H1 — crítico para SEO</label>
          <span className="adm-hint">Inclua "pneumologista" e "São Paulo" para máximo ranqueamento</span>
          <textarea className="adm-textarea" value={data.h1} onChange={e => setData({ ...data, h1: e.target.value })} style={{ minHeight: '70px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Parágrafo de apoio</label>
          <textarea className="adm-textarea" value={data.corpo} onChange={e => setData({ ...data, corpo: e.target.value })} />
        </div>
        <div className="adm-grid-2">
          <div className="adm-field">
            <label className="adm-label">Botão WhatsApp (CTA primário)</label>
            <input className="adm-input" value={data.ctaPrimario} onChange={e => setData({ ...data, ctaPrimario: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Botão secundário</label>
            <input className="adm-input" value={data.ctaSecundario} onChange={e => setData({ ...data, ctaSecundario: e.target.value })} />
          </div>
        </div>
      </div>

      <ActionBar contentKey="hero" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

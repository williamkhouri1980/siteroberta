'use client'
import { useRef, useState } from 'react'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = {
  eyebrow: '', h1: '', corpo: '', ctaPrimario: '', ctaSecundario: '',
  fotoDesktopUrl: '', fotoMobileUrl: '',
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB   = 12

function getImageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload  = () => { URL.revokeObjectURL(url); resolve({ w: img.naturalWidth, h: img.naturalHeight }) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não foi possível ler as dimensões')) }
    img.src = url
  })
}

type UploadMsg = { type: 'ok' | 'err' | 'warn'; text: string } | null

export default function HeroPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('hero', initial)
  const [uploadingDesktop, setUploadingDesktop] = useState(false)
  const [uploadingMobile,  setUploadingMobile]  = useState(false)
  const [msgDesktop, setMsgDesktop] = useState<UploadMsg>(null)
  const [msgMobile,  setMsgMobile]  = useState<UploadMsg>(null)
  const fileDesktopRef = useRef<HTMLInputElement>(null)
  const fileMobileRef  = useRef<HTMLInputElement>(null)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    variant: 'desktop' | 'mobile',
  ) {
    const file = e.target.files?.[0]
    if (!file) return
    const setMsg      = variant === 'desktop' ? setMsgDesktop : setMsgMobile
    const setUploading = variant === 'desktop' ? setUploadingDesktop : setUploadingMobile

    if (!ALLOWED_TYPES.includes(file.type)) {
      setMsg({ type: 'err', text: 'Formato inválido. Use JPG, PNG ou WebP.' }); return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setMsg({ type: 'err', text: `Arquivo muito grande. Máximo ${MAX_SIZE_MB}MB.` }); return
    }

    try {
      const { w, h } = await getImageDimensions(file)
      if (variant === 'desktop') {
        if (w < 1200) {
          setMsg({ type: 'err', text: `Imagem muito pequena (${w}px). Desktop precisa de pelo menos 1200px de largura.` }); return
        }
        if (h >= w) {
          setMsg({ type: 'err', text: `A foto Desktop deve ser paisagem (horizontal). Enviada: ${w}×${h}px.` }); return
        }
      } else {
        if (w < 600) {
          setMsg({ type: 'err', text: `Imagem muito pequena (${w}px). Mobile precisa de pelo menos 600px de largura.` }); return
        }
        if (w >= h) {
          setMsg({ type: 'err', text: `A foto Mobile deve ser retrato (vertical). Enviada: ${w}×${h}px.` }); return
        }
        const ratio = h / w
        if (ratio < 1.2) {
          setMsg({ type: 'warn', text: `Foto quase quadrada (${w}×${h}px). O ideal é proporção 2:3 ou mais alta.` })
          // avisa mas não bloqueia
        }
      }
    } catch {
      // se não conseguir ler, deixa o servidor decidir
    }

    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res  = await fetch(`/api/admin/upload?variant=${variant}`, { method: 'POST', body: form })
    const json = await res.json()
    setUploading(false)

    if (res.ok) {
      if (variant === 'desktop') {
        setData({ ...data, fotoDesktopUrl: json.url })
        setMsgDesktop({ type: 'ok', text: 'Foto Desktop enviada! Salve o rascunho para confirmar.' })
      } else {
        setData({ ...data, fotoMobileUrl: json.url })
        setMsgMobile({ type: 'ok', text: 'Foto Mobile enviada! Salve o rascunho para confirmar.' })
      }
    } else {
      setMsg({ type: 'err', text: json.error ?? 'Erro no upload' })
    }
    setTimeout(() => { setMsgDesktop(null); setMsgMobile(null) }, 5000)
  }

  function MsgBadge({ msg }: { msg: UploadMsg }) {
    if (!msg) return null
    const cls = msg.type === 'ok' ? 'adm-success' : msg.type === 'warn' ? 'adm-warn' : 'adm-error'
    return <p className={cls}>{msg.text}</p>
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Hero — Seção Principal</h1>
        <p className="adm-page-desc">Primeiro bloco visível. O H1 é o texto mais importante para SEO.</p>
      </div>

      {/* ── Foto Desktop ─────────────────────────────────────────────────── */}
      <div className="adm-card">
        <div className="adm-card-title">Foto Desktop — paisagem (≥1024px)</div>
        <div className="adm-upload-area">
          {data.fotoDesktopUrl ? (
            <img src={data.fotoDesktopUrl} alt="Foto Desktop atual" className="adm-upload-preview"
              style={{ width: 160, height: 107, objectFit: 'cover' }} />
          ) : (
            <div className="adm-upload-preview" style={{ width: 160, height: 107, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>Foto padrão<br />(paisagem)</span>
            </div>
          )}
          <div className="adm-upload-controls">
            <p className="adm-upload-hint">JPG, PNG ou WebP. <strong>Paisagem (horizontal)</strong>. Mínimo 1200px de largura. Ideal 2400×1600px.</p>
            <input ref={fileDesktopRef} type="file" accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }} onChange={e => handleUpload(e, 'desktop')} />
            <button className="adm-btn-secondary" onClick={() => fileDesktopRef.current?.click()}
              disabled={uploadingDesktop} style={{ width: 'fit-content' }}>
              {uploadingDesktop ? 'Enviando…' : 'Escolher foto Desktop'}
            </button>
            <MsgBadge msg={msgDesktop} />
            {data.fotoDesktopUrl && (
              <button className="adm-btn-danger"
                onClick={() => setData({ ...data, fotoDesktopUrl: '' })}
                style={{ width: 'fit-content', fontSize: '0.78rem' }}>
                Remover — usar foto padrão
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Foto Mobile ──────────────────────────────────────────────────── */}
      <div className="adm-card">
        <div className="adm-card-title">Foto Mobile — retrato (&lt;1024px)</div>
        <div className="adm-upload-area">
          {data.fotoMobileUrl ? (
            <img src={data.fotoMobileUrl} alt="Foto Mobile atual" className="adm-upload-preview"
              style={{ width: 80, height: 120, objectFit: 'cover' }} />
          ) : (
            <div className="adm-upload-preview" style={{ width: 80, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>Foto padrão<br />(retrato)</span>
            </div>
          )}
          <div className="adm-upload-controls">
            <p className="adm-upload-hint">JPG, PNG ou WebP. <strong>Retrato (vertical)</strong>. Mínimo 600px de largura. Ideal 1200×1800px.</p>
            <input ref={fileMobileRef} type="file" accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }} onChange={e => handleUpload(e, 'mobile')} />
            <button className="adm-btn-secondary" onClick={() => fileMobileRef.current?.click()}
              disabled={uploadingMobile} style={{ width: 'fit-content' }}>
              {uploadingMobile ? 'Enviando…' : 'Escolher foto Mobile'}
            </button>
            <MsgBadge msg={msgMobile} />
            {data.fotoMobileUrl && (
              <button className="adm-btn-danger"
                onClick={() => setData({ ...data, fotoMobileUrl: '' })}
                style={{ width: 'fit-content', fontSize: '0.78rem' }}>
                Remover — usar foto padrão
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Textos ───────────────────────────────────────────────────────── */}
      <div className="adm-card">
        <div className="adm-card-title">Textos</div>
        <div className="adm-field">
          <label className="adm-label">Eyebrow</label>
          <span className="adm-hint">Texto pequeno acima do título principal</span>
          <input className="adm-input" value={data.eyebrow}
            onChange={e => setData({ ...data, eyebrow: e.target.value })}
            placeholder="Pneumologia · São Paulo · Telemedicina Global" />
        </div>
        <div className="adm-field">
          <label className="adm-label">Título H1 — crítico para SEO</label>
          <span className="adm-hint">Inclua "pneumologista" e "São Paulo". Quebre em duas linhas com Enter para separar título e subtítulo.</span>
          <textarea className="adm-textarea" value={data.h1}
            onChange={e => setData({ ...data, h1: e.target.value })}
            style={{ minHeight: '70px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Parágrafo de apoio</label>
          <textarea className="adm-textarea" value={data.corpo}
            onChange={e => setData({ ...data, corpo: e.target.value })} />
        </div>
        <div className="adm-grid-2">
          <div className="adm-field">
            <label className="adm-label">Botão WhatsApp (CTA primário)</label>
            <input className="adm-input" value={data.ctaPrimario}
              onChange={e => setData({ ...data, ctaPrimario: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Botão secundário</label>
            <input className="adm-input" value={data.ctaSecundario}
              onChange={e => setData({ ...data, ctaSecundario: e.target.value })} />
          </div>
        </div>
      </div>

      <ActionBar contentKey="hero" status={status} errorMsg={errorMsg}
        onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

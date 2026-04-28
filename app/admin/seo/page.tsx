'use client'
import { useContent } from '../useContent'

const initial = {
  title:         '',
  description:   '',
  ogTitle:       '',
  ogDescription: '',
  keywords:      [] as string[],
}

export default function SeoPage() {
  const { data, setData, loading, saving, msg, save } = useContent('seo', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  const keywordsText = Array.isArray(data.keywords) ? data.keywords.join(', ') : ''

  function handleKeywords(val: string) {
    setData({ ...data, keywords: val.split(',').map(k => k.trim()).filter(Boolean) })
  }

  return (
    <>
      <h1 className="adm-page-title">SEO / GEO — Metadados</h1>
      <p className="adm-page-desc">Metadados que aparecem no Google, redes sociais e respostas de IA (ChatGPT, Gemini, Perplexity).</p>

      <div className="adm-card">
        <div className="adm-card-title">Metadados principais</div>
        <div className="adm-field">
          <label className="adm-label">Title tag (aparece na aba do navegador e no Google)</label>
          <input className="adm-input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} maxLength={70} />
          <small style={{ color: 'var(--adm-muted)', fontSize: '0.75rem' }}>{data.title?.length ?? 0}/70 caracteres</small>
        </div>
        <div className="adm-field">
          <label className="adm-label">Meta description (resumo no Google — máx. 160 caracteres)</label>
          <textarea className="adm-textarea" value={data.description} onChange={e => setData({ ...data, description: e.target.value })} maxLength={160} />
          <small style={{ color: 'var(--adm-muted)', fontSize: '0.75rem' }}>{data.description?.length ?? 0}/160 caracteres</small>
        </div>
        <div className="adm-field">
          <label className="adm-label">Keywords (separadas por vírgula)</label>
          <textarea className="adm-textarea" value={keywordsText} onChange={e => handleKeywords(e.target.value)} style={{ minHeight: '70px' }} />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Open Graph (compartilhamento em redes sociais)</div>
        <div className="adm-field">
          <label className="adm-label">OG Title</label>
          <input className="adm-input" value={data.ogTitle} onChange={e => setData({ ...data, ogTitle: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">OG Description</label>
          <textarea className="adm-textarea" value={data.ogDescription} onChange={e => setData({ ...data, ogDescription: e.target.value })} />
        </div>
      </div>

      <div className="adm-actions">
        <button className="adm-btn-primary" onClick={() => save(data)} disabled={saving}>
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
        {msg && <span className={msg.type === 'ok' ? 'adm-success' : 'adm-error'}>{msg.text}</span>}
      </div>
    </>
  )
}

'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = { title: '', description: '', ogTitle: '', ogDescription: '', keywords: [] as string[] }

export default function SeoPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('seo', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  const keywordsText = Array.isArray(data.keywords) ? data.keywords.join(', ') : ''
  const titleLen     = data.title?.length ?? 0
  const descLen      = data.description?.length ?? 0

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">SEO / GEO — Metadados</h1>
        <p className="adm-page-desc">Aparece no Google, redes sociais e nas respostas de IA (ChatGPT, Gemini, Perplexity).</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Metadados principais</div>
        <div className="adm-field">
          <label className="adm-label">Title tag</label>
          <span className="adm-hint">Aparece na aba do navegador e como título no Google. Ideal: 50–60 caracteres.</span>
          <input className="adm-input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} maxLength={70} />
          <span className={`adm-char-count ${titleLen > 60 ? 'warn' : ''}`}>{titleLen}/70</span>
        </div>
        <div className="adm-field">
          <label className="adm-label">Meta description</label>
          <span className="adm-hint">Resumo exibido nos resultados do Google. Ideal: 130–155 caracteres.</span>
          <textarea className="adm-textarea" value={data.description} onChange={e => setData({ ...data, description: e.target.value })} maxLength={160} />
          <span className={`adm-char-count ${descLen > 155 ? 'warn' : ''}`}>{descLen}/160</span>
        </div>
        <div className="adm-field">
          <label className="adm-label">Keywords</label>
          <span className="adm-hint">Separadas por vírgula. Ex: pneumologista São Paulo, tosse crônica</span>
          <textarea
            className="adm-textarea"
            value={keywordsText}
            onChange={e => setData({ ...data, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
            style={{ minHeight: '70px' }}
          />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Open Graph — compartilhamento em redes sociais</div>
        <div className="adm-field">
          <label className="adm-label">OG Title</label>
          <input className="adm-input" value={data.ogTitle} onChange={e => setData({ ...data, ogTitle: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">OG Description</label>
          <textarea className="adm-textarea" value={data.ogDescription} onChange={e => setData({ ...data, ogDescription: e.target.value })} />
        </div>
      </div>

      <ActionBar contentKey="seo" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

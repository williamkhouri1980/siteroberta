'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = { heading: '', subtitulo: '' }

export default function CtaPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('cta', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">CTA — Seção Agendar</h1>
        <p className="adm-page-desc">Bloco final de chamada para agendamento pelo WhatsApp.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Título</label>
          <textarea className="adm-textarea" value={data.heading} onChange={e => setData({ ...data, heading: e.target.value })} style={{ minHeight: '60px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Subtítulo</label>
          <textarea className="adm-textarea" value={data.subtitulo} onChange={e => setData({ ...data, subtitulo: e.target.value })} />
        </div>
      </div>

      <ActionBar contentKey="cta" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

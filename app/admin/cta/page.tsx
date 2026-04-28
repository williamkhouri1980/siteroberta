'use client'
import { useContent } from '../useContent'

const initial = { heading: '', subtitulo: '' }

export default function CtaPage() {
  const { data, setData, loading, saving, msg, save } = useContent('cta', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  return (
    <>
      <h1 className="adm-page-title">CTA — Seção Agendar</h1>
      <p className="adm-page-desc">Bloco final de chamada para agendamento.</p>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Título</label>
          <textarea className="adm-textarea" value={data.heading} onChange={e => setData({ ...data, heading: e.target.value })} style={{ minHeight: '60px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Subtítulo</label>
          <textarea className="adm-textarea" value={data.subtitulo} onChange={e => setData({ ...data, subtitulo: e.target.value })} />
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

'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

type Sinal = { titulo: string; desc: string }
const initial = { heading: '', lead: '', sinais: [] as Sinal[] }

export default function QuandoConsultarPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('quando_consultar', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  function updateSinal(i: number, field: keyof Sinal, val: string) {
    const sinais = [...data.sinais]
    sinais[i] = { ...sinais[i], [field]: val }
    setData({ ...data, sinais })
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Quando Consultar</h1>
        <p className="adm-page-desc">Sinais de alerta que indicam ao paciente quando buscar um pneumologista.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Título da seção</label>
          <input className="adm-input" value={data.heading} onChange={e => setData({ ...data, heading: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Parágrafo de introdução</label>
          <textarea className="adm-textarea" value={data.lead} onChange={e => setData({ ...data, lead: e.target.value })} />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Sinais de alerta ({data.sinais.length})</div>
        {data.sinais.map((s, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Sinal {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, sinais: data.sinais.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <div className="adm-field">
              <label className="adm-label">Título</label>
              <input className="adm-input" value={s.titulo} onChange={e => updateSinal(i, 'titulo', e.target.value)} />
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label">Descrição</label>
              <textarea className="adm-textarea" value={s.desc} onChange={e => updateSinal(i, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, sinais: [...data.sinais, { titulo: '', desc: '' }] })}>
          + Adicionar sinal de alerta
        </button>
      </div>

      <ActionBar contentKey="quando_consultar" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

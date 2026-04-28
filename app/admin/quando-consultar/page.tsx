'use client'
import { useContent } from '../useContent'

type Sinal = { titulo: string; desc: string }
const initial = { heading: '', lead: '', sinais: [] as Sinal[] }

export default function QuandoConsultarPage() {
  const { data, setData, loading, saving, msg, save } = useContent('quando_consultar', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  function updateSinal(i: number, field: keyof Sinal, val: string) {
    const sinais = [...data.sinais]
    sinais[i] = { ...sinais[i], [field]: val }
    setData({ ...data, sinais })
  }
  function addSinal() { setData({ ...data, sinais: [...data.sinais, { titulo: '', desc: '' }] }) }
  function removeSinal(i: number) { setData({ ...data, sinais: data.sinais.filter((_, idx) => idx !== i) }) }

  return (
    <>
      <h1 className="adm-page-title">Quando Consultar — Sinais de Alerta</h1>
      <p className="adm-page-desc">Seção que explica ao paciente quando procurar um pneumologista.</p>

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
        <div className="adm-card-title">Sinais de alerta</div>
        {data.sinais.map((s, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Sinal {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => removeSinal(i)}>Remover</button>
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
        <button className="adm-btn-add" onClick={addSinal}>+ Adicionar sinal</button>
      </div>

      <div className="adm-actions">
        <button className="adm-btn-primary" onClick={() => save(data)} disabled={saving}>
          {saving ? 'Salvando…' : 'Salvar tudo'}
        </button>
        {msg && <span className={msg.type === 'ok' ? 'adm-success' : 'adm-error'}>{msg.text}</span>}
      </div>
    </>
  )
}

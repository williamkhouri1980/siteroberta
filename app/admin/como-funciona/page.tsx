'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

type Passo = { titulo: string; desc: string }
const initial = { heading: '', lead: '', passos: [] as Passo[] }

export default function ComoFuncionaPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('como_funciona', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  function updatePasso(i: number, field: keyof Passo, val: string) {
    const passos = [...data.passos]
    passos[i] = { ...passos[i], [field]: val }
    setData({ ...data, passos })
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Como Funciona — Processo</h1>
        <p className="adm-page-desc">Passos que explicam ao paciente como funciona uma consulta.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Título</label>
          <input className="adm-input" value={data.heading} onChange={e => setData({ ...data, heading: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Introdução</label>
          <textarea className="adm-textarea" value={data.lead} onChange={e => setData({ ...data, lead: e.target.value })} />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Passos ({data.passos.length})</div>
        {data.passos.map((p, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Passo {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, passos: data.passos.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <div className="adm-field">
              <label className="adm-label">Título</label>
              <input className="adm-input" value={p.titulo} onChange={e => updatePasso(i, 'titulo', e.target.value)} />
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label">Descrição</label>
              <textarea className="adm-textarea" value={p.desc} onChange={e => updatePasso(i, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, passos: [...data.passos, { titulo: '', desc: '' }] })}>
          + Adicionar passo
        </button>
      </div>

      <ActionBar contentKey="como_funciona" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

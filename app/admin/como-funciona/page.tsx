'use client'
import { useContent } from '../useContent'

type Passo = { titulo: string; desc: string }
const initial = { heading: '', lead: '', passos: [] as Passo[] }

export default function ComoFuncionaPage() {
  const { data, setData, loading, saving, msg, save } = useContent('como_funciona', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  function updatePasso(i: number, field: keyof Passo, val: string) {
    const passos = [...data.passos]
    passos[i] = { ...passos[i], [field]: val }
    setData({ ...data, passos })
  }
  function addPasso() { setData({ ...data, passos: [...data.passos, { titulo: '', desc: '' }] }) }
  function removePasso(i: number) { setData({ ...data, passos: data.passos.filter((_, idx) => idx !== i) }) }

  return (
    <>
      <h1 className="adm-page-title">Como Funciona — Processo</h1>
      <p className="adm-page-desc">Passos que explicam como funciona uma consulta.</p>

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
        <div className="adm-card-title">Passos</div>
        {data.passos.map((p, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Passo {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => removePasso(i)}>Remover</button>
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
        <button className="adm-btn-add" onClick={addPasso}>+ Adicionar passo</button>
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

'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = { heading: '', paragrafos: [] as string[], credenciais: [] as string[], lattesUrl: '' }

export default function SobrePage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('sobre', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  function updateArr(field: 'paragrafos' | 'credenciais', i: number, val: string) {
    const arr = [...data[field]]; arr[i] = val; setData({ ...data, [field]: arr })
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Sobre — A Especialista</h1>
        <p className="adm-page-desc">Bio e credenciais exibidas na seção Sobre.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Título da seção</label>
          <textarea className="adm-textarea" value={data.heading} onChange={e => setData({ ...data, heading: e.target.value })} style={{ minHeight: '60px' }} />
        </div>
        <div className="adm-field">
          <label className="adm-label">URL Currículo Lattes</label>
          <input className="adm-input" value={data.lattesUrl} onChange={e => setData({ ...data, lattesUrl: e.target.value })} />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Parágrafos da bio ({data.paragrafos.length})</div>
        {data.paragrafos.map((p, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Parágrafo {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, paragrafos: data.paragrafos.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <textarea className="adm-textarea" value={p} onChange={e => updateArr('paragrafos', i, e.target.value)} style={{ marginBottom: 0 }} />
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, paragrafos: [...data.paragrafos, ''] })}>+ Adicionar parágrafo</button>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Credenciais ({data.credenciais.length})</div>
        {data.credenciais.map((c, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Credencial {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, credenciais: data.credenciais.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <input className="adm-input" value={c} onChange={e => updateArr('credenciais', i, e.target.value)} style={{ marginBottom: 0 }} />
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, credenciais: [...data.credenciais, ''] })}>+ Adicionar credencial</button>
      </div>

      <ActionBar contentKey="sobre" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

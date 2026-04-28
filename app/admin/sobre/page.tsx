'use client'
import { useContent } from '../useContent'

const initial = {
  heading:     '',
  paragrafos:  [] as string[],
  credenciais: [] as string[],
  lattesUrl:   '',
}

export default function SobrePage() {
  const { data, setData, loading, saving, msg, save } = useContent('sobre', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  function updateArr(field: 'paragrafos' | 'credenciais', i: number, val: string) {
    const arr = [...data[field]]
    arr[i] = val
    setData({ ...data, [field]: arr })
  }
  function addArr(field: 'paragrafos' | 'credenciais') { setData({ ...data, [field]: [...data[field], ''] }) }
  function removeArr(field: 'paragrafos' | 'credenciais', i: number) {
    setData({ ...data, [field]: data[field].filter((_, idx) => idx !== i) })
  }

  return (
    <>
      <h1 className="adm-page-title">Sobre — A Especialista</h1>
      <p className="adm-page-desc">Bio e credenciais exibidas na seção Sobre.</p>

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
        <div className="adm-card-title">Parágrafos da bio</div>
        {data.paragrafos.map((p, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Parágrafo {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => removeArr('paragrafos', i)}>Remover</button>
            </div>
            <textarea className="adm-textarea" value={p} onChange={e => updateArr('paragrafos', i, e.target.value)} style={{ marginBottom: 0 }} />
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => addArr('paragrafos')}>+ Adicionar parágrafo</button>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Credenciais</div>
        {data.credenciais.map((c, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Credencial {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => removeArr('credenciais', i)}>Remover</button>
            </div>
            <input className="adm-input" value={c} onChange={e => updateArr('credenciais', i, e.target.value)} style={{ marginBottom: 0 }} />
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => addArr('credenciais')}>+ Adicionar credencial</button>
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

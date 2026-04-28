'use client'
import { useContent } from '../useContent'

type Stat  = { num: string; label: string }
type Dif   = { titulo: string; desc: string }
const initial = { stats: [] as Stat[], diferenciais: [] as Dif[] }

export default function ReconhecimentoPage() {
  const { data, setData, loading, saving, msg, save } = useContent('reconhecimento', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  function updateStat(i: number, f: keyof Stat, v: string) {
    const s = [...data.stats]; s[i] = { ...s[i], [f]: v }; setData({ ...data, stats: s })
  }
  function updateDif(i: number, f: keyof Dif, v: string) {
    const d = [...data.diferenciais]; d[i] = { ...d[i], [f]: v }; setData({ ...data, diferenciais: d })
  }

  return (
    <>
      <h1 className="adm-page-title">Reconhecimento</h1>
      <p className="adm-page-desc">Stats numéricos e diferenciais da Dra. Roberta.</p>

      <div className="adm-card">
        <div className="adm-card-title">Stats (números de destaque)</div>
        {data.stats.map((s, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Stat {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
              <div className="adm-field">
                <label className="adm-label">Número / sigla</label>
                <input className="adm-input" value={s.num} onChange={e => updateStat(i, 'num', e.target.value)} placeholder="15+" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Label</label>
                <input className="adm-input" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, stats: [...data.stats, { num: '', label: '' }] })}>+ Adicionar stat</button>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Diferenciais</div>
        {data.diferenciais.map((d, i) => (
          <div key={i} className="adm-array-item">
            <div className="adm-array-item-header">
              <span className="adm-array-item-label">Diferencial {i + 1}</span>
              <button className="adm-btn-danger" onClick={() => setData({ ...data, diferenciais: data.diferenciais.filter((_, idx) => idx !== i) })}>Remover</button>
            </div>
            <div className="adm-field">
              <label className="adm-label">Título</label>
              <input className="adm-input" value={d.titulo} onChange={e => updateDif(i, 'titulo', e.target.value)} />
            </div>
            <div className="adm-field" style={{ marginBottom: 0 }}>
              <label className="adm-label">Descrição</label>
              <textarea className="adm-textarea" value={d.desc} onChange={e => updateDif(i, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
        <button className="adm-btn-add" onClick={() => setData({ ...data, diferenciais: [...data.diferenciais, { titulo: '', desc: '' }] })}>+ Adicionar diferencial</button>
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

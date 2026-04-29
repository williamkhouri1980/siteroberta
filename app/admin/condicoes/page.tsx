'use client'
import { useState, useEffect } from 'react'

type Condicao = { id?: string; num: string; nome: string; definicao: string; descricao: string; ordem: number }
const empty = (): Condicao => ({ num: '', nome: '', definicao: '', descricao: '', ordem: 0 })

export default function CondicoesPage() {
  const [items, setItems]     = useState<Condicao[]>([])
  const [editing, setEditing] = useState<Condicao | null>(null)
  const [saving, setSaving]   = useState(false)
  const [msg, setMsg]         = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text }); setTimeout(() => setMsg(null), 3000)
  }

  useEffect(() => {
    fetch('/api/admin/condicoes').then(r => r.json()).then(setItems)
  }, [])

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    const method = editing.id ? 'PUT' : 'POST'
    const url    = editing.id ? `/api/admin/condicoes/${editing.id}` : '/api/admin/condicoes'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false)
    if (res.ok) {
      flash('ok', 'Salvo!')
      setEditing(null)
      fetch('/api/admin/condicoes').then(r => r.json()).then(setItems)
    } else {
      const e = await res.json(); flash('err', e.error ?? 'Erro')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover esta condição?')) return
    const res = await fetch(`/api/admin/condicoes/${id}`, { method: 'DELETE' })
    if (res.ok) { flash('ok', 'Removido!'); setItems(items.filter(i => i.id !== id)) }
  }

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Condições Tratadas</h1>
        <p className="adm-page-desc">Gerenciar as condições exibidas na seção de condições do site.</p>
      </div>

      {msg && (
        <p className={msg.type === 'ok' ? 'adm-success' : 'adm-error'} style={{ marginBottom: '1rem' }}>{msg.text}</p>
      )}

      {!editing ? (
        <>
          <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="adm-table">
              <thead>
                <tr><th style={{ width: 50 }}>Nº</th><th>Nome</th><th>Definição</th><th style={{ width: 60 }}>Ordem</th><th style={{ width: 120 }}>Ações</th></tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--adm-accent)', fontWeight: 600 }}>{item.num}</td>
                    <td><strong>{item.nome}</strong></td>
                    <td style={{ color: 'var(--adm-muted)', fontSize: '0.8rem', maxWidth: 220 }}>{item.definicao}</td>
                    <td style={{ color: 'var(--adm-muted)' }}>{item.ordem}</td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }} onClick={() => setEditing(item)}>Editar</button>
                        <button className="adm-btn-danger" onClick={() => handleDelete(item.id!)}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--adm-muted)', padding: '2rem' }}>Nenhuma condição cadastrada</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <button className="adm-btn-primary" onClick={() => setEditing(empty())}>+ Nova condição</button>
        </>
      ) : (
        <div className="adm-card">
          <div className="adm-card-title">{editing.id ? 'Editar condição' : 'Nova condição'}</div>
          <div className="adm-grid-3">
            <div className="adm-field">
              <label className="adm-label">Número</label>
              <input className="adm-input" value={editing.num} onChange={e => setEditing({ ...editing, num: e.target.value })} placeholder="01" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Ordem</label>
              <input className="adm-input" type="number" value={editing.ordem} onChange={e => setEditing({ ...editing, ordem: Number(e.target.value) })} />
            </div>
            <div className="adm-field">
              <label className="adm-label">Nome</label>
              <input className="adm-input" value={editing.nome} onChange={e => setEditing({ ...editing, nome: e.target.value })} />
            </div>
          </div>
          <div className="adm-field">
            <label className="adm-label">Definição breve (1 linha)</label>
            <span className="adm-hint">Aparece em destaque abaixo do nome da condição</span>
            <input className="adm-input" value={editing.definicao} onChange={e => setEditing({ ...editing, definicao: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Descrição completa</label>
            <textarea className="adm-textarea" value={editing.descricao} onChange={e => setEditing({ ...editing, descricao: e.target.value })} style={{ minHeight: '120px' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button className="adm-btn-publish" onClick={handleSave} disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
            <button className="adm-btn-secondary" onClick={() => setEditing(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  )
}

'use client'
import { useState, useEffect } from 'react'

type Faq = { id?: string; pergunta: string; resposta: string; ordem: number }
const empty = (): Faq => ({ pergunta: '', resposta: '', ordem: 0 })

export default function FaqPage() {
  const [items, setItems]     = useState<Faq[]>([])
  const [editing, setEditing] = useState<Faq | null>(null)
  const [saving, setSaving]   = useState(false)
  const [msg, setMsg]         = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 3000)
  }

  useEffect(() => {
    fetch('/api/admin/faqs').then(r => r.json()).then(setItems)
  }, [])

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    const method = editing.id ? 'PUT' : 'POST'
    const url    = editing.id ? `/api/admin/faqs/${editing.id}` : '/api/admin/faqs'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setSaving(false)
    if (res.ok) {
      flash('ok', 'Salvo!')
      setEditing(null)
      fetch('/api/admin/faqs').then(r => r.json()).then(setItems)
    } else {
      const e = await res.json()
      flash('err', e.error ?? 'Erro')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover esta pergunta?')) return
    const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
    if (res.ok) {
      flash('ok', 'Removido!')
      setItems(items.filter(i => i.id !== id))
    }
  }

  return (
    <>
      <h1 className="adm-page-title">FAQ — Perguntas Frequentes</h1>
      <p className="adm-page-desc">Conteúdo crítico para SEO e GEO. Respostas completas indexadas pelo Google e por IAs.</p>

      {msg && <p className={msg.type === 'ok' ? 'adm-success' : 'adm-error'} style={{ marginBottom: '1rem' }}>{msg.text}</p>}

      {!editing ? (
        <>
          <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="adm-table">
              <thead>
                <tr><th>Ordem</th><th>Pergunta</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.ordem}</td>
                    <td>{item.pergunta}</td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }} onClick={() => setEditing(item)}>Editar</button>
                        <button className="adm-btn-danger" onClick={() => handleDelete(item.id!)}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="adm-btn-primary" onClick={() => setEditing(empty())}>+ Nova pergunta</button>
        </>
      ) : (
        <div className="adm-card">
          <div className="adm-card-title">{editing.id ? 'Editar pergunta' : 'Nova pergunta'}</div>
          <div className="adm-field">
            <label className="adm-label">Ordem</label>
            <input className="adm-input" type="number" value={editing.ordem} style={{ maxWidth: '100px' }} onChange={e => setEditing({ ...editing, ordem: Number(e.target.value) })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Pergunta</label>
            <input className="adm-input" value={editing.pergunta} onChange={e => setEditing({ ...editing, pergunta: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Resposta completa (importante para SEO e IA)</label>
            <textarea className="adm-textarea" value={editing.resposta} onChange={e => setEditing({ ...editing, resposta: e.target.value })} style={{ minHeight: '160px' }} />
          </div>
          <div className="adm-actions">
            <button className="adm-btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
            <button className="adm-btn-secondary" onClick={() => setEditing(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  )
}

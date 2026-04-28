'use client'
import { useContent } from '../useContent'

const initial = {
  whatsapp:  '',
  email:     '',
  crm:       '',
  siteUrl:   '',
  lattesUrl: '',
}

export default function ConfigPage() {
  const { data, setData, loading, saving, msg, save } = useContent('config', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  return (
    <>
      <h1 className="adm-page-title">Contato & Configuração</h1>
      <p className="adm-page-desc">Informações de contato usadas em todo o site e no JSON-LD.</p>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">WhatsApp (apenas dígitos, com DDI)</label>
          <input className="adm-input" value={data.whatsapp} onChange={e => setData({ ...data, whatsapp: e.target.value })} placeholder="5511998833215" />
        </div>
        <div className="adm-field">
          <label className="adm-label">E-mail</label>
          <input className="adm-input" type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">CRM</label>
          <input className="adm-input" value={data.crm} onChange={e => setData({ ...data, crm: e.target.value })} placeholder="CRM-SP 000000 / RQE 00000" />
        </div>
        <div className="adm-field">
          <label className="adm-label">URL do site</label>
          <input className="adm-input" value={data.siteUrl} onChange={e => setData({ ...data, siteUrl: e.target.value })} placeholder="https://www.robertaramos.med.br" />
        </div>
        <div className="adm-field">
          <label className="adm-label">Currículo Lattes (URL)</label>
          <input className="adm-input" value={data.lattesUrl} onChange={e => setData({ ...data, lattesUrl: e.target.value })} />
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

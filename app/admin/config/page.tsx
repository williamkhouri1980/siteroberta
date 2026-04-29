'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = { whatsapp: '', email: '', crm: '', siteUrl: '', lattesUrl: '' }

export default function ConfigPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('config', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Contato & Configuração</h1>
        <p className="adm-page-desc">Informações de contato usadas em todo o site e no JSON-LD de SEO.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">WhatsApp</label>
          <span className="adm-hint">Apenas dígitos com DDI. Ex: 5511998833215</span>
          <input className="adm-input" value={data.whatsapp} onChange={e => setData({ ...data, whatsapp: e.target.value })} placeholder="5511998833215" />
        </div>
        <div className="adm-field">
          <label className="adm-label">E-mail de contato</label>
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
      </div>

      <ActionBar contentKey="config" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

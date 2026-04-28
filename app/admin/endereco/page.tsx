'use client'
import { useContent } from '../useContent'

const initial = {
  rua:          '',
  bairro:       '',
  cidade:       'São Paulo',
  estado:       'SP',
  cep:          '',
  horarios:     '',
  mapsEmbedUrl: '',
}

export default function EnderecoPage() {
  const { data, setData, loading, saving, msg, save } = useContent('endereco', initial)

  if (loading) return <p className="adm-page-desc">Carregando…</p>

  return (
    <>
      <h1 className="adm-page-title">Endereço do Consultório</h1>
      <p className="adm-page-desc">Informações de localização exibidas na seção Localização e no JSON-LD.</p>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Rua e número</label>
          <input className="adm-input" value={data.rua} onChange={e => setData({ ...data, rua: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Bairro</label>
          <input className="adm-input" value={data.bairro} onChange={e => setData({ ...data, bairro: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
          <div className="adm-field">
            <label className="adm-label">Cidade</label>
            <input className="adm-input" value={data.cidade} onChange={e => setData({ ...data, cidade: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Estado</label>
            <input className="adm-input" value={data.estado} style={{ width: '80px' }} onChange={e => setData({ ...data, estado: e.target.value })} />
          </div>
        </div>
        <div className="adm-field">
          <label className="adm-label">CEP</label>
          <input className="adm-input" value={data.cep} style={{ maxWidth: '160px' }} onChange={e => setData({ ...data, cep: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Horário de funcionamento</label>
          <input className="adm-input" value={data.horarios} onChange={e => setData({ ...data, horarios: e.target.value })} placeholder="Segunda a Sexta, 08h às 18h" />
        </div>
        <div className="adm-field">
          <label className="adm-label">URL do embed do Google Maps</label>
          <p style={{ fontSize: '0.75rem', color: 'var(--adm-muted)', margin: '0 0 0.4rem' }}>
            Google Maps → Compartilhar → Incorporar um mapa → copiar a URL do src do iframe
          </p>
          <textarea className="adm-textarea" value={data.mapsEmbedUrl} onChange={e => setData({ ...data, mapsEmbedUrl: e.target.value })} style={{ minHeight: '70px' }} />
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

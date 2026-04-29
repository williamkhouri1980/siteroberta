'use client'
import { useContent } from '../useContent'
import ActionBar from '../ActionBar'

const initial = { rua: '', bairro: '', cidade: 'São Paulo', estado: 'SP', cep: '', horarios: '', mapsEmbedUrl: '' }

export default function EnderecoPage() {
  const { data, setData, loading, status, errorMsg, saveDraft, publish } = useContent('endereco', initial)

  if (loading) return <p className="adm-page-desc" style={{ padding: '2rem' }}>Carregando…</p>

  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Endereço do Consultório</h1>
        <p className="adm-page-desc">Exibido na seção Localização e no JSON-LD de SEO local.</p>
      </div>

      <div className="adm-card">
        <div className="adm-field">
          <label className="adm-label">Rua e número</label>
          <input className="adm-input" value={data.rua} onChange={e => setData({ ...data, rua: e.target.value })} />
        </div>
        <div className="adm-field">
          <label className="adm-label">Bairro</label>
          <input className="adm-input" value={data.bairro} onChange={e => setData({ ...data, bairro: e.target.value })} />
        </div>
        <div className="adm-grid-3">
          <div className="adm-field">
            <label className="adm-label">Cidade</label>
            <input className="adm-input" value={data.cidade} onChange={e => setData({ ...data, cidade: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Estado</label>
            <input className="adm-input" value={data.estado} onChange={e => setData({ ...data, estado: e.target.value })} />
          </div>
          <div className="adm-field">
            <label className="adm-label">CEP</label>
            <input className="adm-input" value={data.cep} onChange={e => setData({ ...data, cep: e.target.value })} />
          </div>
        </div>
        <div className="adm-field">
          <label className="adm-label">Horário de funcionamento</label>
          <input className="adm-input" value={data.horarios} onChange={e => setData({ ...data, horarios: e.target.value })} placeholder="Segunda a Sexta, 08h às 18h" />
        </div>
        <div className="adm-field">
          <label className="adm-label">URL do embed do Google Maps</label>
          <span className="adm-hint">Google Maps → Compartilhar → Incorporar um mapa → copiar a URL do src do iframe</span>
          <textarea className="adm-textarea" value={data.mapsEmbedUrl} onChange={e => setData({ ...data, mapsEmbedUrl: e.target.value })} style={{ minHeight: '70px', fontFamily: 'monospace', fontSize: '0.78rem' }} />
        </div>
      </div>

      <ActionBar contentKey="endereco" status={status} errorMsg={errorMsg} onDraft={() => saveDraft(data)} onPublish={() => publish(data)} />
    </>
  )
}

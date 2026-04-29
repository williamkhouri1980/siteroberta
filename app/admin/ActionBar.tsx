'use client'
import type { SaveStatus } from './useContent'

type Props = {
  contentKey: string
  status:     SaveStatus
  errorMsg:   string
  onDraft:    () => void
  onPublish:  () => void
}

const statusMap: Record<SaveStatus, { label: string; cls: string }> = {
  idle:          { label: '',                      cls: '' },
  'saving-draft': { label: 'Salvando rascunho…',  cls: '' },
  publishing:    { label: 'Publicando…',           cls: '' },
  'saved-draft': { label: '✓ Rascunho salvo',      cls: 'draft' },
  published:     { label: '✓ Publicado no ar!',    cls: 'published' },
  error:         { label: '✗ Erro',                cls: 'error' },
}

export default function ActionBar({ contentKey, status, errorMsg, onDraft, onPublish }: Props) {
  const busy = status === 'saving-draft' || status === 'publishing'
  const { label, cls } = statusMap[status]

  return (
    <div className="adm-action-bar">
      <button
        className="adm-btn-secondary"
        onClick={onDraft}
        disabled={busy}
        title="Salva sem publicar — você ainda pode revisar antes"
      >
        {status === 'saving-draft' ? 'Salvando…' : 'Salvar rascunho'}
      </button>

      <a
        className="adm-btn-preview"
        href={`/api/preview?redirect=/`}
        target="_blank"
        rel="noopener noreferrer"
        title="Abre o site em modo preview com o rascunho atual"
      >
        <span>◎</span> Preview
      </a>

      <button
        className="adm-btn-publish"
        onClick={onPublish}
        disabled={busy}
        title="Publica imediatamente no site ao vivo"
      >
        {status === 'publishing' ? 'Publicando…' : '↑ Publicar'}
      </button>

      {label && (
        <span className={`adm-status-badge ${cls}`}>
          {status === 'error' ? errorMsg || label : label}
        </span>
      )}
    </div>
  )
}

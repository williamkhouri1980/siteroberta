import { draftMode } from 'next/headers'

export default async function PreviewBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <div style={{
      position:       'fixed',
      bottom:         0,
      left:           0,
      right:          0,
      zIndex:         9999,
      background:     '#f59e0b',
      color:          '#1c1208',
      padding:        '0.65rem 1.5rem',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      fontFamily:     'DM Sans, sans-serif',
      fontSize:       '0.875rem',
      fontWeight:     500,
      boxShadow:      '0 -2px 12px rgba(0,0,0,0.15)',
    }}>
      <span>⚠ Modo Preview — você está vendo um rascunho não publicado</span>
      <a
        href="/api/preview?action=disable"
        style={{
          background:    '#1c1208',
          color:         '#f59e0b',
          padding:       '0.35rem 0.9rem',
          borderRadius:  '6px',
          textDecoration: 'none',
          fontSize:      '0.8rem',
          fontWeight:    600,
        }}
      >
        Sair do preview
      </a>
    </div>
  )
}

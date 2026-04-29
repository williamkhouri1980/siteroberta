import Link from 'next/link'

const sections = [
  { href: '/admin/hero',             icon: '★', title: 'Hero',              desc: 'Título principal, foto, CTAs' },
  { href: '/admin/quando-consultar', icon: '◉', title: 'Quando Consultar',  desc: 'Sinais de alerta — 6 cards' },
  { href: '/admin/sobre',            icon: '◎', title: 'Sobre',             desc: 'Bio, parágrafos, credenciais' },
  { href: '/admin/condicoes',        icon: '◈', title: 'Condições',         desc: 'Tosse, dispneia, asma, DPOC…' },
  { href: '/admin/como-funciona',    icon: '◇', title: 'Como Funciona',     desc: 'Passos da consulta' },
  { href: '/admin/reconhecimento',   icon: '◆', title: 'Reconhecimento',    desc: 'Stats e diferenciais' },
  { href: '/admin/faq',              icon: '?', title: 'FAQ',               desc: 'Perguntas e respostas (SEO/GEO)' },
  { href: '/admin/cta',              icon: '▷', title: 'CTA — Agendar',     desc: 'Seção final de agendamento' },
  { href: '/admin/config',           icon: '⚙', title: 'Contato & Config',  desc: 'WhatsApp, e-mail, CRM' },
  { href: '/admin/endereco',         icon: '◌', title: 'Endereço',          desc: 'Consultório e Google Maps' },
  { href: '/admin/seo',              icon: '◑', title: 'SEO / GEO',         desc: 'Title, description, keywords, OG' },
]

export default function AdminDashboard() {
  return (
    <>
      <div className="adm-page-header">
        <h1 className="adm-page-title">Painel Administrativo</h1>
        <p className="adm-page-desc">Selecione uma seção para editar o conteúdo do site.</p>
      </div>

      <div style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--adm-text-2)', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--adm-text)' }}>Como funciona o preview:</strong>{' '}
        Edite qualquer seção → clique em <strong>Salvar rascunho</strong> → clique em <strong>Preview</strong> para ver as mudanças sem afetar o site ao vivo → quando estiver satisfeita, clique em <strong>Publicar</strong>.
      </div>

      <div className="adm-dashboard">
        {sections.map(s => (
          <Link key={s.href} href={s.href} className="adm-dash-card">
            <span className="adm-dash-card-icon">{s.icon}</span>
            <div className="adm-dash-card-title">{s.title}</div>
            <div className="adm-dash-card-desc">{s.desc}</div>
          </Link>
        ))}
      </div>
    </>
  )
}

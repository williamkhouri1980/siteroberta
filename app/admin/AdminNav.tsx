'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
  {
    label: 'Principal',
    items: [
      { href: '/admin',                  label: 'Visão Geral',      icon: '◫' },
    ]
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/admin/hero',             label: 'Hero',             icon: '★' },
      { href: '/admin/quando-consultar', label: 'Quando Consultar', icon: '◉' },
      { href: '/admin/sobre',            label: 'Sobre',            icon: '◎' },
      { href: '/admin/condicoes',        label: 'Condições',        icon: '◈' },
      { href: '/admin/como-funciona',    label: 'Como Funciona',    icon: '◇' },
      { href: '/admin/reconhecimento',   label: 'Reconhecimento',   icon: '◆' },
      { href: '/admin/faq',              label: 'FAQ',              icon: '?' },
      { href: '/admin/cta',              label: 'CTA — Agendar',    icon: '▷' },
    ]
  },
  {
    label: 'Configurações',
    items: [
      { href: '/admin/config',           label: 'Contato & Config', icon: '⚙' },
      { href: '/admin/endereco',         label: 'Endereço',         icon: '◌' },
      { href: '/admin/seo',              label: 'SEO / GEO',        icon: '◑' },
    ]
  },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router   = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar-brand">
        <div className="adm-sidebar-brand-inner">
          <div className="adm-sidebar-logo">RPR</div>
          <div className="adm-sidebar-brand-text">
            <strong>Admin</strong>
            <span>Dra. Roberta Ramos</span>
          </div>
        </div>
      </div>

      <nav className="adm-nav">
        {sections.map(section => (
          <div key={section.label}>
            <div className="adm-nav-section">{section.label}</div>
            {section.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`adm-nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="adm-sidebar-footer">
        <a
          className="adm-btn-view-site"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>↗</span>
          <span>Ver site ao vivo</span>
        </a>
        <button className="adm-btn-logout" onClick={logout}>
          <span>←</span>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}

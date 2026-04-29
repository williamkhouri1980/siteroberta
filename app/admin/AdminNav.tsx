'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
  {
    label: 'Conteúdo',
    items: [
      { href: '/admin',                  label: 'Visão Geral',      icon: '◫' },
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
  const pathname     = usePathname()
  const router       = useRouter()
  const [open, setOpen] = useState(false)

  const currentLabel = sections
    .flatMap(s => s.items)
    .find(i => i.href === pathname)?.label ?? 'Admin'

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <>
      {/* ── Topbar (mobile + desktop) ── */}
      <header className="adm-topbar">
        <div className="adm-topbar-brand">
          <div className="adm-sidebar-logo">RPR</div>
          <span className="adm-topbar-title">{currentLabel}</span>
        </div>
        <div className="adm-topbar-actions">
          <a className="adm-topbar-btn" href="/" target="_blank" rel="noopener noreferrer" title="Ver site">
            ↗
          </a>
          <button
            className={`adm-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Drawer overlay ── */}
      {open && <div className="adm-overlay" onClick={() => setOpen(false)} />}

      {/* ── Drawer ── */}
      <nav className={`adm-drawer ${open ? 'open' : ''}`}>
        <div className="adm-drawer-inner">
          {sections.map(section => (
            <div key={section.label} className="adm-drawer-section">
              <div className="adm-nav-section">{section.label}</div>
              {section.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`adm-nav-item ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="adm-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="adm-drawer-footer">
            <a className="adm-btn-view-site" href="/" target="_blank" rel="noopener noreferrer">
              <span>↗</span><span>Ver site ao vivo</span>
            </a>
            <button className="adm-btn-logout" onClick={logout}>
              <span>←</span><span>Sair</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Sidebar (desktop apenas) ── */}
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
        <div className="adm-nav">
          {sections.map(section => (
            <div key={section.label}>
              <div className="adm-nav-section">{section.label}</div>
              {section.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`adm-nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  <span className="adm-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="adm-sidebar-footer">
          <a className="adm-btn-view-site" href="/" target="_blank" rel="noopener noreferrer">
            <span>↗</span><span>Ver site ao vivo</span>
          </a>
          <button className="adm-btn-logout" onClick={logout}>
            <span>←</span><span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  )
}

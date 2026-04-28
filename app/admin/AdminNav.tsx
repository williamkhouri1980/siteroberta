'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
  { href: '/admin',                label: 'Visão Geral' },
  { href: '/admin/config',         label: 'Contato & Config' },
  { href: '/admin/endereco',       label: 'Endereço' },
  { href: '/admin/seo',            label: 'SEO / GEO' },
  { href: '/admin/hero',           label: 'Hero' },
  { href: '/admin/quando-consultar', label: 'Quando Consultar' },
  { href: '/admin/sobre',          label: 'Sobre' },
  { href: '/admin/condicoes',      label: 'Condições' },
  { href: '/admin/como-funciona',  label: 'Como Funciona' },
  { href: '/admin/reconhecimento', label: 'Reconhecimento' },
  { href: '/admin/faq',            label: 'FAQ' },
  { href: '/admin/cta',            label: 'CTA — Agendar' },
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
        <span>RPR</span>
        <small>Admin</small>
      </div>
      <nav className="adm-nav">
        {sections.map(s => (
          <Link
            key={s.href}
            href={s.href}
            className={`adm-nav-item ${pathname === s.href ? 'active' : ''}`}
          >
            {s.label}
          </Link>
        ))}
      </nav>
      <button className="adm-logout" onClick={logout}>Sair</button>
      <a
        className="adm-view-site"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver site ↗
      </a>
    </aside>
  )
}

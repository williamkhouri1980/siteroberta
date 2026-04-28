import Link from 'next/link'

const sections = [
  { href: '/admin/config',           title: 'Contato & Config',  desc: 'WhatsApp, e-mail, CRM' },
  { href: '/admin/endereco',         title: 'Endereço',          desc: 'Consultório e Google Maps' },
  { href: '/admin/seo',              title: 'SEO / GEO',         desc: 'Title, description, keywords, Open Graph' },
  { href: '/admin/hero',             title: 'Hero',              desc: 'Título principal, subtítulo, CTAs' },
  { href: '/admin/quando-consultar', title: 'Quando Consultar',  desc: 'Sinais de alerta — 6 cards' },
  { href: '/admin/sobre',            title: 'Sobre',             desc: 'Bio, credenciais, Lattes' },
  { href: '/admin/condicoes',        title: 'Condições',         desc: 'Tosse, dispneia, asma, DPOC…' },
  { href: '/admin/como-funciona',    title: 'Como Funciona',     desc: 'Passos da consulta' },
  { href: '/admin/reconhecimento',   title: 'Reconhecimento',    desc: 'Stats e diferenciais' },
  { href: '/admin/faq',              title: 'FAQ',               desc: 'Perguntas e respostas (SEO/GEO)' },
  { href: '/admin/cta',              title: 'CTA — Agendar',     desc: 'Seção final de agendamento' },
]

export default function AdminDashboard() {
  return (
    <>
      <h1 className="adm-page-title">Painel Administrativo</h1>
      <p className="adm-page-desc">Selecione uma seção para editar o conteúdo do site.</p>
      <div className="adm-dashboard">
        {sections.map(s => (
          <Link key={s.href} href={s.href} className="adm-dash-card">
            <div className="adm-dash-card-title">{s.title}</div>
            <div className="adm-dash-card-desc">{s.desc}</div>
          </Link>
        ))}
      </div>
    </>
  )
}

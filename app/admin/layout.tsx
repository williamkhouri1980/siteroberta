import type { Metadata } from 'next'
import { headers } from 'next/headers'
import AdminNav from './AdminNav'
import '../admin.css'

export const metadata: Metadata = {
  title: 'Admin — Dra. Roberta Pulcheri Ramos',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname    = headersList.get('x-pathname') ?? ''

  // Na página de login não exibe o painel (sem nav, sem sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <>
      <AdminNav />
      <div className="adm-shell">
        <main className="adm-main">{children}</main>
      </div>
    </>
  )
}

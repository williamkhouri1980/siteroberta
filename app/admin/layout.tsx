import type { Metadata } from 'next'
import AdminNav from './AdminNav'
import '../admin.css'

export const metadata: Metadata = {
  title: 'Admin — Dra. Roberta Pulcheri Ramos',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <div className="adm-shell">
        <main className="adm-main">{children}</main>
      </div>
    </>
  )
}

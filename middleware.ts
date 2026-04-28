import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Deixa a rota de login passar
  if (pathname === '/admin/login') return NextResponse.next()

  // Verifica cookie de sessão
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SESSION_SECRET

  if (!session || session !== secret) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

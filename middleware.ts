import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_READ_APIS = /^\/api\/admin\/(menu-items|page-images|site-images|gallery|events)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next()
  }

  // Allow public pages to read data (GET only) without admin session
  if (PUBLIC_READ_APIS.test(pathname) && request.method === 'GET') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const session = request.cookies.get('admin_session')
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!session || !adminPassword || session.value !== adminPassword) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

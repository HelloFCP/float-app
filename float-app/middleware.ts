import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/actions/auth'

export async function middleware(request: NextRequest) {
  const session = await getSession()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect authenticated routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}


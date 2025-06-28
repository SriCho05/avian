import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')?.value

  const isPilotRoute = pathname.startsWith('/dashboard')
  const isClientRoute = pathname.startsWith('/client/dashboard')

  const pilotLoginUrl = new URL('/login', request.url)
  const clientLoginUrl = new URL('/client/login', request.url)

  if (!sessionCookie) {
    if (isPilotRoute) return NextResponse.redirect(pilotLoginUrl)
    if (isClientRoute) return NextResponse.redirect(clientLoginUrl)
    return NextResponse.next()
  }

  try {
    const session = await decrypt(sessionCookie)
    if (!session?.user) {
        if (isPilotRoute) return NextResponse.redirect(pilotLoginUrl)
        if (isClientRoute) return NextResponse.redirect(clientLoginUrl)
        return NextResponse.next()
    }
    
    const { role } = session.user

    if (isPilotRoute && role !== 'pilot') {
      return NextResponse.redirect(pilotLoginUrl)
    }

    if (isClientRoute && role !== 'client') {
      return NextResponse.redirect(clientLoginUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error);
    const response = NextResponse.redirect(isPilotRoute ? pilotLoginUrl : clientLoginUrl)
    response.cookies.set('session', '', { expires: new Date(0) })
    return response
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/client/dashboard/:path*'],
}

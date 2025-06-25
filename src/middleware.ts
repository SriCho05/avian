import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const sessionCookie = cookies().get('session')?.value

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const session = await decrypt(sessionCookie);
    if (!session?.email) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}

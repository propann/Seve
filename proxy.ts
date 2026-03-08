import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/session-token';

/**
 * Garde des routes privees via cookie de session interne.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get('arbre_session')?.value;
  const session = await verifySessionToken(token);

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/rituel') ||
    request.nextUrl.pathname.startsWith('/garden') ||
    request.nextUrl.pathname.startsWith('/admin');

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAdminRoute && session && session.role !== "ADMIN" && session.role !== "TEACHER") {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/rituel/:path*', '/garden/:path*', '/admin/:path*'],
};

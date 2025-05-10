import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the session token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the requested path is a login or signup page
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
  // Check if the requested path is part of the dashboard section
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Redirect user to login if they are not authenticated and trying to access the dashboard
  if (!token && isDashboardPage) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated user to dashboard if they try to access login or signup pages
  if (token && isAuthPage) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}

export const config = {
  // Apply middleware to login/signup and dashboard pages
  matcher: ['/login', '/signup', '/dashboard', '/dashboard/:path*'],
};

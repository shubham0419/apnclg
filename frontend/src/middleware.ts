import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const publicRoutes = ['/login', '/register', '/public'];


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  

  // If no token and not a public route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If no token but on public route, allow access
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }
  
  // If token exists, validate the user
  if (token) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api"}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 5000,
        withCredentials: true
      });

      if(res.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      // If user is already on a public login/signup route and authenticated, redirect to home
      if (isPublicRoute) {
        const home = new URL("/", request.url);
        return NextResponse.redirect(home);
      }
      
      return NextResponse.next();
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'], // Exclude static files, assets, and API routes
};
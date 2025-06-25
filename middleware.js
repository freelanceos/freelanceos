
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const { pathname } = request.nextUrl

    // Get admin session from cookies - using the correct cookie name
    const adminToken = request.cookies.get('admin_token')?.value

    // Check if the request is for the admin section
    if (pathname.startsWith('/admin')) {
        // Allow access to login page if not authenticated
        if (pathname === '/admin/login') {
            // If user is already logged in, redirect to admin dashboard
            if (adminToken) {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
            // Otherwise, allow access to login page
            return NextResponse.next()
        }

        // Check authentication for other admin routes
        if (!adminToken) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // User is authenticated, allow access to admin routes
        return NextResponse.next()
    }

    // For non-admin routes, continue as normal
    return NextResponse.next()
}

// Configure the middleware to run only on admin routes
export const config = {
    matcher: '/admin/:path*'
}

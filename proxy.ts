import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log(request,"request");
    console.log(pathname,"pathname");
    console.log("Proxy");
  return NextResponse.redirect(new URL('/', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
//   matcher: '/dashboard/:path*',
   matcher: [
    '/dashboard/:path*',
    '/admin-dashboard/:path*',
   ]

//   matcher: ['/dashboard', '/dashboard/:path*']

}
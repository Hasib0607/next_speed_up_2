import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    // console.log("req",req);
    

    // Forward pathname as a query param or header
    const response = NextResponse.next();
    response.headers.set('x-current-path', pathname);

    return response;
}


// export const config = {
//     matcher: ['/', '/about', '/shop'], // Limit to specific paths
// };
// middleware.js
// import { NextResponse } from 'next/server';

// export function middleware(request:any) {
//   const url = request.nextUrl.clone();

//   // Example: Redirect to 404 for a specific route
//   if (url.pathname === '/some-invalid-route') {
//     url.pathname = '/404';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

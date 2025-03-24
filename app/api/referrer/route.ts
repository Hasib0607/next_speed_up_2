// import { NextRequest, NextResponse } from 'next/server';


// export async function GET(req: NextRequest) {
//     const referrer = req.headers.get("referer") || "";

//     // console.log("Referrer Header:", referrer);

//     const response = new NextResponse(JSON.stringify({ referrer }), {
//         status: 200,
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     // response.headers.set("X-Referrer", referrer);

//     // ✅ Store referrer in cookies (only if it exists and is external)
//     // if (referrer) {
//     //     response.cookies.set("referrer", referrer, { path: "/", httpOnly: false });
//     // }

//     return response;
// }

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const headersList = request.headers;

    const ip = headersList.get('x-forwarded-for') || 'Unknown IP';
    const previousUrl = headersList.get('referer') || '';
    const currentUrl =
        headersList.get('x-url') || headersList.get('x-forwarded-host') || '';

    // Set cookies correctly using NextResponse
    const response = NextResponse.json({ success: true });

    response.cookies.set('previousUrl', previousUrl, { path: '/' });
    response.cookies.set('currentUrl', currentUrl, { path: '/' });
    response.cookies.set('currentIp', ip, { path: '/' });

    return response;
}

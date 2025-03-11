import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const referrer = req.headers.get("referer") || "";

    // console.log("Referrer Header:", referrer);

    const response = new NextResponse(JSON.stringify({ referrer }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
    // response.headers.set("X-Referrer", referrer);

    // ✅ Store referrer in cookies (only if it exists and is external)
    // if (referrer) {
    //     response.cookies.set("referrer", referrer, { path: "/", httpOnly: false });
    // }

    return response;
}

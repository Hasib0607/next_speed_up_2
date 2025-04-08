import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/visitor-data`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const trackResponse = await response.json();
        // const trackResponse =
        //     { error: 'Failed to send tracking event',status: 200 }

        return NextResponse.json(trackResponse);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send tracking event' },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const payload = await req.json();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}update/visitor-data`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const trackResponse = await response.json();

        return NextResponse.json(trackResponse);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send tracking event' },
            { status: 500 }
        );
    }
}

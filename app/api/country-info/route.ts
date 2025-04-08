import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get/country`
        );

        if (!response.ok) {
            console.warn('No country found!');
        }

        const data = await response.json();
        return NextResponse.json(data?.data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch country data' },
            { status: 500 }
        );
    }
}

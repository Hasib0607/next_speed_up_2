import getDomain from '@/helpers/getDomain';
import { NextResponse } from 'next/server';

export const revalidate = 10

export async function GET() {
    const name = await getDomain();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}header-settings/${name}/info`
        );
        if (!response.ok) {
            console.warn('No header settings found!');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch header settings data' },
            { status: 500 }
        );
    }
}

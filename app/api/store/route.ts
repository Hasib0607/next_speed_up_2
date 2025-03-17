import getDomain from '@/helpers/getDomain';
import { NextResponse } from 'next/server';

export async function GET() {
    const name = await getDomain();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}/info`,
            {
                next: {
                    revalidate: 10,
                },
            }
        );
        if (!response.ok) {
            console.warn('No store found!');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch store data' },
            { status: 500 }
        );
    }
}

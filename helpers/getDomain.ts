import { headers } from 'next/headers';

export default async function getDomain() {
    const headersList = await headers(); // ✅ Await headers() inside async function

    const host =
        headersList.get('x-forwarded-host') || headersList.get('host') || '';
    const forwardedPath = headersList.get('x-forwarded-path') || '';

    let url = `${host}${forwardedPath}`;

    if (url.includes('www.')) {
        url = url.replace('www.', '');
    }

    return url;
    // return "uncleflix.com";
}

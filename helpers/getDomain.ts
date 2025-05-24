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

    if (process.env.NODE_ENV === 'production') {
        return url;
    }

    // url = 'muazuddinfurniture.ebitans.store';
    // url = 'kc.design';
    // url = "swifttrading.store";
    // url = "lokmantraders.shop";
    // url = "nayeil.com";
    // url = "bikroyhutbd.com";
    // url = 'witnessclassic.com';
    url = 'moon.localhost:3000';

    return url;
}

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

<<<<<<< HEAD
    // url = "livicabd.com";
    // url = "2ndpagebooks.com";
    url = 'moon.localhost:3000';
    // url = "qutobd.com";
=======
    // url = 'nexmanbd.com';
    // url = 'kc.design';
    // url = "swifttrading.store";
    // url = "mytimebd.store";
    url = 'shr.localhost:3000';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

    return url;
}

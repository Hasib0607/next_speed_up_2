'use server';

import getDomain from '@/helpers/getDomain';
import { cookies } from 'next/headers';

// Get the stored referrer
export async function getUserDataFromCookies() {
    const domain = await getDomain();
    const cookieStore = await cookies();

    const previousUrl =
        cookieStore.get('previousUrl')?.value || 'No previousUrl found';
    const currentUrl =
        cookieStore.get('currentUrl')?.value || 'No currentUrl found';
    const userIp = cookieStore.get('currentIp')?.value || 'No IP found';
    const countryCode = cookieStore.get('countryCode')?.value || 'BD';
    const city = cookieStore.get('city')?.value || 'No countryCode found';

    // for params
    const routeParamsCookie = cookieStore.get('routeParams');

    let routeParams: Record<string, string> = {};

    if (routeParamsCookie) {
        try {
            routeParams = JSON.parse(routeParamsCookie.value);
        } catch (e) {
            console.error('Error parsing route params:', e);
        }
    }

    const { productId, cat_id } = routeParams || {};

    const userData = {
        previousUrl,
        domain,
        currentUrl,
        userIp,
        productId,
        cat_id,
        countryCode,
        city,
    };

    return userData;
}

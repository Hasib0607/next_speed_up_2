import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getDomain from '@/helpers/getDomain';
import { cookies } from 'next/headers';
import { VercelGeo } from './types';

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const headersList = req.headers;
    const domain = await getDomain();

    const geo = (req as unknown as { geo?: VercelGeo }).geo ?? {
        city: '',
        country: 'BD',
        region: '',
        latitude: '',
        longitude: '',
    };

    const ip = headersList.get('x-forwarded-for') || 'Unknown IP';
    const previousUrl = headersList.get('referer') || '';

    // Construct the full URL
    const protocol = req.nextUrl.protocol; // 'http:' or 'https:'
    const host = req.headers.get('host') || req.nextUrl.host;
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;

    // Combine to create the full URL
    const currentUrl = `${protocol}//${host}${pathname}${search}`;

    // Skip tracking for certain URLs or if it's the same URL (refresh)
    const skipTracking =
        ['/api/', '/_next/', '/favicon.ico'].some((path) =>
            pathname.startsWith(path)
        ) || previousUrl === currentUrl;

    if (skipTracking) {
        return response;
    }

    // Store the current URL as the previous URL for the next page
    const cookieStore = await cookies();
    cookieStore.set('previousUrl', previousUrl, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10, // Short-lived cookie (10 minutes)
    });
    cookieStore.set('currentUrl', currentUrl, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10, // Short-lived cookie (10 minutes)
        sameSite: 'strict',
    });
    cookieStore.set('currentIp', ip, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10, // Short-lived cookie (10 minutes)
        sameSite: 'strict',
    });

    storeGeoData(geo, cookieStore);
    catchRouteParams(pathname, cookieStore);

    // Handle robots.txt dynamically

    if (pathname === '/robots.txt') {
        const urlResponse = await fetch(req.url);
        let originalRobotsTxt = await urlResponse.text();

        try {
            // Ensure robots.txt doesn't duplicate comments
            if (!originalRobotsTxt.includes('#')) {
                const comments = [
                    `Robots.txt file for ${protocol}//${domain}`,
                    `Generated on: ${new Date().toUTCString()}`,
                    'All robots are welcome to crawl our site',
                    'Disallowed paths are restricted for privacy and security reasons',
                    'Please respect these rules and happy crawling!',
                ];

                const commentString = comments.map((c) => `# ${c}`).join('\n');
                originalRobotsTxt = `${commentString}\n\n${originalRobotsTxt}`;
            }

            return new NextResponse(originalRobotsTxt, {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        } catch (error) {
            console.error('Error fetching robots.txt:', error);
            return new NextResponse('Error fetching robots.txt', {
                status: 500,
            });
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Exclude specific paths
        '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
        // '/:path*',
    ],
};

const catchRouteParams = (pathname: any, cookieStore: any) => {
    // Extract dynamic segments from the pathname
    const segments = pathname.split('/').filter(Boolean);
    const params: Record<string, string> = {};

    // For product routes: /product/[productId]/[slug]
    if (segments[0] === 'product' && segments.length >= 3) {
        params.productId = segments[1];
        params.slug = segments[2];
    } else {
        params.productId = '';
        params.slug = '';
    }

    // For category routes: /category/[cat_id]
    if (segments[0] === 'category' && segments.length >= 2) {
        params.cat_id = segments[1];
    } else {
        params.cat_id = '';
    }

    // Store all params in a cookie
    if (Object.keys(params).length > 0) {
        cookieStore.set('routeParams', JSON.stringify(params), {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 10, // Short-lived cookie (10 minutes)
        });
    }
};

const storeGeoData = (geo: any, cookieStore: any) => {
    const city = geo?.city || '';
    const country = geo?.country || '';
    const region = geo?.region || '';
    const latitude = geo?.latitude || '';
    const longitude = geo?.longitude || '';

    cookieStore.set('city', city, {
        path: '/',
        httpOnly: false, // optional
    });
    cookieStore.set('countryCode', country, {
        path: '/',
        httpOnly: false, // optional
    });
    cookieStore.set('region', region, {
        path: '/',
        httpOnly: false, // optional
    });
    cookieStore.set('latitude', latitude, {
        path: '/',
        httpOnly: false, // optional
    });
    cookieStore.set('longitude', longitude, {
        path: '/',
        httpOnly: false, // optional
    });
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getDomain from '@/helpers/getDomain';

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Handle robots.txt
    if (pathname === '/robots.txt') {
        const domain = await getDomain();
        const response = await fetch(req.url);
        let originalRobotsTxt = await response.text();

        // Check if the robots.txt already contains the comment to avoid duplication
        if (!originalRobotsTxt.includes('#')) {
            const comments = [
                `Robots.txt file for https://${domain}`,
                `Generated on: ${new Date().toUTCString()}`,
                'All robots are welcome to crawl our site',
                'Disallowed paths are restricted for privacy and security reasons',
                'Please respect these rules and happy crawling!',
            ];

            const commentString = comments
                .map((comment) => `# ${comment}`)
                .join('\n');
            originalRobotsTxt = `${commentString}\n\n${originalRobotsTxt}`;
        }

        return new NextResponse(originalRobotsTxt, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
    // Existing middleware logic
    const response = NextResponse.next();
    response.headers.set('x-current-path', pathname);

    return response;
}

export const config = {
    matcher: ['/', '/about', '/shop', '/robots.txt'], // Added '/robots.txt' to the existing matchers
};

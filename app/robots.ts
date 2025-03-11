import getDomain from '@/helpers/getDomain';
import type { MetadataRoute } from 'next';
import { connection } from 'next/server';

// Define a custom type that extends MetadataRoute.Robots
type CustomRobots = MetadataRoute.Robots & {
    toString: () => string;
};

export default async function robots(): Promise<CustomRobots> {
    connection(); // Opt out of static generation

    const disallowedPaths = await getDisallowedPaths();
    const sitemapUrl = await getSitemapUrl();
    const domain = await getDomain();

    const robotsObject: CustomRobots = {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: disallowedPaths,
            },
        ],
        host: `https://${domain}`,
        sitemap: sitemapUrl,
        toString: function () {
            let output = '';

            // Add rules
            if (this.rules) {
                for (const rule of this.rules as any) {
                    output += `User-agent: ${rule.userAgent}\n`;
                    if (rule.allow) {
                        (Array.isArray(rule.allow)
                            ? rule.allow
                            : [rule.allow]
                        ).forEach((allow: string) => {
                            output += `Allow: ${allow}\n`;
                        });
                    }
                    if (rule.disallow) {
                        (Array.isArray(rule.disallow)
                            ? rule.disallow
                            : [rule.disallow]
                        ).forEach((disallow: string) => {
                            output += `Disallow: ${disallow}\n`;
                        });
                    }
                    output += '\n';
                }
            }

            // Add host and sitemap
            if (this.host) {
                output += `Host: ${this.host}\n`;
            }

            if (this.sitemap) {
                (Array.isArray(this.sitemap)
                    ? this.sitemap
                    : [this.sitemap]
                ).forEach((sitemap: string) => {
                    output += `Sitemap: ${sitemap}\n`;
                });
            }

            return output.trim();
        },
    };

    return robotsObject;
}

async function getDisallowedPaths(): Promise<string[]> {
    // Implement your logic to determine which paths to disallow
    return [
        '/helps',
        '/privacy_policy',
        '/return_policy',
        '/terms_and_condition',
    ];
}

async function getSitemapUrl(): Promise<string> {
    const domain = await getDomain();
    return `https://${domain}/sitemap.xml`;
}

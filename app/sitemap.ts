import getDomain from '@/helpers/getDomain';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const domain = await getDomain();
    return [
        {
            url: `https://${domain}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        // {
        //     url: `https://${domain}/about`,
        //     lastModified: new Date(),
        //     changeFrequency: 'monthly',
        //     priority: 0.8,
        // },
        // {
        //     url: `https://${domain}/blog`,
        //     lastModified: new Date(),
        //     changeFrequency: 'weekly',
        //     priority: 0.5,
        // },
    ];
}

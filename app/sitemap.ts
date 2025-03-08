import getDomain from '@/helpers/getDomain';
import type { MetadataRoute } from 'next';
import { fetchBlogSitemapData } from './(main)/blog/helper/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const domain = await getDomain();

    const blogSitemapData = (await fetchBlogSitemapData()) ?? []

    const blogsSitemap = blogSitemapData.map((post:any) => ({
        url: `https://${domain}/blogs/${post.permalink ?? post.slug}`,
        lastModified: `${post.updated_at}`,
        // changeFrequency: `${post.change_frequency ?? 'monthly'}`,
    })) ?? {}

    return [
        {
            url: `https://${domain}`,
            lastModified: new Date(),
            // changeFrequency: 'yearly',
            // priority: 1,
        },
        {
            url: `https://${domain}/shop`,
            lastModified: new Date(),
            // changeFrequency: 'monthly',
            // priority: 0.8,
        },
        // ...blogsSitemap
    ];
}

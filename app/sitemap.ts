import type { MetadataRoute } from 'next';
import { fetchBlogSitemapData } from './(main)/blog/helper/api';
import { getInitialAppData } from '@/lib/getInitialAppData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { menu, appStore, domain } = await getInitialAppData({
        menu: true,
        appStore: true,
    });

    const store_id = appStore?.id || null;

    const menuSitemap = Array.isArray(menu)
        ? menu.map((item: any) => ({
              url: `https://${domain}/${item.custom_link || item.url}`,
              lastModified: `${item.updated_at}`,
          }))
        : [];

    // for blog
    const blogSitemapData = (await fetchBlogSitemapData(store_id)) ?? [];

    const blogsSitemap = Array.isArray(blogSitemapData)
        ? blogSitemapData.map((post: any) => ({
              url: `https://${domain}/blogs/${post.permalink || post.slug}`,
              lastModified: `${post.updated_at}`,
          }))
        : [];

    // if needed extra info
    // changeFrequency: `${post.change_frequency ?? 'monthly'}`,
    // priority: 0.8,

    return [...menuSitemap, ...blogsSitemap];
}

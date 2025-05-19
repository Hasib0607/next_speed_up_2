import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import Brand from '@/components/BrandPage';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Brand`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function BrandPage() {
    const { design, brands } = await getInitialAppData({
        design: true,
        brands: true,
    });

    return <Brand design={design} brands={brands} />;
}

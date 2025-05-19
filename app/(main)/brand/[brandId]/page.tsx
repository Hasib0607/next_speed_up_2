import { imgUrl } from '@/site-settings/siteUrl';

// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

// components imports
import SubBrand from '@/components/SubBrandPage';
import { getInitialAppData } from '@/lib/getInitialAppData';

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

export default async function SubBrandPage({
    params,
}: {
    params: Promise<{ brandId: any }>;
}) {
    const { design, brands, paramsResult } = await getInitialAppData(
        {
            design: true,
            brands: true,
            paramsResult: true,
        },
        params
    );

    const brandId = paramsResult.brandId;

    return <SubBrand design={design} brands={brands} brandId={brandId} />;
}

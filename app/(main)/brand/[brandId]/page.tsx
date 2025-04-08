import { imgUrl } from '@/site-settings/siteUrl';

// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

// components imports
import getDesign from '@/utils/fetcher/getDesign';
import SubBrand from '@/components/SubBrandPage';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
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
    const design = await getDesign();
    const brandId = (await params).brandId;

    return <SubBrand design={design} brandId={brandId} />;
}

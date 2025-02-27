import { imgUrl } from '@/site-settings/siteUrl';
// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

// components imports
import Category from '@/components/Category';
import getDesign from '@/utils/fetcher/getDesign';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Category`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function SubcategoryPage({
    params,
}: {
    params: Promise<{ cat_id: any }>;
}) {
    const design = await getDesign();
    const catId = (await params).cat_id;

    return <Category design={design} catId={catId} />;
}

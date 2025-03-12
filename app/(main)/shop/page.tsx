import { imgUrl } from '@/site-settings/siteUrl';
// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

// components imports
import Shop from '@/components/Shop';
import getDesign from '@/utils/fetcher/getDesign';
import ResetFilter from '@/utils/ResetFilter';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Shop`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function ShopPage() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <ResetFilter />
            <Shop design={design} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

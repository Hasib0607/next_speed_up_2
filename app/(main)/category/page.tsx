import EbitansAnalytics from '@/components/EbitansAnalytics';
import Shop from '@/components/Shop';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import { imgUrl } from '@/site-settings/siteUrl';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import ResetFilter from '@/utils/ResetFilter';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Category`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function CategoryPage() {
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

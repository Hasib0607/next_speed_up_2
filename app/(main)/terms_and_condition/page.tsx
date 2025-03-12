import { imgUrl } from '@/site-settings/siteUrl';
import CustomPage from '@/components/CustomPage';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import EbitansAnalytics from '@/components/EbitansAnalytics';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Terms And Condition`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}


export default async function TermsAndConditionPage() {
    const design = await getDesign();
    const menu = await getMenu();
    const page = await getPage();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <CustomPage design={design} menu={menu} page={page} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

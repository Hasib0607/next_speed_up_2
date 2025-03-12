import CustomPage from '@/components/CustomPage';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import { imgUrl } from '@/site-settings/siteUrl';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Privacy Policy`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function PrivacyPolicyPage() {
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

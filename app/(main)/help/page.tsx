import { cookies } from 'next/headers';
import { imgUrl } from '@/site-settings/siteUrl';
import CustomPage from '@/components/CustomPage';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Help`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function HelpPage() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const menu = await getMenu();
    const page = await getPage();
    const referrer =
        (await cookies()).get('referrer')?.value || 'No referrer found';

    return (
        <>
            <CustomPage design={design} menu={menu} page={page} />;
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                referrer={referrer}
            />
        </>
    );
}

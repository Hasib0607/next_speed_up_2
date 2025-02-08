import { imgUrl } from '@/site-settings/siteUrl';
import LogIn from '@/components/LogIn';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getDesign from '@/utils/fetcher/getDesign';
import getStore from '@/utils/fetcher/getStore';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Login`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function LoginPage() {
    const design = await getDesign();
    const appStore = await getStore();
    const headersetting = await getHeaderSetting();

    return (
        <LogIn
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

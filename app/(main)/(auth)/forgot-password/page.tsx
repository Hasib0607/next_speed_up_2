import EbitansAnalytics from '@/components/EbitansAnalytics';
import ForgetPassword from '@/components/ForgetPassword';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import { imgUrl } from '@/site-settings/siteUrl';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Forget Password`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function ForgetPasswordPage() {
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <ForgetPassword
                design={design}
                appStore={appStore}
                headersetting={headersetting}
            />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

import EbitansAnalytics from '@/components/EbitansAnalytics';
import ProfileComponent from '@/components/Profile';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';

export default async function Profile() {
    const design = await getDesign();
    const appStore = await getStore();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <ProfileComponent design={design} appStore={appStore} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

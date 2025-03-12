import EbitansAnalytics from '@/components/EbitansAnalytics';
import PamentFailed from '@/components/PaymentFailed';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

export default async function FailedPage() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();
    
    return (
        <>
            <PamentFailed />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

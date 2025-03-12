import ThankYou from '@/components/ThankYou';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import PurchaseGtmSuccess from './PurchaseGtmSuccess';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import getDesign from '@/utils/fetcher/getDesign';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';

export default async function SuccessPage() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <PurchaseGtmSuccess headersetting={headersetting} />
            <ThankYou />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

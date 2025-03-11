import VerifyOtp from '@/components/VerifyOtp';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';

export default async function VerifyOtpPage() {
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();

    return (
        <VerifyOtp
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

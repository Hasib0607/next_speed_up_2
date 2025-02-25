import ThankYou from '@/components/ThankYou';
import PurchaseGtm from './PurchaseGtm';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

export default async function ThankYouPage() {
    const headersetting = await getHeaderSetting();
    return (
        <>
            <PurchaseGtm headersetting={headersetting} />
            <ThankYou />
        </>
    );
}

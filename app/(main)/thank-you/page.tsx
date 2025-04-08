import ThankYou from '@/components/ThankYou';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import PurchaseGtmSuccess from '../payment/success/PurchaseGtmSuccess';

export default async function ThankYouPage() {
    const headersetting = await getHeaderSetting();
    return (
        <>
            <PurchaseGtmSuccess headersetting={headersetting} />
            <ThankYou />
        </>
    );
}

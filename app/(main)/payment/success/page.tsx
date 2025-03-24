import ThankYou from '@/components/ThankYou';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import PurchaseGtmSuccess from './PurchaseGtmSuccess';

export default async function SuccessPage() {
    const headersetting = await getHeaderSetting();

    return (
        <>
            <PurchaseGtmSuccess headersetting={headersetting} />
            <ThankYou />
        </>
    );
}

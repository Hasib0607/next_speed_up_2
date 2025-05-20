import { getInitialAppData } from '@/lib/getInitialAppData';
import PurchaseGtmSuccess from './PurchaseGtmSuccess';
import ThankYou from '@/components/ThankYou';

export default async function SuccessPage() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    return (
        <>
            <PurchaseGtmSuccess headersetting={headersetting} />
            <ThankYou />
        </>
    );
}

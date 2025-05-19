import PurchaseGtmSuccess from '../payment/success/PurchaseGtmSuccess';
import { getInitialAppData } from '@/lib/getInitialAppData';
import ThankYou from '@/components/ThankYou';

export default async function ThankYouPage() {
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

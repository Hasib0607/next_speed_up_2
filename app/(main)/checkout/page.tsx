import CheckoutGtm from '@/app/(main)/checkout/CheckoutGtm';
import ProtectedLayer from '@/app/ProtectedLayer';
import Checkout from '@/components/Checkout';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { imgUrl } from '@/site-settings/siteUrl';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Checkout`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function CheckoutPage() {
    const store = await getStore();
    
    return (
        <>
            {store?.auth_type !== 'EasyOrder' ? (
                <ProtectedLayer>
                    <CheckoutGtm />
                    <Checkout />
                </ProtectedLayer>
            ) : (
                <>
                    <CheckoutGtm />
                    <Checkout />
                </>
            )}
        </>
    );
}

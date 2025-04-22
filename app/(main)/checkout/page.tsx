import CheckoutGtm from '@/app/(main)/checkout/CheckoutGtm';
import GuestLayer from '@/app/GuestLayer';
import ProtectedLayer from '@/app/ProtectedLayer';
import Checkout from '@/components/Checkout';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getActiveAuthTypes } from '@/helpers/getActiveAuthTypes';
import { imgUrl } from '@/site-settings/siteUrl';
import getDesign from '@/utils/fetcher/getDesign';
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
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const authTypes = getActiveAuthTypes(appStore);

    return (
        <>
            {authTypes.EasyOrder || authTypes.EmailEasyOrder ? (
                <>
                    <CheckoutGtm headersetting={headersetting} />
                    <Checkout
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                    />
                </>
            ) : (
                <ProtectedLayer>
                    <CheckoutGtm headersetting={headersetting} />
                    <Checkout
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                    />
                </ProtectedLayer>
            )}
        </>
    );
}

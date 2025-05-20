import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getActiveAuthTypes } from '@/helpers/getActiveAuthTypes';
import CheckoutGtm from '@/app/(main)/checkout/CheckoutGtm';
import { getInitialAppData } from '@/lib/getInitialAppData';
import ProtectedLayer from '@/app/ProtectedLayer';
import { imgUrl } from '@/site-settings/siteUrl';
import Checkout from '@/components/Checkout';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Checkout`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function CheckoutPage() {
    const { design, appStore, headersetting } = await getInitialAppData({
        design: true,
        appStore: true,
        headersetting: true,
    });

    const authTypes = getActiveAuthTypes(appStore);

    return authTypes.EasyOrder || authTypes.EmailEasyOrder ? (
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
    );
}

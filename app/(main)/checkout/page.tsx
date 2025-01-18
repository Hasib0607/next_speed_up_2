import CheckoutGtm from '@/app/(main)/checkout/CheckoutGtm';
import Checkout from '@/components/Checkout';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { imgUrl } from '@/site-settings/siteUrl';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Checkout`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

const CheckoutPage = () => {
    return (
        <>
            <CheckoutGtm />
            <Checkout />;
        </>
    );
};

export default CheckoutPage;

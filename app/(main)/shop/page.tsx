import { imgUrl } from '@/site-settings/siteUrl';
// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

// components imports
import Shop from '@/components/Shop';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Shop`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

const ShopPage = () => {
    return (
        <>
            <Shop />
        </>
    );
};

export default ShopPage;

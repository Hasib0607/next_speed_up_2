import Offer from '@/components/Offer';
import { imgUrl } from '@/site-settings/siteUrl';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Offer`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function OfferPage() {
    const design = await getDesign();

    return <Offer design={design} />;
}

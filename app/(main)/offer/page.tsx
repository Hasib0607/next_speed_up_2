import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import Offer from '@/components/Offer';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Offer`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function OfferPage() {
    const { design } = await getInitialAppData({
        design: true,
    });

    return <Offer design={design} />;
}

import { imgUrl } from '@/site-settings/siteUrl';
// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

// components imports
import Shop from '@/components/Shop';
import ResetFilter from '@/utils/ResetFilter';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Shop`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function ShopPage() {
    const { design } = await getInitialAppData({
        design: true,
    });

    return (
        <>
            <ResetFilter />
            <Shop design={design} />
        </>
    );
}

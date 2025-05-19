import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import ResetFilter from '@/utils/ResetFilter';
import Shop from '@/components/Shop';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Category`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function CategoryPage() {
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

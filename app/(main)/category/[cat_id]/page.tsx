import { imgUrl } from '@/site-settings/siteUrl';

// helper imports
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

// components imports
import Category from '@/components/Category';
import { getInitialAppData } from '@/lib/getInitialAppData';

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

export default async function SubcategoryPage({
    params,
}: {
    params: Promise<{ cat_id: any }>;
}) {
    const { design, paramsResult } = await getInitialAppData(
        {
            design: true,
            paramsResult: true,
        },
        params
    );
    
    const catId = paramsResult.cat_id;

    return <Category design={design} catId={catId} />;
}

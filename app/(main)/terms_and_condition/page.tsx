import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import CustomPage from '@/components/CustomPage';
import { imgUrl } from '@/site-settings/siteUrl';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Terms And Condition`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function TermsAndConditionPage() {
    const { design, menu, page } = await getInitialAppData({
        design: true,
        menu: true,
        page: true,
    });

    return <CustomPage design={design} menu={menu} page={page} />;
}

import { imgUrl } from '@/site-settings/siteUrl';
import CustomPage from '@/components/CustomPage';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | About`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function AboutPage() {
    const { design, menu, page } = await getInitialAppData({
        design: true,
        menu: true,
        page: true,
    });

    return <CustomPage design={design} menu={menu} page={page} />;
}

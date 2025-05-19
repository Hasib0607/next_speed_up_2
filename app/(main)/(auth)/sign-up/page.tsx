import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import Register from '@/components/Register';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Register`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function RegisterPage() {
    const { design, appStore, headersetting } = await getInitialAppData({
        design: true,
        appStore: true,
        headersetting: true,
    });

    return (
        <Register
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

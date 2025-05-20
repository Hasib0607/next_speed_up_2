import { imgUrl } from '@/site-settings/siteUrl';
import LogIn from '@/components/LogIn';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Login`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function LoginPage() {
    const { design, appStore, headersetting } = await getInitialAppData({
        design: true,
        appStore: true,
        headersetting: true,
    });

    return (
        <LogIn
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

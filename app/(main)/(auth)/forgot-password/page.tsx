import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import ForgetPassword from '@/components/ForgetPassword';
import { imgUrl } from '@/site-settings/siteUrl';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Forget Password`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function ForgetPasswordPage() {
    const { design, appStore, headersetting } = await getInitialAppData({
        design: true,
        appStore: true,
        headersetting: true,
    });

    return (
        <ForgetPassword
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

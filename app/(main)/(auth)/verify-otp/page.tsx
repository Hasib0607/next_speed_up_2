import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import VerifyOtp from '@/components/VerifyOtp';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Verify Otp`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function VerifyOtpPage() {
    const { design, appStore, headersetting } = await getInitialAppData({
        design: true,
        appStore: true,
        headersetting: true,
    });

    return (
        <VerifyOtp
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

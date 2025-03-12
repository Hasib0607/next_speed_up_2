import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import Contact from '@/components/Contact';
import getDesign from '@/utils/fetcher/getDesign';
import { cookies } from 'next/headers';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { imgUrl } from '@/site-settings/siteUrl';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Contact`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

const ContactPage = async () => {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const referrer =
        (await cookies()).get('referrer')?.value || 'No referrer found';

    return (
        <>
            <Contact design={design} headersetting={headersetting} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                referrer={referrer}
            />
        </>
    );
};

export default ContactPage;

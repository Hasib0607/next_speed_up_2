import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { imgUrl } from '@/site-settings/siteUrl';
import Contact from '@/components/Contact';

export async function generateMetadata() {
    const { headersetting } = await getInitialAppData({
        headersetting: true,
    });

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Contact`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

const ContactPage = async () => {
    const { design, headersetting } = await getInitialAppData({
        design: true,
        headersetting: true,
    });

    return <Contact design={design} headersetting={headersetting} />;
};

export default ContactPage;

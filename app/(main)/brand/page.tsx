import Brand from '@/components/BrandPage';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { imgUrl } from '@/site-settings/siteUrl';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import ResetFilter from '@/utils/ResetFilter';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Brand`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

export default async function BrandPage() {
    const design = await getDesign();

    return (
        <>
            {/* <ResetFilter /> */}
            <Brand design={design} />
        </>
    );
}

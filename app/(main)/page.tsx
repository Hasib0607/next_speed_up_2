import HomePage from '@/components/HomePage';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getLayout from '@/utils/fetcher/getLayout';
import getSlider from '@/utils/fetcher/getSlider';
import getBanner from '@/utils/fetcher/getBanner';

export default async function Home() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const layout = await getLayout();
    const slider = await getSlider();
    const banner = await getBanner();

    return (
        <HomePage
            design={design}
            headersetting={headersetting}
            layout={layout}
            slider={slider}
            banner={banner}
        />
    );
}

import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import HomePage from '@/components/HomePage';
import getDesign from '@/utils/fetcher/getDesign';
import getLayout from '@/utils/fetcher/getLayout';
import getSlider from '@/utils/fetcher/getSlider';
import getBanner from '@/utils/fetcher/getBanner';

export default async function Home() {
    const headersetting = await getHeaderSetting();
    const design = await getDesign();
    const layout = await getLayout();
    const slider = await getSlider();
    const banner = await getBanner();
// console.log("layout",layout);

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

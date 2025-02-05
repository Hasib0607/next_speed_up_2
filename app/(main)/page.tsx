import dynamic from 'next/dynamic';
import getDesign from '@/utils/fetcher/getDesign';

import Announcement from '@/components/Announcement';
const Header = dynamic(() => import('@/components/Header'));
import HomePage from '@/components/HomePage';
import CartPopUp from '@/components/CartPopUp';
import MobileBottomMenu from '@/components/mobile-bottom-menu';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
const Footer = dynamic(() => import('@/components/Footer'));

export default async function Home() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();

    return (
        <>
            <Announcement design={design} />
            <Header />
            <HomePage design={design} headersetting={headersetting}/>
            <CartPopUp design={design} />
            <MobileBottomMenu />
            <Footer design={design} />
        </>
    );
}

import dynamic from 'next/dynamic';
import Announcement from '@/components/Announcement';
import CartPopUp from '@/components/CartPopUp';
import MobileBottomMenu from '@/components/mobile-bottom-menu';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';

const Header = dynamic(() => import('@/components/Header'));
const Footer = dynamic(() => import('@/components/Footer'));

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const menu = await getMenu();

    return (
        <>
            <Announcement design={design} />
            <Header />
            {children}
            <MobileBottomMenu />
            <CartPopUp design={design} />
            <Footer design={design} headersetting={headersetting} menu={menu} />
        </>
    );
}

import dynamic from 'next/dynamic';
import Announcement from '@/components/Announcement';
import CartPopUp from '@/components/CartPopUp';
import MobileBottomMenu from '@/components/mobile-bottom-menu';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import EbitansAnalytics from '@/components/EbitansAnalytics';

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
    const userData = await getUserDataFromCookies();

    return (
        <>
            <Announcement design={design} />
            <Header />
            {children}
            <CartPopUp design={design} />
            <MobileBottomMenu />
            <Footer design={design} headersetting={headersetting} menu={menu} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

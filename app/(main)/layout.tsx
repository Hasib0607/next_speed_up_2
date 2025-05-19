import MobileBottomMenu from '@/components/mobile-bottom-menu';
import Announcement from '@/components/Announcement';
import CartPopUp from '@/components/CartPopUp';
import dynamic from 'next/dynamic';
import { getInitialAppData } from '@/lib/getInitialAppData';

const Header = dynamic(() => import('@/components/Header'));
const Footer = dynamic(() => import('@/components/Footer'));

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialAppData = await getInitialAppData({
        design: true,
        headersetting: true,
        menu: true,
        page: true,
        category: true,
        subcategory: true,
    });

    return (
        <>
            <Announcement design={initialAppData.design} />
            <Header {...initialAppData} />
            {children}
            <CartPopUp design={initialAppData.design} />
            <MobileBottomMenu design={initialAppData.design} />
            <Footer {...initialAppData} />
        </>
    );
}

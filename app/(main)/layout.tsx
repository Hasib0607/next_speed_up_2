'use client';

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import {
    useGetDesignQuery,
    useGetHeaderSettingsQuery,
    useGetMenuQuery,
} from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';

import Announcement from '@/components/Announcement';
import CartPopUp from '@/components/CartPopUp';
import MobileBottomMenu from '@/components/mobile-bottom-menu';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useGetDesignQuery({});
    useGetHeaderSettingsQuery({});
    useGetMenuQuery({});
    // need

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    return (
        <>
            <Announcement design={design} store_id={store_id} />
            <Header design={design} />
            {children}
            <CartPopUp design={design} />
            <MobileBottomMenu design={design} />
            <Footer design={design} />
        </>
    );
}

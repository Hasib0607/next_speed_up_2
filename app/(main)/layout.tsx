'use client';

import Announcement from '@/components/Announcement';
import {
    useGetDesignQuery,
    useGetHeaderSettingsQuery,
    useGetMenuQuery,
} from '@/redux/features/home/homeApi';

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

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

    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    return (
        <>
            <Header design={design} />
            {children}
            <Footer design={design} />
        </>
    );
}

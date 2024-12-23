'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// components
import CartPopUp from "@/components/CartPopUp";
import { RootState } from '@/redux/store';
// import AllMobileBottomMenu from "./mobileBottomMenu";

const StoreLayer = ({ children }: any) => {
    const router = useRouter();
    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state

    useEffect(() => {
        // Redirect to 404 page
        if (store === undefined) {
            router.replace('/not-found');
        }
    }, [store, router]);

    if (store === undefined) {
        return null;
    }
    

    return (
        <>
            {children}
            {/* <AllMobileBottomMenu/> */}
            <CartPopUp />
        </>
    );
};

export default StoreLayer;

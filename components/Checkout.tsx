'use client';

import { checkout_pages } from '@/utils/dynamic-import/checkoutPages/checkoutPages';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { DEFAULT } from '@/consts';

const Checkout = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const CheckoutComponent = 
        checkout_pages[design?.checkout_page] || checkout_pages[DEFAULT];

    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { store } = useSelector((state: RootState) => state.appStore);


    return (
        <>
            {design?.checkout_page !== "null" && CheckoutComponent && (
                <CheckoutComponent />
            )}
        </>
    );
};

export default Checkout;

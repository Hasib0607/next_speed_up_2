'use client';

import { checkout_pages } from '@/utils/dynamic-import/checkoutPages/checkoutPages';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { DEFAULT } from '@/consts';

const Checkout = () => {
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    const CheckoutComponent =
        checkout_pages[design?.checkout_page] || checkout_pages[DEFAULT];

    const router = useRouter();
    const { user } = useSelector((state: any) => state.auth);
    const { store } = useSelector((state: RootState) => state.appStore);

    useEffect(() => {
        if (!user && store?.auth_type !== 'EasyOrder') {
            router.push('/login'); // Set redirect to true if user is not verified and store is not "EasyOrder"
        } else if (user || store?.auth_type === 'EasyOrder') {
            router.push('/checkout'); // Otherwise, no redirect
        }
    }, [user, store, router]);

    return (
        <>
            {design?.checkout_page && CheckoutComponent && (
                <CheckoutComponent />
            )}
        </>
    );
};

export default Checkout;

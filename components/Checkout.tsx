'use client';

import { checkout_pages } from '@/utils/dynamic-import/checkoutPages/checkoutPages';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { DEFAULT } from '@/consts';

const Checkout = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const CheckoutComponent = checkout_pages["twentyone"]
        // checkout_pages[design?.checkout_page] || checkout_pages[DEFAULT];

    return (
        <>
            {design?.checkout_page !== "null" && CheckoutComponent && (
                <CheckoutComponent />
            )}
        </>
    );
};

export default Checkout;

'use client';

import { Checkout } from '@/helpers/fbTracking';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CheckoutGtm = () => {
    const cartList = useSelector((state: any) => state.cart.cartList);
    const checkoutEvent = useCallback(() => {
        sendGTMEvent({
            event: 'checkout',
            value: cartList,
        });
        Checkout(cartList);
    }, [cartList]);
    useEffect(() => {
        checkoutEvent();
    }, [checkoutEvent]);
    return null;
};

export default CheckoutGtm;

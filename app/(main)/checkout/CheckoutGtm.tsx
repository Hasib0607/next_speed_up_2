'use client';

import { Checkout } from '@/helpers/fbTracking';
import { RootState } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CheckoutGtm = ({ headersetting }: any) => {
    const cartList = useSelector((state: RootState) => state.cart.cartList);

    const checkoutEvent = useCallback(() => {
        const currency = headersetting?.code;

        const items = cartList.map((item: any) => ({
            item_name: item?.name,
            item_category_id: item?.category_id,
            item_category: item?.category || '',
            item_category2: item.subcategory || 'General',
            item_id: item?.SKU,
            discount: parseFloat(item.discount_price) || 0,
            item_variant: item.color || 'default',
            price: parseFloat(item.price) || 0,
            quantity: item?.qty,
            tax_rate: parseFloat(item.tax_rate) || 0,
            shipping_fee: item.shipping_fee || 0,
        }));

        const totalPrice = cartList.reduce((accumulator: any, item: any) => {
            return accumulator + item.price * item.qty;
        }, 0);

        const sku = cartList.map((item: { SKU: any }) => item.SKU);

        sendGTMEvent({
            event: 'begin_checkout',
            pageType: 'Checkout',
            ecommerce: {
                currency: headersetting?.code || 'BDT',
                value: parseFloat(totalPrice) || 0,
                items: items,
            },
        });

        Checkout(totalPrice, sku, currency);
    }, [cartList, headersetting]);

    // const sendConversionEvent = async () => {
    //     await fetch("/api/fb-conversion", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             event_name: "Purchase",
    //             event_id: "123456",
    //             user_data: { client_ip_address: "1.2.3.4", client_user_agent: navigator.userAgent },
    //             custom_data: { value: 100, currency: "USD" },
    //         }),
    //     });
    // };
    

    useEffect(() => {
        checkoutEvent();
    }, [checkoutEvent]);
    return null;
};

export default CheckoutGtm;

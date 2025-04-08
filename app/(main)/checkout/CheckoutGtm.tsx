'use client';

import { trackServerConversion } from '@/app/actions/meta-conversions';
import { Checkout } from '@/helpers/fbTracking';
import { generateEventId } from '@/helpers/getBakedId';
import { RootState } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const CheckoutGtm = ({ headersetting }: any) => {
    const hasTracked = useRef(false);

    const cartList = useSelector((state: RootState) => state.cart.cartList);

    const allCheckoutEvent = useCallback(async () => {
        const event_id = generateEventId();
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

        const contents = cartList.map((item: any) => ({
            id: item?.id,
            item_price: parseFloat(item.price) || 0,
            quantity: item?.qty,
        }));

        const totalPrice = cartList.reduce((accumulator: any, item: any) => {
            return accumulator + item.price * item.qty;
        }, 0);

        const sku = cartList.map((item: { SKU: any }) => item.SKU);

        sendGTMEvent({
            event: 'begin_checkout',
            pageType: 'Checkout',
            ecommerce: {
                currency: currency || 'BDT',
                value: parseFloat(totalPrice) || 0,
                items: items,
            },
            event_id, // Pass event_id for deduplication
        });

        Checkout(totalPrice, sku, currency, event_id);

        // Send data to Facebook Conversion API
        await trackServerConversion('Checkout', {
            event_id, // Use the same event_id
            custom_data: {
                currency: currency || 'BDT',
                value: parseFloat(totalPrice) || 0,
                contents,
            },
        });
    }, [cartList, headersetting]);

    useEffect(() => {
        if (!hasTracked.current) {
            hasTracked.current = true;
            allCheckoutEvent();
        }
    });

    return null;
};

export default CheckoutGtm;

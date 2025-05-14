'use client';

import { trackServerConversion } from '@/app/actions/meta-conversions';
import { Checkout } from '@/helpers/fbTracking';
import { generateEventId } from '@/helpers/getBakedId';
import { RootState } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const CheckoutGtm = ({ headersetting }: any) => {
    const hasTracked = useRef(false);
    
    const cartList = useSelector((state: RootState) => state.cart.cartList);

    useEffect(() => {
        if (hasTracked.current || !Array.isArray(cartList) || cartList.length === 0) return;

        // ✅ Only include valid (non-null, non-zero qty) items
        const filteredCart = cartList.filter(item => item && item.qty > 0);

        if (filteredCart.length === 0) return;

        hasTracked.current = true;

        const event_id = generateEventId();
        const currency = headersetting?.code || 'BDT';

        const items = filteredCart.map((item: any) => ({
            item_name: item?.name,
            item_category_id: item?.category_id,
            item_category: item?.category || '',
            item_category2: item?.subcategory || 'General',
            item_id: item?.SKU,
            discount: parseFloat(item?.discount_price) || 0,
            item_variant: item?.color || 'default',
            price: parseFloat(item?.price) || 0,
            quantity: item?.qty,
            tax_rate: parseFloat(item?.tax_rate) || 0,
            shipping_fee: parseFloat(item?.shipping_fee) || 0,
        }));

        const contents = filteredCart.map((item: any) => ({
            id: item?.id,
            item_price: parseFloat(item?.price) || 0,
            quantity: item?.qty,
        }));

        const totalPrice = filteredCart.reduce(
            (acc: number, item: any) => acc + item.price * item.qty,
            0
        );

        const sku = filteredCart.map((item: any) => item.SKU);

        // ✅ Send clean data to GTM
        sendGTMEvent({
            event: 'begin_checkout',
            pageType: 'Checkout',
            ecommerce: {
                currency,
                value: parseFloat(totalPrice.toFixed(2)),
                items,
            },
            event_id,
        });

        // Meta Pixel
        Checkout(totalPrice, sku, currency, event_id);

        // Meta CAPI
        trackServerConversion('Checkout', {
            event_id,
            custom_data: {
                currency,
                value: parseFloat(totalPrice.toFixed(2)),
                contents,
            },
        });
    }, [cartList, headersetting]);

    return null;
};

export default CheckoutGtm;

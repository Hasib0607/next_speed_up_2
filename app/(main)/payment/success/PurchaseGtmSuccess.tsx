'use client';

import { Purchase } from '@/helpers/fbTracking';
import { prodMultiCat } from '@/helpers/prodMultiCat';
import { RootState } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PurchaseGtmSuccess = ({ headersetting }: any) => {
    const { purchaseList, grandTotal, customer } = useSelector(
        (state: RootState) => state.purchase
    );

    const currency = headersetting?.code;

    useEffect(() => {
        const items = purchaseList.map((item: any) => ({
            item_name: item?.name,
            item_category_id: item?.category_id,
            item_category: prodMultiCat(item?.category) || '',
            item_category2: item.subcategory || 'General',
            item_id: item?.SKU,
            discount: parseFloat(item.discount_price) || 0,
            item_variant: item.color || 'default',
            price: parseFloat(item.price) || 0,
            quantity: item?.qty,
            tax_rate: parseFloat(item.tax_rate) || 0,
            shipping_fee: item.shipping_fee || 0,
        }));

        if (grandTotal !== null && currency) {
            // Send the Google Tag Manager event
            sendGTMEvent({
                event: 'purchase',
                gtm: {
                    uniqueEventId: Math.floor(Math.random() * 1000),
                    start: Date.now(),
                },
                pageType: 'order-received',
                ecommerce: {
                    value: grandTotal,
                    currency: currency,
                    items: items,
                    // customer: { ...customer },
                },
            });

            // Call Facebook's Purchase function
            Purchase(grandTotal, currency);
        }
    }, [grandTotal, currency, purchaseList]);

    return null;
};

export default PurchaseGtmSuccess;

'use client';

import { sendConversionApiEvent } from '@/helpers/convertionApi';
import { ViewContent } from '@/helpers/fbTracking';
import { generateEventId } from '@/helpers/getBakedId';
import { numberParser } from '@/helpers/numberParser';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect } from 'react';

const ViewContentGtm = ({ product, headersetting }: any) => {

    const sendViewContentEvent = useCallback(async () => {
        const event_id = generateEventId();
        const currency = headersetting?.code || 'BDT';

        const items = {
            id: product.SKU || '',
            item_id: product.SKU || '',
            item_name: product.name || '',
            currency: headersetting?.code,
            price: parseFloat(product.regular_price) || 0,
            item_brand: product.brand || '',
            google_business_vertical: 'retail',
            discount: parseFloat(product.discount_price) || 0,
            item_category: product.category || 'General',
            item_category2: product.subcategory || 'General',
            item_variant: product.slug || 'default',
            quantity: parseInt(product.quantity, 10) || 1,
            tax_rate: parseFloat(product.tax_rate) || 0,
            shipping_fee: parseFloat(product.shipping_fee) || 0,
        };

        const contents = [
            {
                id: product?.id,
                item_price: numberParser(product.regular_price) || 0,
                quantity: product.quantity,
            },
        ];

        sendGTMEvent({
            event: 'view_item',
            pageType: 'product-page',
            productType: 'simple',
            ecommerce: {
                items: [items],
            },
            value: parseFloat(product.regular_price) || 0,
            currency,
            event_id,
        });

        const content_ids = product?.id; // Assuming `product.id` is the content ID
        const content_type = 'product'; // Example value, replace with the actual content type
        const content_name = product?.name; // Assuming `product.name` is the content name
        const content_category = product?.category; // Assuming `product.category` is the content category
        const value = product?.regular_price - product?.discount_price; // Assuming `product.price` is the value
        const sku = product?.SKU;

        ViewContent(
            content_ids,
            content_type,
            content_name,
            content_category,
            value,
            currency,
            sku
        );

        // Send data to Facebook Conversion API
        await sendConversionApiEvent('ViewContent', {
            event_id, // Use the same event_id
            custom_data: {
                value: numberParser(product.regular_price) || 0,
                currency: currency || 'BDT',
                contents,
            },
        });
    }, [product, headersetting]);

    useEffect(() => {
        sendViewContentEvent();
    }, [sendViewContentEvent]);

    return null;
};

export default ViewContentGtm;

// PageView
export const PageView = (eventId?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView', {}, { eventID: eventId });
    } else {
        console.warn('Facebook Pixel (fbq) is not initialized.');
    }
};

// Purchase with deduplication
export const Purchase = (value: any, currency: any, eventId: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
            'track',
            'Purchase',
            { value, currency },
            { eventID: eventId }
        );
    } else {
        console.warn('Facebook Pixel (fbq) is not initialized.');
    }
};

// AddToCart with deduplication
export const AddToCart = (item: any, eventId: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'AddToCart', { item }, { eventID: eventId });
    } else {
        console.warn('Facebook Pixel (fbq) is not initialized.');
    }
};

// Checkout with deduplication
export const Checkout = (
    price: any,
    sku: any,
    currency: any,
    eventId: string
) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
            'track',
            'Checkout',
            { price, sku, currency },
            { eventID: eventId }
        );
    } else {
        console.warn('Facebook Pixel (fbq) is not initialized.');
    }
};

// ViewContent
export const ViewContent = (
    content_ids: any,
    content_type: any,
    content_name: any,
    content_category: any,
    value: any,
    currency: any,
    sku: any,
    eventId: string
) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
            'track',
            'ViewContent',
            {
                content_ids,
                content_type,
                content_name,
                content_category,
                value,
                currency,
                sku,
            },
            { eventID: eventId }
        );
    } else {
        console.warn('Facebook Pixel (fbq) is not initialized.');
    }
};

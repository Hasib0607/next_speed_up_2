'use client';

import dynamic from 'next/dynamic';

export const card_pop_up_pages: any = {
    default: dynamic(
        () => import('@/components/_shopping-cart/cart-popup-three'),
        { ssr: false }
    ),
    one: dynamic(() => import("@/components/_shopping-cart/six/cart-popup-six")),
    two: dynamic(() => import("@/components/_shopping-cart/cart-popup-four")),
    three: dynamic(
        () => import('@/components/_shopping-cart/cart-popup-three'),
        { ssr: false }
    ),
    four: dynamic(() => import("@/components/_shopping-cart/cart-popup-four")),
    five: dynamic(() => import("@/components/_shopping-cart/cart-popup-five")),
};

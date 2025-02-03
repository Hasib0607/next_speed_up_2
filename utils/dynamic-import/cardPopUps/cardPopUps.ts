'use client';

import dynamic from 'next/dynamic';

export const card_pop_up_pages: any = {
    default: dynamic(
        () => import('@/components/_shopping-cart/three/cart-popup-three'),
        { ssr: false }
    ),
    // one: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three)),
    // two: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three")),
    three: dynamic(
        () => import('@/components/_shopping-cart/three/cart-popup-three'),
        { ssr: false }
    ),
    // four: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three)),
    // five: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three")),
};

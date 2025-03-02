import dynamic from 'next/dynamic';

export const card_pop_up_pages: any = {
    default: dynamic(
        () => import('@/components/_shopping-cart/three/cart-popup-three')
    ),
    one: dynamic(() => import("@/components/_shopping-cart/six/cart-popup-six")),
    // two: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three")),
    three: dynamic(
        () => import('@/components/_shopping-cart/three/cart-popup-three')
    ),
    // four: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three)),
    // five: dynamic(() => import("@/components/_shopping-cart/three/cart-popup-three")),
};

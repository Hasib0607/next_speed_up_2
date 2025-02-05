import dynamic from 'next/dynamic';

export const best_sell_products: any = {
    default: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-seven')
    ),
    four: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-five')
    ),
    five: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-five')
    ),
    six: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-six')
    ),
    seven: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-seven')
    ),
    eight: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-eight')
    ),
    nine: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-nine')
    ),
    ten: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-ten')
    ),
    eleven: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-ten')
    ),
    twelve: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-ten')
    ),
    thirteen: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-thirteen')
    ),
    sixteen: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-sixteen')
    ),
    seventeen: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-seventeen')
    ),
    nineteen: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-nineteen')
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-twentyone')
    ),
    twentytwo: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-twentytwo')
    ),
    twentythree: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentythree')
    ),
    twentyfour: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentyfour')
    ),
    twentyfive: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentyfive')
    ),
    twentysix: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-twentysix')
    ),
    twentyseven: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentyseven')
    ),
    twentyeight: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentyeight')
    ),
    twentynine: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-twentynine')
    ),
    thirty: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-thirty')
    ),
    thirtyone: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-thirty')
    ),
    thirtythree: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thirtythree')
    ),
    thirtyfour: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thirtyfour')
    ),
    thirtyfive: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thirtyfive')
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-thirtysix')
    ),
    thirtyseven: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thirtyseven')
    ),
    thirtyeight: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thirtyeight')
    ),
    thirtynine: dynamic(
        () =>
            import('@/components/_homepage/best-seller/best-seller-thritynine')
    ),
};

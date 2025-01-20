import dynamic from 'next/dynamic';

export const all_products: any = {
    default: dynamic(
        () => import('@/components/_homepage/product/product-default')
    ),
    one: dynamic(
        () => import('@/components/_homepage/product/product-one')
    ),
    two: dynamic(
        () => import('@/components/_homepage/product/product-two')
    ),
    three: dynamic(
        () => import('@/components/_homepage/product/product-three')
    ),
    four: dynamic(
        () => import('@/components/_homepage/product/product-four')
    ),
    five: dynamic(
        () => import('@/components/_homepage/product/product-five')
    ),
    seven: dynamic(
        () => import('@/components/_homepage/product/product-twenty')
    ),
    ten: dynamic(
        () => import('@/components/_homepage/product/product-five')
    ),
    eleven: dynamic(
        () => import('@/components/_homepage/product/product-eleven')
    ),
    fourteen: dynamic(
        () => import('@/components/_homepage/product/product-fourteen')
    ),
    sixteen: dynamic(
        () => import('@/components/_homepage/product/product-sixteen')
    ),
    seventeen: dynamic(
        () => import('@/components/_homepage/product/product-seventeen')
    ),
    nineteen: dynamic(
        () => import('@/components/_homepage/product/product-nineteen')
    ),
    twenty: dynamic(
        () => import('@/components/_homepage/product/product-twenty')
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/product/product-twentyone')
    ),
    twentyfour: dynamic(
        () => import('@/components/_homepage/product/product-twentyfour')
    ),
    twentyseven: dynamic(
        () => import('@/components/_homepage/product/product-twentyseven')
    ),
    // twentyeight: dynamic(
    //     () => import('@/components/_homepage/product/product-twentyeight')
    // ),
    // twentynine: dynamic(
    //     () => import('@/components/_homepage/product/product-twentynine')
    // ),
    // thirty: dynamic(
    //     () => import('@/components/_homepage/product/product-thirty')
    // ),
    // thirtyone: dynamic(
    //     () => import('@/components/_homepage/product/product-thirty')
    // ),
    thirtythree: dynamic(
        () => import('@/components/_homepage/product/product-thirtythree')
    ),
    thirtyfour: dynamic(
        () => import('@/components/_homepage/product/product-thirtyfour')
    ),
    thirtyfive: dynamic(
        () => import('@/components/_homepage/product/product-thirtyfive')
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/product/product-thirtysix')
    ),
    thirtyseven: dynamic(
        () => import('@/components/_homepage/product/product-thirtyseven')
    ),
    // thirtyeight: dynamic(
    //     () => import('@/components/_homepage/product/product-thirtyeight')
    // ),
    // thirtynine: dynamic(
    //     () => import('@/components/_homepage/product/product-thirtynine')
    // ),
    // fortyone: dynamic(
    //     () => import('@/components/_homepage/product/product-fortyone')
    // ),

};

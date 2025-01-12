'use client';

import dynamic from 'next/dynamic';

export const banners: any = {
    default: dynamic(() => import('@/components/_homepage/promotions/promo-default'), {
        ssr: false,
    }),
    one: dynamic(() => import('@/components/_homepage/promotions/promo-one'), {
        ssr: false,
    }),
    two: dynamic(() => import('@/components/_homepage/promotions/promo-two'), {
        ssr: false,
    }),
    three: dynamic(() => import('@/components/_homepage/promotions/promo-three'), {
        ssr: false,
    }),
    four: dynamic(() => import('@/components/_homepage/promotions/promo-four'), {
        ssr: false,
    }),
    five: dynamic(() => import('@/components/_homepage/promotions/promo-five'), {
        ssr: false,
    }),
    six: dynamic(() => import('@/components/_homepage/promotions/promo-six'), {
        ssr: false,
    }),
    seven: dynamic(() => import('@/components/_homepage/promotions/promo-seven'), {
        ssr: false,
    }),
    eight: dynamic(() => import('@/components/_homepage/promotions/promo-eight'), {
        ssr: false,
    }),
    nine: dynamic(() => import('@/components/_homepage/promotions/promo-nine'), {
        ssr: false,
    }),
    ten: dynamic(() => import('@/components/_homepage/promotions/promo-ten'), {
        ssr: false,
    }),
    eleven: dynamic(() => import('@/components/_homepage/promotions/promo-eleven'), {
        ssr: false,
    }),
    twelve: dynamic(() => import('@/components/_homepage/promotions/promo-twelve'), {
        ssr: false,
    }),
    thirteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirteen'),
        {
            ssr: false,
        }
    ),
    fourteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-fourteen'),
        {
            ssr: false,
        }
    ),
    sixteen: dynamic(() => import('@/components/_homepage/promotions/promo-sixteen'), {
        ssr: false,
    }),
    // seventeen: dynamic(
    //     () => import('@/components/_homepage/promotions/promo-seventeen'),
    //     {
    //         ssr: false,
    //     }
    // ),
    eighteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-eighteen'),
        {
            ssr: false,
        }
    ),
    nineteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-nineteen'),
        {
            ssr: false,
        }
    ),
    twenty: dynamic(
        () => import('@/components/_homepage/promotions/promo-twenty'),
        { ssr: false }
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/promotions/promo-tweentyone'),
        { ssr: false }
    ),
    // twentytwo: dynamic(
    //     () => import('@/components/_homepage/promotions/promo-tweentytwo'),
    //     { ssr: false }
    // ),
    twentythree: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentythree'),
        { ssr: false }
    ),
    twentyfour: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyfour'),
        { ssr: false }
    ),
    twentyfive: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyfive'),
        { ssr: false }
    ),
    twentysix: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentysix'),
        { ssr: false }
    ),
    twentyseven: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyseven'),
        { ssr: false }
    ),
    twentyeight: dynamic(
        () => import('@/components/_homepage/promotions/promo-twenty-eight'),
        { ssr: false }
    ),
    twentynine: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentynine'),
        { ssr: false }
    ),
    thirty: dynamic(() => import('@/components/_homepage/promotions/promo-thirty'), {
        ssr: false,
    }),
    thirtyone: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyone'),
        { ssr: false }
    ),
    // thirtytwo: dynamic(
    //     () => import('@/components/_homepage/promotions/promo-thirtytwo'),
    //     { ssr: false }
    // ),
    thirtythree: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtythree'),
        { ssr: false }
    ),
    thirtyfour: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyfour'),
        { ssr: false }
    ),
    thirtyfive: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyfive'),
        { ssr: false }
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtysix'),
        { ssr: false }
    ),
    thirtyseven: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyseven'),
        { ssr: false }
    ),
    thirtyeight: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyeight'),
        { ssr: false }
    ),
    thirtynine: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtynine'),
        { ssr: false }
    ),
};
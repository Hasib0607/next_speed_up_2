'use client';

import dynamic from 'next/dynamic';

export const banner_bottoms: any = {
    default: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-default'
            ),
        {
            ssr: false,
        }
    ),
    one: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-one'),
        {
            ssr: false,
        }
    ),
    two: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-two'),
        {
            ssr: false,
        }
    ),
    three: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-three'
            ),
        {
            ssr: false,
        }
    ),
    four: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-four'
            ),
        {
            ssr: false,
        }
    ),
    six: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-six'),
        {
            ssr: false,
        }
    ),
    seven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-seven'
            ),
        {
            ssr: false,
        }
    ),
    eight: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-eight'
            ),
        {
            ssr: false,
        }
    ),
    nine: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-nine'
            ),
        {
            ssr: false,
        }
    ),
    ten: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-ten'),
        {
            ssr: false,
        }
    ),
    eleven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-eleven'
            ),
        {
            ssr: false,
        }
    ),
    twelve: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twelve'
            ),
        {
            ssr: false,
        }
    ),
    thirteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirteen'
            ),
        {
            ssr: false,
        }
    ),
    fourteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-fourteen'
            ),
        {
            ssr: false,
        }
    ),
    sixteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-sixteen'
            ),
        {
            ssr: false,
        }
    ),
    nineteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-nineteen'
            ),
        {
            ssr: false,
        }
    ),
    twenty: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twenty'
            ),
        { ssr: false }
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/promotions-bottom/promo-twentyone'),
        { ssr: false }
    ),
    twentytwo: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentytwo'
            ),
        { ssr: false }
    ),
    twentythree: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentythree'
            ),
        { ssr: false }
    ),
    twentyfour: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyfour'
            ),
        { ssr: false }
    ),
    twentysix: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentysix'
            ),
        { ssr: false }
    ),
    twentyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyseven'
            ),
        { ssr: false }
    ),
    twentyeight: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyeight'
            ),
        { ssr: false }
    ),
    twentynine: dynamic(
        () => import('@/components/_homepage/promotions-bottom/promo-bottom-twentyseven'),
        { ssr: false }
    ),
    thirty: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirty'
            ),
        {
            ssr: false,
        }
    ),
    thirtyone: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyone'
            ),
        { ssr: false }
    ),
    thirtytwo: dynamic(
        () => import('@/components/_homepage/promotions-bottom/promo-bottom-thirtyone'),
        { ssr: false }
    ),
    thirtythree: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtythree'
            ),
        { ssr: false }
    ),
    thirtyfour: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyfour'
            ),
        { ssr: false }
    ),
    thirtyfive: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyfive'
            ),
        { ssr: false }
    ),
    thirtysix: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtysix'
            ),
        { ssr: false }
    ),
    thirtyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyseven'
            ),
        { ssr: false }
    ),
    thirtynine: dynamic(
        () => import('@/components/_homepage/promotions-bottom/promo-bottom-thirtyseven'),
        { ssr: false }
    ),
};

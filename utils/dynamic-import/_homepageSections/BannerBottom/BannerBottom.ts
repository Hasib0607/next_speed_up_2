import dynamic from 'next/dynamic';

export const banner_bottoms: any = {
    default: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-default'
            )
    ),
    one: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-one')
    ),
    two: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-two')
    ),
    three: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-three'
            )
    ),
    four: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-four')
    ),
    six: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-six')
    ),
    seven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-seven'
            )
    ),
    eight: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-eight'
            )
    ),
    nine: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-nine')
    ),
    ten: dynamic(
        () =>
            import('@/components/_homepage/promotions-bottom/promo-bottom-ten')
    ),
    eleven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-eleven'
            )
    ),
    twelve: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twelve'
            )
    ),
    thirteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirteen'
            )
    ),
    fourteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-fourteen'
            )
    ),
    sixteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-sixteen'
            )
    ),
    nineteen: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-nineteen'
            )
    ),
    twenty: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twenty'
            )
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/promotions-bottom/promo-twentyone')
    ),
    twentytwo: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentytwo'
            )
    ),
    twentythree: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentythree'
            )
    ),
    twentyfour: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyfour'
            )
    ),
    twentysix: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentysix'
            )
    ),
    twentyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyseven'
            )
    ),
    twentyeight: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyeight'
            )
    ),
    twentynine: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-twentyseven'
            )
    ),
    thirty: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirty'
            )
    ),
    thirtyone: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyone'
            )
    ),
    thirtytwo: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyone'
            )
    ),
    thirtythree: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtythree'
            )
    ),
    thirtyfour: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyfour'
            )
    ),
    thirtyfive: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyfive'
            )
    ),
    thirtysix: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtysix'
            )
    ),
    thirtyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyseven'
            )
    ),
    thirtynine: dynamic(
        () =>
            import(
                '@/components/_homepage/promotions-bottom/promo-bottom-thirtyseven'
            )
    ),
};

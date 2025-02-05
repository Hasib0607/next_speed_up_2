import dynamic from 'next/dynamic';

export const feature_categories: any = {
    default: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featured-default')
    ),
    one: dynamic(
        () => import('@/components/_homepage/featured-category/featuredcat-one')
    ),
    two: dynamic(
        () => import('@/components/_homepage/featured-category/featuredcat-two')
    ),
    three: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featuredcat-three')
    ),
    four: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featuredcat-four')
    ),
    six: dynamic(
        () => import('@/components/_homepage/featured-category/featuredcat-six')
    ),
    seven: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featuredcat-seven')
    ),
    eight: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featurecat-eight')
    ),
    eleven: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-eleven'
            )
    ),
    twelve: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twelve'
            )
    ),
    sixteen: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-sixteen'
            )
    ),
    seventeen: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-seventeen'
            )
    ),
    eighteen: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-eighteen'
            )
    ),
    nineteen: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-nineteen'
            )
    ),
    twenty: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twenty'
            )
    ),
    // twentyone: dynamic(
    //     () =>
    //         import('@/components/_homepage/featured-category/featuredcat-twentyone')
    // ),
    twentythree: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twentythree'
            )
    ),
    twentyfive: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twentyfive'
            )
    ),
    twentyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twentyseven'
            )
    ),
    twentyeight: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-twenty-eight'
            )
    ),
    thirty: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirty'
            )
    ),
    thirtyone: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featured-thirtyone'
            )
    ),
    thirtythree: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtythree'
            )
    ),
    thirtyfive: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtyfive'
            )
    ),
    thirtysix: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtysix'
            )
    ),
    thirtyseven: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtyseven'
            )
    ),
    thirtyeight: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtyeight'
            )
    ),
    thirtynine: dynamic(
        () =>
            import(
                '@/components/_homepage/featured-category/featuredcat-thirtynine'
            )
    ),
    forty: dynamic(
        () => import('@/components/_homepage/featured-category/featured-forty')
    ),
};

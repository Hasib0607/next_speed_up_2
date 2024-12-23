'use client';

import dynamic from 'next/dynamic';

export const product_details_pages: any = {
    default: dynamic(
        () => import('@/components/_product-details-page/three/three'),
        { ssr: false }
    ),
    // one: dynamic(() => import("@/components/headers/header-one/header-one")),
    // two: dynamic(() => import("@/components/headers/header-two/header-two")),
    three: dynamic(
        () => import('@/components/_product-details-page/three/three'),
        { ssr: false }
    ),
    // four: dynamic(() => import("@/components/headers/header-four/header-four")),
    // five: dynamic(() => import("@/components/headers/header-five/header-five")),
    // six: dynamic(() => import("@/components/headers/header-six/header-six")),
    seven: dynamic(
        () => import('@/components/_product-details-page/three/three'),
        { ssr: false }
    ),
    // eight: dynamic(
    //   () => import("@/components/headers/header-eight/header-eight")
    // ),
    // nine: dynamic(() => import("@/components/headers/header-nine/header-nine")),
    // ten: dynamic(() => import("@/components/headers/header-ten/header-ten")),
    // eleven: dynamic(
    //   () => import("@/components/headers/header-eleven/header-eleven")
    // ),
    // twelve: dynamic(
    //   () => import("@/components/headers/header-twelve/header-twelve")
    // ),
    // thirteen: dynamic(
    //   () => import("@/components/headers/header-thirteen/header-thirteen")
    // ),
    // fourteen: dynamic(
    //   () => import("@/components/headers/header-fourteen/header-fourteen")
    // ),
    // fifteen: dynamic(
    //   () => import("@/components/headers/header-fifteen/header-fifteen")
    // ),
    // sixteen: dynamic(
    //   () => import("@/components/headers/header-sixteen/header-sixteen")
    // ),
    // seventeen: dynamic(
    //   () => import("@/components/headers/header-seventeen/header-seventeen")
    // ),
    // eighteen: dynamic(
    //   () => import("@/components/headers/header-eighteen/header-eighteen")
    // ),
    // nineteen: dynamic(
    //   () => import("@/components/headers/header-nineteen/header-nineteen")
    // ),
    // twenty: dynamic(
    //   () => import("@/components/headers/header-twenty/header-twenty")
    // ),
    // twentyone: dynamic(
    //   () => import("@/components/headers/header-twentyone/header-twentyone")
    // ),
    // twentytwo: dynamic(
    //   () => import("@/components/headers/header-twentytwo/header-twentytwo")
    // ),
    // twentythree: dynamic(
    //   () => import("@/components/headers/header-twentythree/header-twentythree")
    // ),
    // twentyfour: dynamic(
    //   () => import("@/components/headers/header-twentyfour/header-twentyfour")
    // ),
    // twentyfive: dynamic(
    //   () => import("@/components/headers/header-twentyfive/header-twentyfive")
    // ),
    // twentysix: dynamic(
    //   () => import("@/components/headers/header-twentysix/header-twentysix")
    // ),
    // twentyseven: dynamic(
    //   () => import("@/components/headers/header-twentyseven/header-twentyseven")
    // ),
    // twentyeight: dynamic(
    //   () => import("@/components/headers/header-twentyeight/header-twentyeight")
    // ),
    // twentynine: dynamic(
    //   () => import("@/components/headers/header-twentynine/header-twentynine")
    // ),
    // thirty: dynamic(
    //   () => import("@/components/headers/header-thirty/header-thirty")
    // ),
    // thirtyone: dynamic(
    //   () => import("@/components/headers/header-thirtyone/header-thirtyone")
    // ),
    // thirtythree: dynamic(
    //   () => import("@/components/headers/header-thirtythree/header-thirtythree")
    // ),
    // thirtyfour: dynamic(
    //   () => import("@/components/headers/header-thirtyfour/header-thirtyfour")
    // ),
    // thirtyfive: dynamic(
    //   () => import("@/components/headers/header-thirtyfive/header-thirtyfive")
    // ),
    // thirtysix: dynamic(
    //   () => import("@/components/headers/header-thirtysix/header-thirtysix")
    // ),
    // thirtyseven: dynamic(
    //   () => import("@/components/headers/header-thirtyseven/header-thirtyseven")
    // ),
    // thirtyeight: dynamic(
    //   () => import("@/components/headers/header-thirtyeight/header-thirtyeight")
    // ),
    // thirtynine: dynamic(
    //   () => import("@/components/headers/header-thirtynine/header-thirtynine")
    // ),
    // forty: dynamic(
    //   () => import("@/components/headers/header-forty/header-forty")
    // ),
};

// Lazy load components
// const componentsMap: any = {
//     one: lazy(
//         () =>
//             import('@/components/_product-details-page/product-details/one/one')
//     ),
//     two: lazy(
//         () =>
//             import('@/components/_product-details-page/product-details/two/two')
//     ),
//     three: lazy(() => import('@/components/_product-details-page/three/three')),
//     four: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/four/four'
//             )
//     ),
//     five: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/five/five'
//             )
//     ),
//     six: lazy(
//         () =>
//             import('@/components/_product-details-page/product-details/six/six')
//     ),
//     seven: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/seven/seven'
//             )
//     ),
//     eight: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/eight/eight'
//             )
//     ),
//     nine: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/nine/nine'
//             )
//     ),
//     ten: lazy(
//         () =>
//             import('@/components/_product-details-page/product-details/ten/ten')
//     ),
//     eleven: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/eleven/eleven'
//             )
//     ),
//     twelve: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twelve/twelve'
//             )
//     ),
//     thirteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirteen/thirteen'
//             )
//     ),
//     fourteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/fourteen/fourteen'
//             )
//     ),
//     fifteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/fifteen/fifteen'
//             )
//     ),
//     sixteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/sixteen/sixteen'
//             )
//     ),
//     seventeen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/seventeen/seventeen'
//             )
//     ),
//     eighteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/eighteen/eighteen'
//             )
//     ),
//     nineteen: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/nineteen/nineteen'
//             )
//     ),
//     twenty: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty/twenty'
//             )
//     ),
//     twentyone: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-one/twenty-one'
//             )
//     ),
//     twentytwo: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-two/twentytwo'
//             )
//     ),

//     // gtm here
//     twentythree: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-three/twentythree'
//             )
//     ),
//     twentyfour: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-four/twenty-four'
//             )
//     ),
//     twentyfive: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-five/twenty-five'
//             )
//     ),
//     twentysix: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-six/twenty-six'
//             )
//     ),
//     twentyseven: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-seven/twenty-seven'
//             )
//     ),
//     twentyeight: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-eight/twenty-eight'
//             )
//     ),
//     twentynine: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/twenty-nine/twenty-nine'
//             )
//     ),

//     // gtm start here
//     thirty: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty/thirty'
//             )
//     ),
//     thirtyone: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty/thirty'
//             )
//     ),
//     thirtythree: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-three/thirty-three'
//             )
//     ),
//     thirtyfour: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-four/thirty-four'
//             )
//     ),

//     // start from here image variant
//     thirtyfive: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-five/thirty-five'
//             )
//     ),
//     thirtysix: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-six/thirty-six'
//             )
//     ),
//     thirtyseven: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-seven/thirty-seven'
//             )
//     ),
//     thirtyeight: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-eight/thirty-eight'
//             )
//     ),
//     thirtynine: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/thirty-nine/thirty-nine'
//             )
//     ),
//     forty: lazy(
//         () =>
//             import(
//                 '@/components/_product-details-page/product-details/forty/forty'
//             )
//     ),
// };

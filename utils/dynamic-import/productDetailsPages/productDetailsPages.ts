import { FORTY_TWO } from '@/consts';
import dynamic from 'next/dynamic';

export const product_details_pages: any = {
    default: dynamic(
        () => import('@/components/_product-details-page/three/three')
    ),
    one: dynamic(() => import('@/components/_product-details-page/one/one')),
    two: dynamic(() => import('@/components/_product-details-page/two/two')),
    three: dynamic(
        () => import('@/components/_product-details-page/three/three')
    ),
    four: dynamic(() => import('@/components/_product-details-page/four/four')),
    five: dynamic(() => import('@/components/_product-details-page/five/five')),
    six: dynamic(() => import('@/components/_product-details-page/six/six')),
    seven: dynamic(
        () => import('@/components/_product-details-page/seven/seven')
    ),
    eight: dynamic(
        () => import('@/components/_product-details-page/eight/eight')
    ),
    nine: dynamic(() => import('@/components/_product-details-page/nine/nine')),
    ten: dynamic(() => import('@/components/_product-details-page/ten/ten')),
    eleven: dynamic(
        () => import('@/components/_product-details-page/eleven/eleven')
    ),
    twelve: dynamic(
        () => import('@/components/_product-details-page/twelve/twelve')
    ),
    thirteen: dynamic(
        () => import('@/components/_product-details-page/thirteen/thirteen')
    ),
    fourteen: dynamic(
        () => import('@/components/_product-details-page/fourteen/fourteen')
    ),
    // fifteen: dynamic(
    //   () => import("@/components/_product-details-page/fifteen/fifteen")
    // ),
    sixteen: dynamic(
        () => import('@/components/_product-details-page/sixteen/sixteen')
    ),
    seventeen: dynamic(
        () => import('@/components/_product-details-page/seventeen/seventeen')
    ),
    eighteen: dynamic(
        () => import('@/components/_product-details-page/eighteen/eighteen')
    ),
    nineteen: dynamic(
        () => import('@/components/_product-details-page/nineteen/nineteen')
    ),
    twenty: dynamic(
        () => import('@/components/_product-details-page/twenty/twenty')
    ),
    twentyone: dynamic(
        () => import('@/components/_product-details-page/twenty-one/twenty-one')
    ),
    twentytwo: dynamic(
        () => import('@/components/_product-details-page/twenty-two/twentytwo')
    ),
    twentythree: dynamic(
        () =>
            import(
                '@/components/_product-details-page/twenty-three/twentythree'
            )
    ),
    twentyfour: dynamic(
        () =>
            import('@/components/_product-details-page/twenty-four/twenty-four')
    ),
    twentyfive: dynamic(
        () =>
            import('@/components/_product-details-page/twenty-five/twenty-five')
    ),
    twentysix: dynamic(
        () => import('@/components/_product-details-page/twenty-six/twenty-six')
    ),
    twentyseven: dynamic(
        () =>
            import(
                '@/components/_product-details-page/twenty-seven/twenty-seven'
            )
    ),
    twentyeight: dynamic(
        () =>
            import(
                '@/components/_product-details-page/twenty-eight/twenty-eight'
            )
    ),
    twentynine: dynamic(
        () =>
            import('@/components/_product-details-page/twenty-nine/twenty-nine')
    ),
    thirty: dynamic(
        () => import('@/components/_product-details-page/thirty/thirty')
    ),
    thirtyone: dynamic(
        () => import('@/components/_product-details-page/thirty/thirty')
    ),
    // thirtytwo: dynamic(
    //   () => import("@/components/_product-details-page/thirty/thirty-two")
    // ),
    thirtythree: dynamic(
        () =>
            import(
                '@/components/_product-details-page/thirty-three/thirty-three'
            )
    ),
    thirtyfour: dynamic(
        () =>
            import('@/components/_product-details-page/thirty-four/thirty-four')
    ),
    thirtyfive: dynamic(
        () =>
            import('@/components/_product-details-page/thirty-five/thirty-five')
    ),
    thirtysix: dynamic(
        () => import('@/components/_product-details-page/thirty-six/thirty-six')
    ),
    thirtyseven: dynamic(
        () =>
            import(
                '@/components/_product-details-page/thirty-seven/thirty-seven'
            )
    ),
    thirtyeight: dynamic(
        () =>
            import(
                '@/components/_product-details-page/thirty-eight/thirty-eight'
            )
    ),
    thirtynine: dynamic(
        () =>
            import('@/components/_product-details-page/thirty-nine/thirty-nine')
    ),
    forty: dynamic(
        () => import('@/components/_product-details-page/forty/forty')
    ),
    fortyone: dynamic(
        () => import('@/components/_product-details-page/forty-one/forty-one')
    ),
    [FORTY_TWO]: dynamic(
        () => import('@/components/_product-details-page/forty-two/forty-two')
    ),
<<<<<<< HEAD
    fortythree: dynamic(
        () => import('@/components/_product-details-page/forty-three/forty-three')
    ),
=======
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
};

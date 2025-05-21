import { FORTY_FIVE, FORTY_FOUR, FORTY_SEVEN, FORTY_SIX, FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const shops: any = {
    default: dynamic(() => import('@/components/_shop-page/one/one')),
    one: dynamic(() => import('@/components/_shop-page/one/one')),
    two: dynamic(() => import('@/components/_shop-page/two/two')),
    three: dynamic(() => import('@/components/_shop-page/three/three')),
    four: dynamic(() => import('@/components/_shop-page/four/four')),
    five: dynamic(() => import('@/components/_shop-page/five/five')),
    // six: dynamic(() => import("@/components/_shop-page/six/six")),
    seven: dynamic(() => import('@/components/_shop-page/seven/seven')),
    eight: dynamic(() => import('@/components/_shop-page/eight/eight')),
    nine: dynamic(() => import('@/components/_shop-page/nine/nine')),
    ten: dynamic(() => import('@/components/_shop-page/ten/ten')),
    eleven: dynamic(() => import('@/components/_shop-page/eight/eight')),
    twelve: dynamic(() => import('@/components/_shop-page/twelve/twelve')),
    thirteen: dynamic(
        () => import('@/components/_shop-page/thirteen/thirteen')
    ),
    fourteen: dynamic(
        () => import('@/components/_shop-page/fourteen/fourteen')
    ),
    sixteen: dynamic(() => import('@/components/_shop-page/sixteen/sixteen')),
    seventeen: dynamic(
        () => import('@/components/_shop-page/seventeen/seventeen')
    ),
    eighteen: dynamic(
        () => import('@/components/_shop-page/eighteen/eighteen')
    ),
    nineteen: dynamic(
        () => import('@/components/_shop-page/nineteen/nineteen')
    ),
    twenty: dynamic(() => import('@/components/_shop-page/twenty/twenty')),
    twentyone: dynamic(
        () => import('@/components/_shop-page/twenty-one/twenty-one')
    ),
    twentytwo: dynamic(
        () => import('@/components/_shop-page/twentytwo/twenty-two')
    ),
    twentythree: dynamic(
        () => import('@/components/_shop-page/twenty-three/twenty-three')
    ),
    twentyfour: dynamic(
        () => import('@/components/_shop-page/twenty-four/twenty-four')
    ),
    twentyfive: dynamic(
        () => import('@/components/_shop-page/twenty-five/twenty-five')
    ),
    twentysix: dynamic(
        () => import('@/components/_shop-page/twenty-six/twenty-six')
    ),
    // twentyseven: dynamic(
    //   () => import("@/components/headers/header-twentyseven/header-twentyseven")
    // ),
    twentyeight: dynamic(
        () => import("@/components/_shop-page/twenty-eight/twenty-eight")
    ),
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
    thirtynine: dynamic(
        () => import("@/components/_shop-page/thirty-nine/thirty-nine")
    ),
    // forty: dynamic(
    //   () => import("@/components/headers/header-forty/header-forty")
    // ),
    [FORTY_THREE]: dynamic(
        () => import("@/components/_shop-page/forty-three/forty-three")
    ),
    [FORTY_FOUR]: dynamic(
        () => import("@/components/_shop-page/forty-four/forty-four")
    ),
    [FORTY_FIVE]: dynamic(
        () => import("@/components/_shop-page/forty-five/forty-five")
    ),
    [FORTY_SIX]: dynamic(
        () => import("@/components/_shop-page/forty-six/forty-six")
    ),
    [FORTY_SEVEN]: dynamic(
        () => import("@/components/_shop-page/forty-seven/forty-seven")
    ),
};

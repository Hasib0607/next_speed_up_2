'use client';

import dynamic from 'next/dynamic';

export const shops: any = {
    default: dynamic(
        () => import('@/components/_shop-page/seven/seven'),
        { ssr: false }
    ),
    // one: dynamic(() => import("@/components/headers/header-one/header-one")),
    // two: dynamic(() => import("@/components/headers/header-two/header-two")),
    three: dynamic(
        () => import('@/components/_shop-page/seven/seven'),
        { ssr: false }
    ),
    // four: dynamic(() => import("@/components/headers/header-four/header-four")),
    // five: dynamic(() => import("@/components/headers/header-five/header-five")),
    // six: dynamic(() => import("@/components/headers/header-six/header-six")),
    seven: dynamic(
        () => import('@/components/_shop-page/seven/seven'),
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


// import Eight from "./_shop-page/shops/eight/eight";
// import Eighteen from "./_shop-page/shops/eighteen/eighteen";
// import Five from "./_shop-page/shops/five/five";
// import Forty from "./_shop-page/shops/forty/forty";
// import Four from "./_shop-page/shops/four/four";
// import Fourteen from "./_shop-page/shops/fourteen/fourteen";
// import Nine from "./_shop-page/shops/nine/nine";
// import Nineteen from "./_shop-page/shops/nineteen/nineteen";
// import One from "./_shop-page/shops/one/one";
// import Seven from "./_shop-page/shops/seven/seven";
// import Seventeen from "./_shop-page/shops/seventeen/seventeen";
// import Six from "./_shop-page/shops/six/six";
// import Sixteen from "./_shop-page/shops/sixteen/sixteen";
// import Ten from "./_shop-page/shops/ten/ten";
// import Thirteen from "./_shop-page/shops/thirteen/thirteen";
// import ThirtyEight from "./_shop-page/shops/thirty-eight/thirty-eight";
// import ThirtyFive from "./_shop-page/shops/thirty-five/thirty-five";
// import ThirtyFour from "./_shop-page/shops/thirty-four/thirty-four";
// import ThirtyNine from "./_shop-page/shops/thirty-nine/thirty-nine";
// up sesh
// import ThirtySeven from "./_shop-page/shops/thirty-seven/thirty-seven";
// import ThirtySix from "./_shop-page/shops/thirty-six/thirty-six";
// import ThirtyThree from "./_shop-page/shops/thirty-three/thirty-three";
// import Thirty from "./_shop-page/shops/thirty/thirty";
// import Three from "./_shop-page/shops/three/three";
// import Twelve from "./_shop-page/shops/twelve/twelve";
// import TwentyEight from "./_shop-page/shops/twenty-eight/twenty-eight";
// import TwentyFive from "./_shop-page/shops/twenty-five/twenty-five";
// import TwentyFour from "./_shop-page/shops/twenty-four/twenty-four";
// import TwentyNine from "./_shop-page/shops/twenty-nine/twenty-nine";
// import TwentyOne from "./_shop-page/shops/twenty-one/twenty-one";
// import TwentySeven from "./_shop-page/shops/twenty-seven/twenty-seven";
// import TwentySix from "./_shop-page/shops/twenty-six/twenty-six";
// import TwentyThree from "./_shop-page/shops/twenty-three/twenty-three";
// import Twenty from "./_shop-page/shops/twenty/twenty";
// import Twentytwo from "./_shop-page/shops/twentytwo/twenty-two";
// import Two from "./_shop-page/shops/two/two";
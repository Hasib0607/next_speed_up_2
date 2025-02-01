'use client';

import dynamic from 'next/dynamic';

export const shops: any = {
    default: dynamic(() => import('@/components/_shop-page/one/one'), {
        ssr: false,
    }),
    // one: dynamic(() => import('@/components/_shop-page/one/one')),
    two: dynamic(() => import('@/components/_shop-page/two/two')),
    three: dynamic(() => import('@/components/_shop-page/three/three'), {
        ssr: false,
    }),
    four: dynamic(() => import('@/components/_shop-page/four/four')),
    five: dynamic(() => import('@/components/_shop-page/five/five')),
    // six: dynamic(() => import("@/components/_shop-page/six/six")),
    seven: dynamic(() => import('@/components/_shop-page/seven/seven'), {
        ssr: false,
    }),
    eight: dynamic(
      () => import("@/components/_shop-page/eight/eight"),
      {ssr: false}
    ),
    nine: dynamic(
      () => import("@/components/_shop-page/nine/nine"),
      {ssr: false}
    ),
    ten: dynamic(
      () => import("@/components/_shop-page/ten/ten"),
      {ssr: false}
    ),
    eleven: dynamic(
        () => import("@/components/_shop-page/eight/eight"),
        {ssr: false}
    ),
    twelve: dynamic(
        () => import("@/components/_shop-page/twelve/twelve"),
        {ssr: false}
    ),
    thirteen: dynamic(
        () => import("@/components/_shop-page/thirteen/thirteen"),
        {ssr: false}
    ),
    fourteen: dynamic(
        () => import("@/components/_shop-page/fourteen/fourteen"),
        {ssr: false}
    ),
    sixteen: dynamic(
        () => import("@/components/_shop-page/sixteen/sixteen"),
        {ssr: false}
    ),
    seventeen: dynamic(
        () => import("@/components/_shop-page/seventeen/seventeen"),
        {ssr: false}
    ),
    eighteen: dynamic(
        () => import("@/components/_shop-page/eighteen/eighteen"),
        {ssr: false}
    ),
    nineteen: dynamic(
        () => import("@/components/_shop-page/nineteen/nineteen"),
        {ssr: false}
    ),
    twenty: dynamic(
        () => import("@/components/_shop-page/twenty/twenty"),
        {ssr: false}
    ),
    twentyone: dynamic(
        () => import("@/components/_shop-page/twenty-one/twenty-one"),
        {ssr: false}
    ),
    twentytwo: dynamic(
        () => import("@/components/_shop-page/twentytwo/twenty-two"),
        {ssr: false}
    ),
    twentythree: dynamic(
        () => import("@/components/_shop-page/twenty-three/twenty-three"),
        {ssr: false}
    ),
    twentyfour: dynamic(
        () => import("@/components/_shop-page/twenty-four/twenty-four"),
        {ssr: false}
    ),
    twentyfive: dynamic(
        () => import("@/components/_shop-page/twenty-five/twenty-five"),
        {ssr: false}
    ),
    twentysix: dynamic(
        () => import("@/components/_shop-page/twenty-six/twenty-six"),
        {ssr: false}
    ),
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

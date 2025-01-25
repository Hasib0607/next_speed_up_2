'use client';

import dynamic from 'next/dynamic';

export const categories: any = {
    default: dynamic(
        () => import('@/components/_category-page/category-seven-new'),
        { ssr: false }
    ),
    one: dynamic(() => import("@/components/_category-page/category-one")),
    two: dynamic(() => import("@/components/_category-page/category-two")),
    three: dynamic(
        () => import('@/components/_category-page/category-three'),
        { ssr: false }
    ),
    four: dynamic(() => import("@/components/_category-page/category-four")),
    // five: dynamic(() => import("@/components/_category-page/header-five")),
    // six: dynamic(() => import("@/components/_category-page/header-six")),
    seven: dynamic(
        () => import('@/components/_category-page/category-seven-new'),
        { ssr: false }
    ),
    // eight: dynamic(
    //   () => import("@/components/_category-page/header-eight")
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



// import CategoryEight from "./_category-page/category-eight-old";
// import CategoryEighteen from "./_category-page/category-eighteen";
// import CategoryEleven from "./_category-page/category-eleven";
// import CategoryFive from "./_category-page/category-five";
// import CategoryForty from "./_category-page/category-forty";
// import CategoryFour from "./_category-page/category-four";
// import CategoryFourteen from "./_category-page/category-fourteen";
// import CategoryNine from "./_category-page/category-nine";
// import CategoryNineteen from "./_category-page/category-nineteen";
// import CategoryOne from "./_category-page/category-one";
// import CategorySevenNew from "./_category-page/category-seven-new";
// import CategorySeventeen from "./_category-page/category-seventeen";
// import CategorySix from "./_category-page/category-six";
// import CategorySixteen from "./_category-page/category-sixteen";
// import CategoryTen from "./_category-page/category-ten";
// import CategoryThirteen from "./_category-page/category-thirteen";
// import CategoryThirty from "./_category-page/category-thirty";
// import CategoryThirtyEight from "./_category-page/category-thirtyeight";
// import CategoryThirtyFive from "./_category-page/category-thirtyfive";
// import CategoryThirtyFour from "./_category-page/category-thirtyfour";
// import CategoryThirtyNine from "./_category-page/category-thirtynine";
// import CategoryThirtySeven from "./_category-page/category-thirtyseven";
// import CategoryThirtySix from "./_category-page/category-thirtysix";
// import CategoryThirtyThree from "./_category-page/category-thirtythree";
// import CategoryThree from "./_category-page/category-three";
// import CategoryTwelve from "./_category-page/category-twelve";
// import CategoryTwenty from "./_category-page/category-twenty";
// import CategoryTwentyEight from "./_category-page/category-twentyeight";
// import CategoryTwentyFive from "./_category-page/category-twentyfive";
// import CategoryTwentyFour from "./_category-page/category-twentyfour";
// import CategoryTwentyNine from "./_category-page/category-twentynine";
// import CategoryTwentyOne from "./_category-page/category-twentyone";
// import CategoryTwentySeven from "./_category-page/category-twentyseven";
// import CategoryTwentySix from "./_category-page/category-twentysix";
// import CategoryTwentyThree from "./_category-page/category-twentythree";
// import CategoryTwentyTwo from "./_category-page/category-twentytwo";
// import CategoryTwo from "./_category-page/category-two";
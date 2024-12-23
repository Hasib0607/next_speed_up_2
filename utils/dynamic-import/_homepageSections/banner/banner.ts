'use client';

import dynamic from 'next/dynamic';

export const banners: any = {
    seven: dynamic(() => import('@/components/promotions/promo-seven')),

    default: dynamic(() => import('@/components/promotions/promo-default')),

    ten: dynamic(() => import('@/components/promotions/promo-ten')),
    two: dynamic(() => import('@/components/promotions/promo-two')),

    DynamicFooterThirtyEight: dynamic(
        () => import('@/components/footers/footer-thirtyeight')
    ),

    DynamicFooterForty: dynamic(
        () => import('@/components/footers/footer-forty')
    ),
};

// import DefaultPromo from "";
// import PromoOne from "./promotions/promo-one";
// import PromoTwo from "./promotions/promo-two";
// import PromoThree from "./promotions/promo-three";
// import PromoFour from "./promotions/promo-four";
// import PromoFive from "./promotions/promo-five";
// import PromoSix from "./promotions/promo-six";
// import PromoSeven from "";
// import PromoTen from "./promotions/promo-ten";
// import PromoEight from "./promotions/promo-eight";
// import PromoNine from "./promotions/promo-nine";
// import PromoEleven from "./promotions/promo-eleven";
// import PromoTwelve from "./promotions/promo-twelve";
// import PromoThirteen from "./promotions/promo-thirteen";
// import PromoFourteen from "./promotions/promo-fourteen";
// import PromoSixteen from "./promotions/promo-sixteen";
// import PromoEighteen from "./promotions/promo-eighteen";
// import PromoNineteen from "./promotions/promo-nineteen";
// import PromoTwenty from "./promotions/promo-twenty";
// import PromoTwentyOne from "./promotions/promo-tweentyone";
// import PromoTwentyTwo from "./promotions/promo-twentytwo";
// import PromoTwentyThree from "./promotions/promo-twentythree";
// import PromoTwentyFour from "./promotions/promo-twentyfour";
// import PromoTwentyFive from "./promotions/promo-twentyfive";
// import PromoTwentySix from "./promotions/promo-twentysix";
// import PromoTwentySeven from "./promotions/promo-twentyseven";
// import PromoTwentyEight from "./promotions/promo-twenty-eight";
// import PromoTwentyNine from "./promotions/promo-twentynine";
// import PromoThirty from "./promotions/promo-thirty";

// import PromoThirtyOne from "./promotions/promo-thirtyone";

// import PromoThirtyThree from "./promotions/promo-thirtythree";
// import PromoThirtyFour from "./promotions/promo-thirtyfour";
// import PromoThirtyFive from "./promotions/promo-thirtyfive";
// import PromoThirtySix from "./promotions/promo-thirtysix";
// import PromoThirtySeven from "./promotions/promo-thirtyseven";
// import PromoThirtyEight from "./promotions/promo-thirtyeight";
// import PromoThirtyNine from "./promotions/promo-thirtynine";

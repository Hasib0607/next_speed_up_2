'use client';

import dynamic from 'next/dynamic';

export const banner_bottoms: any = {
    seven: dynamic(
        () => import('@/components/promotions-bottom/promo-bottom-seven')
    ),

    default: dynamic(
        () => import('@/components/promotions-bottom/promo-bottom-default')
    ),

    ten: dynamic(
        () => import('@/components/promotions-bottom/promo-bottom-ten')
    ),
    two: dynamic(
        () => import('@/components/promotions-bottom/promo-bottom-two')
    ),
};

// import PromoBottomOne from './promotions-bottom/promo-bottom-one';

// import PromoBottomThree from './promotions-bottom/promo-bottom-three';
// import PromoBottomFour from './promotions-bottom/promo-bottom-four';
// import PromoBottomSix from './promotions-bottom/promo-bottom-six';

// import PromoBottomEight from './promotions-bottom/promo-bottom-eight';
// import PromoBottomNine from './promotions-bottom/promo-bottom-nine';

// import PromoBottomEleven from './promotions-bottom/promo-bottom-eleven';
// import PromoBottomTwelve from './promotions-bottom/promo-bottom-twelve';
// import PromoBottomThirteen from './promotions-bottom/promo-bottom-thirteen';

// import PromoBottomFourteen from './promotions-bottom/promo-bottom-fourteen';
// import PromoBottomFifteen from './promotions-bottom/promo-bottom-fifteen';

// import PromoBottomSixteen from './promotions-bottom/promo-bottom-sixteen';
// import PromoBottomNineteen from './promotions-bottom/promo-bottom-nineteen';
// import PromoBottomTwenty from './promotions-bottom/promo-bottom-twenty';
// import PromoBottomTwentyOne from './promotions-bottom/promo-twentyone';
// import PromoBottomTwentyTwo from './promotions-bottom/promo-bottom-twentytwo';
// import PromoBottomTwentyThree from './promotions-bottom/promo-bottom-twentythree';
// import PromoBottomTwentyFour from './promotions-bottom/promo-bottom-twentyfour';

// import PromoBottomTwentySix from './promotions-bottom/promo-bottom-twentysix';

// import PromoBottomTwentySeven from './promotions-bottom/promo-bottom-twentyseven';
// import PromoBottomTwentyEight from './promotions-bottom/promo-bottom-twentyeight';
// import PromoBottomThirty from './promotions-bottom/promo-bottom-thirty';

// import PromoBottomThirtyOne from './promotions-bottom/promo-bottom-thirtyone';

// import PromoBottomThirtyThree from './promotions-bottom/promo-bottom-thirtythree';
// import PromoBottomThirtyFour from './promotions-bottom/promo-bottom-thirtyfour';
// import PromoBottomThirtyFive from './promotions-bottom/promo-bottom-thirtyfive';
// import PromoBottomThirtySix from './promotions-bottom/promo-bottom-thirtysix';
// import PromoBottomThirtySeven from './promotions-bottom/promo-bottom-thirtyseven';

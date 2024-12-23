'use client';

import dynamic from 'next/dynamic';

export const best_sell_products: any = {
    seven: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-seven')
    ),

    default: dynamic(
        () => import('@/components/_homepage/best-seller/best-seller-seven')
    ),
};

// import BestSellerEight from "./_homepage/best-seller/best-seller-eight";
// import BestSellerFive from "./_homepage/best-seller/best-seller-five";
// import BestSellerNine from "./_homepage/best-seller/best-seller-nine";
// import BestSellerNineteen from "./_homepage/best-seller/best-seller-nineteen";
// const BestSellerSeven = dynamic(() => import('./_homepage/best-seller/best-seller-seven'),{ssr:false});

// import BestSellerSeventeen from "./_homepage/best-seller/best-seller-seventeen";
// import BestSellerSix from "./_homepage/best-seller/best-seller-six";
// import BestSellerSixteen from "./_homepage/best-seller/best-seller-sixteen";
// import BestSellerTen from "./_homepage/best-seller/best-seller-ten";
// import BestSellerThirteen from "./_homepage/best-seller/best-seller-thirteen";
// import BestSellerThirty from "./_homepage/best-seller/best-seller-thirty";
// import BestSellerThirtyEight from "./_homepage/best-seller/best-seller-thirtyeight";
// import BestSellerThirtyFive from "./_homepage/best-seller/best-seller-thirtyfive";
// import BestSellerThirtyFour from "./_homepage/best-seller/best-seller-thirtyfour";
// import BestSellerThirtySeven from "./_homepage/best-seller/best-seller-thirtyseven";
// import BestSellerThirtySix from "./_homepage/best-seller/best-seller-thirtysix";
// import BestSellerThirtyThree from "./_homepage/best-seller/best-seller-thirtythree";
// import BestSellerThirtyNine from "./_homepage/best-seller/best-seller-thritynine";
// import BestSellerTwentyEight from "./_homepage/best-seller/best-seller-twentyeight";
// import BestSellerTwentyFive from "./_homepage/best-seller/best-seller-twentyfive";
// import BestSellerTwentyFour from "./_homepage/best-seller/best-seller-twentyfour";
// import BestSellerTwentyNine from "./_homepage/best-seller/best-seller-twentynine";
// import BestSellerTwentyOne from "./_homepage/best-seller/best-seller-twentyone";
// import BestSellerTwentySeven from "./_homepage/best-seller/best-seller-twentyseven";
// import BestSellerTwentySix from "./_homepage/best-seller/best-seller-twentysix";
// import BestSellerTwentyThree from "./_homepage/best-seller/best-seller-twentythree";
// import BestSellerTwentyTwo from "./_homepage/best-seller/best-seller-twentytwo";

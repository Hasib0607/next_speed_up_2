'use client';

import dynamic from 'next/dynamic';

export const feature_products: any = {
    seven: dynamic(
        () =>
            import(
                '@/components/_homepage/feature-product/feature-product-seven'
            )
    ),

    default: dynamic(
        () =>
            import(
                '@/components/_homepage/feature-product/feature-product-seven'
            )
    ),
};

// import FeatureProductFive from "@/components/_homepage/feature-product/feature-product-five";
// import FeatureProductEight from "./_homepage/feature-product/feature-product-eight";
// import FeatureProductEighteen from "./_homepage/feature-product/feature-product-eighteen";
// import FeatureProductFour from "./_homepage/feature-product/feature-product-four";
// import FeatureProductNine from "./_homepage/feature-product/feature-product-nine";

// import FeatureProductNineteen from "./_homepage/feature-product/feature-product-nineteen";
// const FeatureProductSeven = dynamic(() => import('./_homepage/feature-product/feature-product-seven'),{ssr:false});
// import FeatureProductSeventeen from "./_homepage/feature-product/feature-product-seventeen";
// import FeatureProductSix from "./_homepage/feature-product/feature-product-six";
// import FeatureProductSixteen from "./_homepage/feature-product/feature-product-sixteen";
// import FeatureProductThirteen from "./_homepage/feature-product/feature-product-thirteen";
// import FeatureProductThirty from "./_homepage/feature-product/feature-product-thirty";
// import FeatureProductThirtyEight from "./_homepage/feature-product/feature-product-thirtyeight";
// import FeatureProductThirtyFive from "./_homepage/feature-product/feature-product-thirtyfive";
// import FeatureProductThirtyFour from "./_homepage/feature-product/feature-product-thirtyfour";
// import FeatureProductThirtyNine from "./_homepage/feature-product/feature-product-thirtynine";
// import FeatureProductThirtySeven from "./_homepage/feature-product/feature-product-thirtyseven";
// import FeatureProductThirtySix from "./_homepage/feature-product/feature-product-thirtysix";
// import FeatureProductThirtyThree from "./_homepage/feature-product/feature-product-thirtythree";
// import FeatureProductTwelve from "./_homepage/feature-product/feature-product-twelve";
// import FeatureProductTwenty from "./_homepage/feature-product/feature-product-twenty";
// import FeatureProductTwentyEight from "./_homepage/feature-product/feature-product-twentyeight";
// import FeatureProductTwentyFive from "./_homepage/feature-product/feature-product-twentyfive";
// import FeatureProductTwentyFour from "./_homepage/feature-product/feature-product-twentyfour";
// import FeatureProductTwentyNine from "./_homepage/feature-product/feature-product-twentynine";
// import FeatureProductTwentyOne from "./_homepage/feature-product/feature-product-twentyone";
// import FeatureProductTwentySeven from "./_homepage/feature-product/feature-product-twentyseven";
// import FeatureProductTwentySix from "./_homepage/feature-product/feature-product-twentysix";
// import FeatureProductTwentyThree from "./_homepage/feature-product/feature-product-twentythree";
// import FeatureProductTwentyTwo from "./_homepage/feature-product/feature-product-twentytwo";

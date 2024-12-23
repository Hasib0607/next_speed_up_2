'use client';

import dynamic from 'next/dynamic';

export const feature_categories: any = {
    seven: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featuredcat-seven')
    ),

    default: dynamic(
        () =>
            import('@/components/_homepage/featured-category/featuredcat-seven')
    ),
};

// import FeaturedEight from "./_homepage/featured-category/featurecat-eight";
// import DefaultFeaturedCategory from "./_homepage/featured-category/featured-default";
// import FeaturedEleven from "./_homepage/featured-category/featuredcat-eleven";
// import FeaturedFour from "./_homepage/featured-category/featuredcat-four";
// import FeaturedOne from "./_homepage/featured-category/featuredcat-one";

// const FeaturedSeven = dynamic(() => import('./_homepage/featured-category/featuredcat-seven'),{ssr:false});
// import FeaturedSix from "./_homepage/featured-category/featuredcat-six";
// import FeaturedThree from "./_homepage/featured-category/featuredcat-three";
// import FeaturedTwelve from "./_homepage/featured-category/featuredcat-twelve";
// import FeaturedTwo from "./_homepage/featured-category/featuredcat-two";

// import FeaturedForty from "./_homepage/featured-category/featured-forty";
// import FeaturedThirtyOne from "./_homepage/featured-category/featured-thirtyone";
// import FeaturedEighteen from "./_homepage/featured-category/featuredcat-eighteen";
// import FeaturedNineteen from "./_homepage/featured-category/featuredcat-nineteen";

// import FeaturedSeventeen from "./_homepage/featured-category/featuredcat-seventeen";

// import FeaturedSixteen from "./_homepage/featured-category/featuredcat-sixteen";
// import FeaturedThirty from "./_homepage/featured-category/featuredcat-thirty";
// import FeaturedThirtyEight from "./_homepage/featured-category/featuredcat-thirtyeight";
// import FeaturedThirtyFive from "./_homepage/featured-category/featuredcat-thirtyfive";
// import FeaturedThirtyNine from "./_homepage/featured-category/featuredcat-thirtynine";
// import FeaturedThirtySeven from "./_homepage/featured-category/featuredcat-thirtyseven";
// import FeaturedThirtySix from "./_homepage/featured-category/featuredcat-thirtysix";
// import FeaturedThirtyThree from "./_homepage/featured-category/featuredcat-thirtythree";
// tanstack
// import FeaturedTwenty from "./_homepage/featured-category/featuredcat-twenty";
// import FeaturedTwentyEight from "./_homepage/featured-category/featuredcat-twenty-eight";
// import FeaturedTwentyFive from "./_homepage/featured-category/featuredcat-twentyfive";
// import FeaturedTwentySeven from "./_homepage/featured-category/featuredcat-twentyseven";

// import FeaturedTwentyOne from "./_homepage/featured-category/featuredcat-twentyone";
// import FeaturedTwentyThree from "./_homepage/featured-category/featuredcat-twentythree";

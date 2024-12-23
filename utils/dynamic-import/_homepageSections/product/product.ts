import dynamic from 'next/dynamic';

export const all_products: any = {
    twenty: dynamic(
        () => import('@/components/_homepage/product/product-twenty')
    ),
    seven: dynamic(
        () => import('@/components/_homepage/product/product-twenty')
    ),

    default: dynamic(
        () => import('@/components/_homepage/product/product-twenty')
    ),
};

// const DynamicDefaultProduct = dynamic(
//   () => import("@/components/_homepage/product/product-default"),
//   {
//     ssr: false,
//     loading: DefaultProduct,
//   }
// );
// const DynamicProductEleven = dynamic(
//   () => import("@/components/_homepage/product/product-eleven"),
//   {
//     ssr: false,
//   }
// );
// const DynamicProductThirtyThree = dynamic(
//   () => import("@/components/_homepage/product/product-thirtythree"),
//   {
//     ssr: false,
//   }
// );

// import DefaultProduct from "@/components/_homepage/product/product-default";

// import ProductFive from "./_homepage/product/product-five";
// import ProductFour from "./_homepage/product/product-four";
// import ProductFourteen from "./_homepage/product/product-fourteen";
// import ProductNineteen from "./_homepage/product/product-nineteen";
// import ProductOne from "./_homepage/product/product-one";
// import ProductSeventeen from "./_homepage/product/product-seventeen";
// import ProductSixteen from "./_homepage/product/product-sixteen";
// import ProductThirty from "./_homepage/product/product-thirty";
// import ProductThirtyEight from "./_homepage/product/product-thirtyeight";
// import ProductThirtyFive from "./_homepage/product/product-thirtyfive";
// import ProductThirtyFour from "./_homepage/product/product-thirtyfour";
// import ProductThirtyNine from "./_homepage/product/product-thirtynine";
// import ProductThirtySeven from "./_homepage/product/product-thirtyseven";
// import ProductThirtySix from "./_homepage/product/product-thirtysix";
// import ProductThree from "./_homepage/product/product-three";
// const ProductTwenty = dynamic(() => import('./_homepage/product/product-twenty'),{ssr:false});

// import ProductTwentyEight from "./_homepage/product/product-twentyeight";
// import ProductTwentyFour from "./_homepage/product/product-twentyfour";
// import ProductTwentyNine from "./_homepage/product/product-twentynine";
// import ProductTwentyOne from "./_homepage/product/product-twentyone";
// import ProductTwentySeven from "./_homepage/product/product-twentyseven";
// import ProductTwentySix from "./_homepage/product/product-twentysix";
// import ProductTwo from "./_homepage/product/product-two";

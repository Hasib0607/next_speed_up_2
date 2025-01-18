import dynamic from 'next/dynamic';

export const new_arrival: any = {
    seven: dynamic(
        () => import('@/components/new-arrival/new-arrival-product-seven')
    ),

    default: dynamic(
        () => import('@/components/new-arrival/new-arrival-product-seven')
    ),
};

// const NewArrivalProductSeven = dynamic(() => import(''),{ssr:false});

// const NewArrivalProductNineDynamic = dynamic(
//   () => import("@/components/new-arrival/new-arrival-product-nine"),
//   {
//     ssr: false,
//     loading: NewArrivalProductNine,
//   }
// );

// import NewArrivalProductsEight from "./new-arrival/new-arrival-product-eight";
// import NewArrivalProductFive from "./new-arrival/new-arrival-product-five";
// import NewArrivalProductFourteen from "./new-arrival/new-arrival-product-fourteen";

// import NewArrivalProductNine from "./new-arrival/new-arrival-product-nine";
// import NewArrivalProductSeventeen from "./new-arrival/new-arrival-product-seventeen";

// import NewArrivalProductSix from "./new-arrival/new-arrival-product-six";
// import NewArrivalProductTen from "./new-arrival/new-arrival-product-ten";
// import NewArrivalProductThirteeen from "./new-arrival/new-arrival-product-thirteen";
// import NewArrivalProductThirtyFour from "./new-arrival/new-arrival-product-thirty-four";
// import NewArrivalProductThirtyEight from "./new-arrival/new-arrival-product-thirtyeight";
// import NewArrivalProductThirtyFive from "./new-arrival/new-arrival-product-thirtyfive";

// import NewArrivalProductThirtyNine from "./new-arrival/new-arrival-product-thirtynine";

// import NewArrivalProductThirtyOne from "./new-arrival/new-arrival-product-thirtyone";
// import NewArrivalProductThirtySeven from "./new-arrival/new-arrival-product-thirtyseven";
// import NewArrivalProductThirtySix from "./new-arrival/new-arrival-product-thirtysix";
// import NewArrivalProductTwelve from "./new-arrival/new-arrival-product-twelve";
// import NewArrivalProductTwentyNine from "./new-arrival/new-arrival-product-twentynine";
// import NewArrivalProductTwentySeven from "./new-arrival/new-arrival-product-twentyseven";
// import NewArrivalProductTwentyThree from "./new-arrival/new-arrival-product-twentythree";
// import NewArrivalProductTwentyTwo from "./new-arrival/new-arrival-product-twentytwo";

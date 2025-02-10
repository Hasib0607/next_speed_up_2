import dynamic from 'next/dynamic';

export const footers: any = {
    default: dynamic(() => import('@/components/footers/footer-twentyseven')),
    one: dynamic(() => import('@/components/footers/footer-one')),
    two: dynamic(() => import('@/components/footers/footer-two')),
    three: dynamic(() => import('@/components/footers/footer-three')),
    four: dynamic(() => import('@/components/footers/footer-four')),
    five: dynamic(() => import('@/components/footers/footer-five')),
    six: dynamic(() => import('@/components/footers/footer-six')),
    seven: dynamic(() => import('@/components/footers/footer-seven')),
    eight: dynamic(() => import('@/components/footers/footer-eight')),
    nine: dynamic(() => import('@/components/footers/footer-nine')),
    ten: dynamic(() => import('@/components/footers/footer-nine')),
    eleven: dynamic(() => import('@/components/footers/footer-eleven')),
    twelve: dynamic(() => import('@/components/footers/footer-twelve')),
    thirteen: dynamic(() => import('@/components/footers/footer-thirteen')),
    fourteen: dynamic(() => import('@/components/footers/footer-fourteen')),
    // fifteen: dynamic(
    //   () => import("@/components/footers/footer-twentyseven")
    // ),
    sixteen: dynamic(() => import('@/components/footers/footer-sixteen')),
    seventeen: dynamic(() => import('@/components/footers/footer-seventeen')),
    eighteen: dynamic(() => import('@/components/footers/footer-eighteen')),
    nineteen: dynamic(() => import('@/components/footers/footer-nineteen')),
    twenty: dynamic(() => import('@/components/footers/footer-twenty')),
    twentyone: dynamic(
       () => import("@/components/footers/footer-twentyone")
     ),
    twentytwo: dynamic(() => import('@/components/footers/footer-twentytwo')),
    twentythree: dynamic(
        () => import('@/components/footers/footer-twentythree')
    ),
    twentyfour: dynamic(() => import('@/components/footers/footer-twentyfour')),
    twentyfive: dynamic(() => import('@/components/footers/footer-twentyfive')),
    twentysix: dynamic(() => import('@/components/footers/footer-twentysix')),
    twentyseven: dynamic(
        () => import('@/components/footers/footer-twentyseven')
    ),
    twentyeight: dynamic(
        () => import('@/components/footers/footer-twentyseven')
    ),
    twentynine: dynamic(() => import('@/components/footers/footer-twentynine')),
    thirty: dynamic(() => import('@/components/footers/footer-thirty')),
    thirtyone: dynamic(() => import('@/components/footers/footer-thirty')),
    thirtythree: dynamic(() => import('@/components/footers/footer-thirty')),
    thirtyfour: dynamic(() => import('@/components/footers/footer-thirtyfour')),
    thirtyfive: dynamic(() => import('@/components/footers/footer-thirtyfive')),
    thirtysix: dynamic(() => import('@/components/footers/footer-thirtysix')),
    thirtyseven: dynamic(
        () => import('@/components/footers/footer-thirtyseven')
    ),
    thirtyeight: dynamic(
        () => import('@/components/footers/footer-thirtyeight')
    ),
    thirtynine: dynamic(
        () => import('@/components/footers/footer-thirtyeight')
    ),
    forty: dynamic(() => import('@/components/footers/footer-forty')),
};

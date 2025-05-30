import { FORTY_EIGHT, FORTY_FIVE, FORTY_FOUR, FORTY_SEVEN, FORTY_SIX, FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const categories: any = {
    default: dynamic(
        () => import('@/components/_category-page/category-seven-new')
    ),
    one: dynamic(() => import('@/components/_category-page/category-one')),
    two: dynamic(() => import('@/components/_category-page/category-two')),
    three: dynamic(() => import('@/components/_category-page/category-three')),
    four: dynamic(() => import('@/components/_category-page/category-four')),
    five: dynamic(() => import('@/components/_category-page/category-five')),
    six: dynamic(() => import('@/components/_category-page/category-six')),
    seven: dynamic(
        () => import('@/components/_category-page/category-seven-new')
    ),
    eight: dynamic(() => import('@/components/_category-page/category-eight')),
    nine: dynamic(() => import('@/components/_category-page/category-nine')),
    ten: dynamic(() => import('@/components/_category-page/category-ten')),
    eleven: dynamic(
        () => import('@/components/_category-page/category-eleven')
    ),
    twelve: dynamic(
        () => import('@/components/_category-page/category-twelve')
    ),
    thirteen: dynamic(
        () => import('@/components/_category-page/category-thirteen')
    ),
    fourteen: dynamic(
        () => import('@/components/_category-page/category-fourteen')
    ),
    // sixteen: dynamic(
    //   () => import("@/components/_category-page/category-sixteen"),
    //
    // ),
    seventeen: dynamic(
        () => import('@/components/_category-page/category-seventeen')
    ),
    eighteen: dynamic(
        () => import('@/components/_category-page/category-eighteen')
    ),
    nineteen: dynamic(
        () => import('@/components/_category-page/category-nineteen')
    ),
    twenty: dynamic(
        () => import('@/components/_category-page/category-twenty')
    ),
    twentyone: dynamic(
        () => import('@/components/_category-page/category-twentyone')
    ),
    twentytwo: dynamic(
        () => import('@/components/_category-page/category-twentytwo')
    ),
    twentythree: dynamic(
        () => import('@/components/_category-page/category-twentythree')
    ),
    twentyfour: dynamic(
        () => import('@/components/_category-page/category-twentyfour')
    ),
    twentyfive: dynamic(
        () => import('@/components/_category-page/category-twentyfive')
    ),
    twentysix: dynamic(
        () => import('@/components/_category-page/category-twentysix')
    ),
    twentyseven: dynamic(
        () => import('@/components/_category-page/category-twentyseven')
    ),
    twentyeight: dynamic(
        () => import('@/components/_category-page/category-twentyeight')
    ),
    twentynine: dynamic(
        () => import('@/components/_category-page/category-twentynine')
    ),
    thirty: dynamic(
        () => import('@/components/_category-page/category-thirty')
    ),
    thirtyone: dynamic(
        () => import('@/components/_category-page/category-thirty')
    ),
    thirtythree: dynamic(
        () => import('@/components/_category-page/category-thirtythree')
    ),
    thirtyfour: dynamic(
        () => import('@/components/_category-page/category-thirtyfour')
    ),
    thirtyfive: dynamic(
        () => import('@/components/_category-page/category-thirtyfive')
    ),
    thirtysix: dynamic(
        () => import('@/components/_category-page/category-thirtysix')
    ),
    thirtyseven: dynamic(
        () => import('@/components/_category-page/category-thirtyseven')
    ),
    thirtyeight: dynamic(
        () => import('@/components/_category-page/category-thirtyeight')
    ),
    thirtynine: dynamic(
        () => import('@/components/_category-page/category-thirtynine')
    ),
    forty: dynamic(() => import('@/components/_category-page/category-forty')),
    fortyone: dynamic(
        () => import('@/components/_category-page/category-fortyone')
    ),
    [FORTY_THREE]: dynamic(
        () => import('@/components/_category-page/category-fortythree')
    ),
    [FORTY_FOUR]: dynamic(
        () => import('@/components/_category-page/category-fortyfour')
    ),
    [FORTY_FIVE]: dynamic(
        () => import('@/components/_category-page/category-fortyfive')
    ),
    [FORTY_SIX]: dynamic(
        () => import('@/components/_category-page/category-fortysix')
    ),
    [FORTY_SEVEN]: dynamic(
        () => import('@/components/_category-page/category-fortyseven')
    ),
    [FORTY_EIGHT]: dynamic(
        () => import('@/components/_category-page/category-fortyeight')
    ),
};

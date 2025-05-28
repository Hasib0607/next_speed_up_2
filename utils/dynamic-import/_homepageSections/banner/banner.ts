import { FORTY_EIGHT, FORTY_FOUR, FORTY_SEVEN, FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const banners: any = {
    default: dynamic(
        () => import('@/components/_homepage/promotions/promo-default')
    ),
    one: dynamic(() => import('@/components/_homepage/promotions/promo-one')),
    two: dynamic(() => import('@/components/_homepage/promotions/promo-two')),
    three: dynamic(
        () => import('@/components/_homepage/promotions/promo-three')
    ),
    four: dynamic(() => import('@/components/_homepage/promotions/promo-four')),
    five: dynamic(() => import('@/components/_homepage/promotions/promo-five')),
    six: dynamic(() => import('@/components/_homepage/promotions/promo-six')),
    seven: dynamic(
        () => import('@/components/_homepage/promotions/promo-seven')
    ),
    eight: dynamic(
        () => import('@/components/_homepage/promotions/promo-eight')
    ),
    nine: dynamic(() => import('@/components/_homepage/promotions/promo-nine')),
    ten: dynamic(() => import('@/components/_homepage/promotions/promo-ten')),
    eleven: dynamic(
        () => import('@/components/_homepage/promotions/promo-eleven')
    ),
    twelve: dynamic(
        () => import('@/components/_homepage/promotions/promo-twelve')
    ),
    thirteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirteen')
    ),
    fourteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-fourteen')
    ),
    sixteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-sixteen')
    ),
    // seventeen: dynamic(
    //     () => import('@/components/_homepage/promotions/promo-seventeen'),
    // ),
    eighteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-eighteen')
    ),
    nineteen: dynamic(
        () => import('@/components/_homepage/promotions/promo-nineteen')
    ),
    twenty: dynamic(
        () => import('@/components/_homepage/promotions/promo-twenty')
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/promotions/promo-tweentyone')
    ),
    twentytwo: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentytwo')
    ),
    twentythree: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentythree')
    ),
    twentyfour: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyfour')
    ),
    twentyfive: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyfive')
    ),
    twentysix: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentysix')
    ),
    twentyseven: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentyseven')
    ),
    twentyeight: dynamic(
        () => import('@/components/_homepage/promotions/promo-twenty-eight')
    ),
    twentynine: dynamic(
        () => import('@/components/_homepage/promotions/promo-twentynine')
    ),
    thirty: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirty')
    ),
    thirtyone: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyone')
    ),
    // thirtytwo: dynamic(
    //     () => import('@/components/_homepage/promotions/promo-thirtytwo'),
    //
    // ),
    thirtythree: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtythree')
    ),
    thirtyfour: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyfour')
    ),
    thirtyfive: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyfive')
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtysix')
    ),
    thirtyseven: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyseven')
    ),
    thirtyeight: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtyeight')
    ),
    thirtynine: dynamic(
        () => import('@/components/_homepage/promotions/promo-thirtynine')
    ),
    [FORTY_THREE]: dynamic(
        () => import('@/components/_homepage/promotions/promo-fortythree')
    ),
    [FORTY_FOUR]: dynamic(
        () => import('@/components/_homepage/promotions/promo-fortyfour')
    ),
    [FORTY_SEVEN]: dynamic(
        () => import('@/components/_homepage/promotions/promo-fortyseven')
    ),
    [FORTY_EIGHT]: dynamic(
        () => import('@/components/_homepage/promotions/promo-fortyeight')
    ),
};

import { FORTY_FIVE, FORTY_FOUR, FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const hero: any = {
    default: dynamic(() => import('@/components/_homepage/hero/hero-default')),
    one: dynamic(() => import('@/components/_homepage/hero/hero-one')),
    two: dynamic(() => import('@/components/_homepage/hero/hero-two')),
    three: dynamic(() => import('@/components/_homepage/hero/hero-three')),
    four: dynamic(() => import('@/components/_homepage/hero/hero-four')),
    five: dynamic(() => import('@/components/_homepage/hero/hero-five')),
    six: dynamic(() => import('@/components/_homepage/hero/hero-six')),
    seven: dynamic(() => import('@/components/_homepage/hero/hero-seven')),
    eight: dynamic(() => import('@/components/_homepage/hero/hero-eight')),
    nine: dynamic(() => import('@/components/_homepage/hero/hero-nine')),
    ten: dynamic(() => import('@/components/_homepage/hero/hero-ten')),
    eleven: dynamic(() => import('@/components/_homepage/hero/hero-eleven')),
    twelve: dynamic(() => import('@/components/_homepage/hero/hero-twelve')),
    thirteen: dynamic(
        () => import('@/components/_homepage/hero/hero-thirteen')
    ),
    fourteen: dynamic(
        () => import('@/components/_homepage/hero/hero-fourteen')
    ),
    sixteen: dynamic(() => import('@/components/_homepage/hero/hero-sixteen')),
    seventeen: dynamic(
        () => import('@/components/_homepage/hero/hero-seventeen')
    ),
    eighteen: dynamic(
        () => import('@/components/_homepage/hero/hero-eighteen')
    ),
    nineteen: dynamic(
        () => import('@/components/_homepage/hero/hero-nineteen')
    ),
    twenty: dynamic(
        () => import('@/components/_homepage/hero/hero-tweenty-one')
    ),
    twentyone: dynamic(
        () => import('@/components/_homepage/hero/hero-tweenty-one')
    ),
    twentytwo: dynamic(
        () => import('@/components/_homepage/hero/hero-tweenty-two')
    ),
    twentythree: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-three')
    ),
    twentyfour: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-four')
    ),
    twentyfive: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-five')
    ),
    twentysix: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-six')
    ),
    twentyseven: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-seven')
    ),
    twentyeight: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-eight')
    ),
    twentynine: dynamic(
        () => import('@/components/_homepage/hero/hero-twenty-nine')
    ),
    thirty: dynamic(() => import('@/components/_homepage/hero/hero-thrity')),
    thirtyone: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-one')
    ),
    thirtythree: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-three')
    ),
    thirtyfour: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-four')
    ),
    thirtyfive: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-five')
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-six')
    ),
    thirtyseven: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-seven')
    ),
    thirtyeight: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-eight')
    ),
    thirtynine: dynamic(
        () => import('@/components/_homepage/hero/hero-thirty-nine')
    ),
    [FORTY_THREE]: dynamic(
        () => import('@/components/_homepage/hero/hero-fortythree')
    ),
    [FORTY_FOUR]: dynamic(
        () => import('@/components/_homepage/hero/hero-fortyfour')
    ),
    [FORTY_FIVE]: dynamic(
        () => import('@/components/_homepage/hero/hero-fortyfive')
    ),
};

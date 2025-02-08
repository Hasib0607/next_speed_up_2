import dynamic from 'next/dynamic';

export const forgot_password_pages: any = {
    default: dynamic(() => import('@/components/forgot-password/forgot-four')),
    one: dynamic(() => import('@/components/forgot-password/forgot-one')),
    two: dynamic(() => import('@/components/forgot-password/forgot-four')),
    three: dynamic(() => import('@/components/forgot-password/forgot-four')),
    four: dynamic(() => import('@/components/forgot-password/forgot-four')),
    five: dynamic(() => import('@/components/forgot-password/forgot-five')),
    six: dynamic(() => import('@/components/forgot-password/forgot-four')),
    seven: dynamic(() => import('@/components/forgot-password/forgot-seven')),
    eight: dynamic(() => import('@/components/forgot-password/forgot-four')),
    nine: dynamic(() => import('@/components/forgot-password/forgot-four')),
    eleven: dynamic(() => import('@/components/forgot-password/forgot-eleven')),
    twelve: dynamic(() => import('@/components/forgot-password/forgot-four')),
    thirteen: dynamic(() => import('@/components/forgot-password/forgot-four')),
    fourteen: dynamic(
        () => import('@/components/forgot-password/forgot-seven')
    ),
    fifteen: dynamic(
        () => import('@/components/forgot-password/forgot-fifteen')
    ),
    sixteen: dynamic(() => import('@/components/forgot-password/forgot-four')),
    seventeen: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    eighteen: dynamic(() => import('@/components/forgot-password/forgot-five')),
    nineteen: dynamic(
        () => import('@/components/forgot-password/forgot-fifteen')
    ),
    twenty: dynamic(() => import('@/components/forgot-password/forgot-seven')),
    twentyone: dynamic(
        () => import('@/components/forgot-password/forgot-twentyone')
    ),
    twentytwo: dynamic(
        () => import('@/components/forgot-password/forgot-twentyone')
    ),
    twentythree: dynamic(
        () => import('@/components/forgot-password/forgot-one')
    ),
    twentyfour: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    twentyfive: dynamic(
        () => import('@/components/forgot-password/forgot-fifteen')
    ),
    twentysix: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    twentyseven: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    twentyeight: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    twentynine: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    thirty: dynamic(() => import('@/components/forgot-password/forgot-four')),
    thirtyone: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    thirtythree: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    thirtyfour: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
    thirtyfive: dynamic(
        () => import('@/components/forgot-password/forgot-four')
    ),
};

import {
    DEFAULT,
    EIGHT,
    EIGHTEEN,
    ELEVEN,
    FIFTEEN,
    FIVE,
    FORTY,
    FORTY_FOUR,
    FORTY_THREE,
    FOUR,
    FOURTEEN,
    NINE,
    NINETEEN,
    ONE,
    SEVEN,
    SEVENTEEN,
    SIX,
    SIXTEEN,
    TEN,
    THIRTEEN,
    THIRTY,
    THIRTY_EIGHT,
    THIRTY_FIVE,
    THIRTY_ONE,
    THIRTY_SIX,
    THREE,
    TWELVE,
    TWENTY,
    TWENTY_EIGHT,
    TWENTY_FIVE,
    TWENTY_FOUR,
    TWENTY_NINE,
    TWENTY_ONE,
    TWENTY_SEVEN,
    TWENTY_SIX,
    TWENTY_THREE,
    TWENTY_TWO,
    TWO,
} from '@/consts';

import dynamic from 'next/dynamic';

export const checkout_pages: any = {
    [DEFAULT]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [ONE]: dynamic(
        () => import('@/components/_checkout-page/one/checkout-one')
    ),
    [TWO]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [THREE]: dynamic(
        () => import('@/components/_checkout-page/seven/checkout-seven')
    ),
    [FOUR]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [FIVE]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [SIX]: dynamic(
        () => import('@/components/_checkout-page/five/checkout-five')
    ),
    [SEVEN]: dynamic(
        () => import('@/components/_checkout-page/seven/checkout-seven')
    ),
    [EIGHT]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [NINE]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [TEN]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [ELEVEN]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [TWELVE]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [THIRTEEN]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [FOURTEEN]: dynamic(
        () => import('@/components/_checkout-page/five/checkout-five')
    ),
    [FIFTEEN]: dynamic(
        () => import('@/components/_checkout-page/seven/checkout-seven')
    ),
    [SIXTEEN]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [SEVENTEEN]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [EIGHTEEN]: dynamic(
        () => import('@/components/_checkout-page/five/checkout-five')
    ),
    [NINETEEN]: dynamic(
        () => import('@/components/_checkout-page/seven/checkout-seven')
    ),
    [TWENTY]: dynamic(
        () => import('@/components/_checkout-page/seven/checkout-seven')
    ),
    [TWENTY_ONE]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [TWENTY_TWO]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [TWENTY_THREE]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [TWENTY_FOUR]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [TWENTY_FIVE]: dynamic(
        () => import('@/components/_checkout-page/four/checkout-four')
    ),
    [TWENTY_SIX]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [TWENTY_SEVEN]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [TWENTY_EIGHT]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [TWENTY_NINE]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [THIRTY]: dynamic(
        () => import('@/components/_checkout-page/eleven/checkout-eleven')
    ),
    [THIRTY_ONE]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    // thirtythree: dynamic(
    //     () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    // ),
    // thirtyfour: dynamic(
    //     () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    // ),
    [THIRTY_FIVE]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    [THIRTY_SIX]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    // thirtyseven: dynamic(
    //     () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    // ),
    [THIRTY_EIGHT]: dynamic(
        () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    ),
    // thirtynine: dynamic(
    //     () => import('@/components/_checkout-page/twentyone/checkout-twentyone')
    // ),
    [FORTY]: dynamic(
        () => import('@/components/_checkout-page/forty/checkout-forty')
    ),
    [FORTY_THREE]: dynamic(
        () => import('@/components/_checkout-page/fortythree/checkout-fortythree')
    ),
    [FORTY_FOUR]: dynamic(
        () => import('@/components/_checkout-page/forty-four/checkout-forty-four')
    ),
};

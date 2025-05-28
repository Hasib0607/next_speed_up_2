import { FORTY_EIGHT } from '@/consts';
import dynamic from 'next/dynamic';

export const all_testimonials: any = {
    default: dynamic(
        () => import('@/components/_homepage/testimonial/default')
    ),
    one: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-one')
    ),
    two: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-two')
    ),
    three: dynamic(
        () => import('@/components/_homepage/testimonial/default')
    ),
    four: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-four')
    ),
    five: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-five')
    ),
    six: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-seven')
    ),
    seven: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-seven')
    ),
    eight: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-five')
    ),
    nine: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-twelve')
    ),
    ten: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-seven')
    ),
    twelve: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-two')
    ),
    fifteen: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-twelve')
    ),
    twentyseven: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-twentyseven')
    ),
    thirtyone: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-twentyseven')
    ),
    thirtyfive: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-thirtyfive')
    ),
    thirtysix: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-twentyseven')
    ),
    [FORTY_EIGHT]: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-fortyeight')
    ),

};
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

};

// const TestimonialThree = dynamic(
//     () => import(''),
//     { ssr: false }
// );
// const TestimonialOne = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-one'),
//     { ssr: false }
// );
// const TestimonialTwo = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-two'),
//     { ssr: false }
// );
// const TestimonialFour = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-four'),
//     { ssr: false }
// );
// const TestimonialFive = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-five'),
//     { ssr: false }
// );
// const TestimonialSeven = dynamic(
//     () => import(''),
//     { ssr: false }
// );
// const TestimonialTwelve = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-twelve'),
//     { ssr: false }
// );
// const TestimonialTwentySeven = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-twentyseven'),
//     { ssr: false }
// );
// const TestimonialThirtyFive = dynamic(
//     () => import('@/components/_homepage/testimonial/testimonial-thirtyfive'),
//     { ssr: false }
// );

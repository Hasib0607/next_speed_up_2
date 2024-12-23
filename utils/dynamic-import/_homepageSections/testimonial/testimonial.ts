import dynamic from 'next/dynamic';

export const all_testimonials: any = {
    seven: dynamic(
        () => import('@/components/_homepage/testimonial/testimonial-seven')
    ),

    default: dynamic(
        () => import('@/components/_homepage/testimonial/default')
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

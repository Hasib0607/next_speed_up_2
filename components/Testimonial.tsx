'use client'

import { DEFAULT } from '@/consts';
import { useGetTestimonialQuery } from '@/redux/features/home/homeApi';
import { all_testimonials } from '@/utils/dynamic-import/_homepageSections/testimonial/testimonial';

const Testimonial = ({ design }: any) => {
    const TestimonialComponent =
        all_testimonials[design?.testimonial] || all_testimonials[DEFAULT];

    const {
        data: testimonialsData,
        isLoading: testimonialsLoading,
        isSuccess: testimonialsSuccess,
    } = useGetTestimonialQuery({});

    const testimonials = testimonialsData?.data || [];

    return (
        <>

            {design?.testimonial !== "null" && testimonialsSuccess && testimonials && (

                <TestimonialComponent
                    design={design}
                    testimonials={testimonials}
                />
            )}
        </>
    );
};

export default Testimonial;

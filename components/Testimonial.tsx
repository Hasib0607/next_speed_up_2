import { DEFAULT } from '@/consts';
import { getInitialAppData } from '@/lib/getInitialAppData';
// import { useGetTestimonialQuery } from '@/redux/features/home/homeApi';
import { all_testimonials } from '@/utils/dynamic-import/_homepageSections/testimonial/testimonial';

const Testimonial = async ({ design }: any) => {
    const TestimonialComponent =
        all_testimonials[design?.testimonial] || all_testimonials[DEFAULT];

    const { testimonials } = await getInitialAppData({
        testimonials: true,
    });

    // const {
    //     data: testimonialsData,
    //     isLoading: testimonialsLoading,
    //     isSuccess: testimonialsSuccess,
    // } = useGetTestimonialQuery({});

    // const testimonials = testimonialsData?.data || [];

    return (
        design?.testimonial !== 'null' &&
        TestimonialComponent && (
            <TestimonialComponent design={design} testimonials={testimonials} />
        )
    );
};

export default Testimonial;

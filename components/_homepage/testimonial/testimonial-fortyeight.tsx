'use client';

import { testimonialImg } from '@/site-settings/siteUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const TestimonialFortyEight = ({ testimonials }: any) => {
    return (
        <div>
            <div className="container px-5">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <h1 className="text-3xl font-medium title-font text-gray-900 mb-2 text-left">
                            Customer Review
                        </h1>
                        <p className="mb-10">Listen To Our Customers.</p>
                        <div className="flex flex-wrap">
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={10}
                                slidesPerView={3}
                                navigation
                                autoplay={false}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                            >
                                {testimonials?.length > 0 &&
                                    testimonials.map((single: any) => (
                                        <SwiperSlide key={single.id}>
                                            <div className="w-full">
                                                <div className="h-auto rounded lg:flex items-center gap-6">
                                                    <img
                                                        alt="testimonial"
                                                        src={
                                                            testimonialImg +
                                                            single.image
                                                        }
                                                        className="flex-shrink-0 object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TestimonialFortyEight;

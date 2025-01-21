'use client';

import React from 'react';
import { testimonialImg } from '@/site-settings/siteUrl';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TestimonialOne = ({ testimonials }: any) => {
    const prev = 'testimonial_Prev';
    const next = 'testimonial_Next';

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="relative">
                <div className="flex items-center justify-between h-full w-full absolute z-0">
                    <div className="w-1/3 bg-white h-full" />
                    <div className="w-4/6 ml-16 bg-gray-100 h-full" />
                    <div className="z-10 absolute flex items-center -bottom-10">
                        <div
                            className={`${prev} cursor-pointer text-gray-600 arrow-color h-10 w-10 flex justify-center items-center bg-white rounded-full`}
                        >
                            <ChevronLeftIcon className="h-6 font-serif font-bold" />
                        </div>
                        <div
                            className={`${next}  text-gray-600 arrow-color h-10 w-10 flex justify-center items-center bg-white rounded-full cursor-pointer ml-2`}
                        >
                            <ChevronRightIcon className="h-6 font-serif font-bold" />
                        </div>
                    </div>
                </div>

                <div className="relative z-[1]">
                    <h1 className="text-5xl font-bold xl:block hidden leading-tight text-gray-800">
                        What our customers are
                        <br />
                        saying
                    </h1>
                    <h1 className="text-5xl font-bold xl:hidden block leading-tight lg:leading-10 text-gray-800">
                        What our customers are saying
                    </h1>
                    <DefaultSlider prevEl={prev} nextEl={next}>
                        {testimonials?.map((item: any, idx: any) => (
                            <SwiperSlide key={idx}>
                                <div className="mt-14 md:flex w-full">
                                    <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
                                        <img
                                            src={testimonialImg + item?.image}
                                            alt=""
                                            className="min-w-full h-full object-fit object-cover shadow-lg rounded"
                                        />
                                        <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
                                            <img
                                                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg"
                                                alt="commas"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {item?.feedback}
                                            </p>
                                        </div>
                                        <div className="md:mt-0 mt-8">
                                            <p className="text-base font-medium leading-4 text-gray-800">
                                                {item?.name}
                                            </p>
                                            <p className="text-base leading-4 mt-2 mb-4 text-gray-600">
                                                {item?.occupation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </DefaultSlider>
                </div>
            </div>
        </div>
    );
};

export default TestimonialOne;

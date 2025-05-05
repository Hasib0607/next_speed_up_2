'use client';

import { SwiperSlide } from 'swiper/react';
import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DefaultSlider from '@/components/slider/default-slider';
import { getDataByType } from '@/helpers/getCustomDataByType';
import Card3 from '@/components/card/card3';

const DefaultBrand = ({ headersetting, brands }: any) => {
    const prevEl = 'brand-section-prev';
    const nextEl = 'brand-section-next';

    if (brands.length === 0) return null;

    const customDesignData = getDataByType(headersetting, 'brand');
    const { title = 'Top Brands', title_color = '#000' } =
        customDesignData || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto  bg-white relative group ">
            <SectionHeadingSixteen title={title} title_color={title_color} />
            <div className="relative z-[2]">
                <div className=" gap-2 lg:cursor-pointer lg:group-hover:opacity-100  lg:opacity-0 duration-500">
                    <div
                        className={`${prevEl} bg-gray-400 hover:bg-[var(--header-color)] text-[var(--text-color)]  rounded-full transition-all duration-500 ease-linear absolute -left-4 top-28`}
                    >
                        <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
                    </div>
                    <div
                        className={`${nextEl} bg-gray-400 hover:bg-[var(--header-color)] text-[var(--text-color)] rounded-full transition-all duration-500  ease-linear absolute -right-4 top-28  `}
                    >
                        <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
                    </div>
                </div>
            </div>

            <DefaultSlider
                prevEl={prevEl}
                nextEl={nextEl}
                breakpoints={{
                    350: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1920: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
            >
                {brands?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <Card3 item={item} />
                    </SwiperSlide>
                ))}
            </DefaultSlider>
        </div>
    );
};

export default DefaultBrand;

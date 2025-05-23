'use client';

import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';

import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import DefaultSlider from '@/components/slider/default-slider';
import { iconImg } from '@/site-settings/siteUrl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const FeaturedSixteen = ({ category, headersetting }: any) => {
    const prevEl = 'feature-category-prev';
    const nextEl = 'feature-category-next';
    let isLoop = category.length > 1;

    const styleCss = `
        .feature-category-prev:hover {
            color:  var(--text-color);
            background: var(--header-color);
        }
        .feature-category-next:hover {
            color:  var(--text-color);
            background: var(--header-color);
        }
        .category-hover:hover {
            border: 1px solid var(--header-color);
            background: white;
        }
        .category-hover:hover img {
            transform: scale(1.1);  
        }
    `;

    const { custom_design } = headersetting || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto  bg-white relative group ">
            <style>{styleCss}</style>
            <SectionHeadingSixteen
                title_color={title_color}
                title={title || 'Top Categories'}
            />
            <div className="relative z-[2]">
                <div className=" gap-2 lg:cursor-pointer lg:group-hover:opacity-100  lg:opacity-0 duration-500">
                    <div
                        className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-28 `}
                    >
                        <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
                    </div>
                    <div
                        className={`${nextEl} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-28  `}
                    >
                        <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
                    </div>
                </div>
            </div>

            <DefaultSlider
                prevEl={prevEl}
                nextEl={nextEl}
                loop={isLoop}
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
                {category?.map((productData: any) => (
                    <SwiperSlide key={productData.id}>
                        <Card item={productData} />
                    </SwiperSlide>
                ))}
            </DefaultSlider>
        </div>
    );
};

export default FeaturedSixteen;

const Card = ({ item }: any) => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 overflow-hidden h-60 rounded-lg border-[1px] category-hover duration-500 bg-gray-100">
            <div className="">
                <img
                    src={iconImg + item.icon}
                    alt="Mountain"
                    className="h-28 w-28 duration-500"
                />
            </div>

            <div className="text-center font-twelve">
                <Link href={'/category/' + item.id}>
                    <p className="uppercase text-sm font-semibold text-gray-800 mb-4">
                        {item.name}
                    </p>
                </Link>
            </div>
        </div>
    );
};

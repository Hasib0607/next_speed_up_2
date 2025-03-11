'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Controller,
    EffectCreative,
    EffectFade,
} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { sliderImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const HeroFortyThree = ({ slider, design }: any) => {
    let menu = [''];

    const nextEl = 'hero-slider-next';
    const prevEl = 'hero-slider-prev';

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const pagination = {
        el: '.swiper-pagination-five',
        clickable: true,
        bulletElement: `swiper-pagination-bullet`,

        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + menu + '</span>';
        },
    };

    const styleCss = `
    .arrow-hover-five {
        color: ${bgColor};
        
    }
    .hero-btn {
        border: 1px solid ${bgColor};
        color: ${bgColor};
        
    }
    .arrow-hover-five:hover {
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${bgColor};
        
    }
      `;

    return (
        <div className="group z-0 relative">
            <style>{styleCss}</style>

            {/* Desktop Arrows (Medium & Large devices) */}
            <div className="hidden md:flex lg:cursor-pointer gap-2">
                {/* Medium devices (md) */}
                <div
                    className={`${prevEl} hidden md:flex lg:hidden h-9 w-9 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute left-4 top-[50%] translate-y-[-50%] z-10`}
                >
                    <ChevronLeftIcon className="h-9 w-9 font-serif font-bold" />
                </div>
                <div
                    className={`${nextEl} hidden md:flex lg:hidden h-9 w-9 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute right-4 top-[50%] translate-y-[-50%] z-10`}
                >
                    <ChevronRightIcon className="h-9 w-9 font-serif font-bold" />
                </div>

                {/* Large devices (lg) */}
                <div
                    className={`${prevEl} hidden lg:flex h-10 w-10 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute left-4 top-[50%] translate-y-[-50%] z-10`}
                >
                    <ChevronLeftIcon className="h-10 w-10 font-serif font-bold" />
                </div>
                <div
                    className={`${nextEl} hidden lg:flex h-10 w-10 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute right-4 top-[50%] translate-y-[-50%] z-10`}
                >
                    <ChevronRightIcon className="h-10 w-10 font-serif font-bold" />
                </div>
            </div>

            {/* Mobile Arrows (Small devices) */}
            <div className="flex md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10 gap-2">
                <div
                    className={`${prevEl} h-8 w-8 bg-gray-200 arrow-hover-five duration-500 text-gray-600`}
                >
                    <ChevronLeftIcon className="h-8 w-8" />
                </div>
                <div
                    className={`${nextEl} h-8 w-8 bg-gray-200 arrow-hover-five duration-500 text-gray-600`}
                >
                    <ChevronRightIcon className="h-8 w-8" />
                </div>
            </div>

            <Swiper
                navigation={{
                    prevEl: `.${prevEl}`,
                    nextEl: `.${nextEl}`,
                }}
                speed={1000}
                effect={'fade'}
                loop={true}
                pagination={pagination}
                autoplay={{
                    delay: 2000,
                }}
                modules={[Navigation, Controller, EffectCreative, EffectFade]}
                className="mySwiper relative"
            >
                {slider?.map((s: any) => (
                    <SwiperSlide key={s.id}>
                        <div className="">
                            <div
                                style={{ color: s?.color }}
                                className="absolute z-[1] text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] md:max-w-[450px] px-4 sm:px-0 flex flex-col gap-y-2 md:gap-y-4 items-center"
                            >
                                <p className="md:text-lg text-xs md:text-center md:leading-5">
                                    {s?.subtitle}
                                </p>
                                <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                                    {s?.title}
                                </h1>
                                <Link
                                    href={s?.link ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h1 className="lg:px-6 px-3 md:py-2 py-1 hero-btn duration-300 lg:text-base text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer uppercase font-medium">
                                        Explore{' '}
                                    </h1>
                                </Link>
                            </div>
                        </div>
                        <img
                            className="min-h-[200px] min-w-full"
                            src={sliderImg + s.image}
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroFortyThree;

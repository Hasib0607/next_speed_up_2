'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Pagination,
    Autoplay,
    Navigation,
    Controller,
    EffectCreative,
    EffectFade,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { sliderImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const HeroTwentyTwo = ({ slider, design }: any) => {
    let menu = [''];

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const nextEl = 'hero-slider-next';
    const prevEl = 'hero-slider-prev';

    const pagination = {
        el: '.swiper-pagination-fourteen',
        clickable: true,
        bulletElement: `swiper-pagination-bullet`,

        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + menu + '</span>';
        },
    };

    const styleCss = `

      .swiper-pagination-fourteen {
        position: absolute;
        bottom: 20px !important;
        left: 50% !important;
        transform: translateX(-50%);
        width: auto !important;
        margin: 0;
        display: flex;
        z-index: 1000;
        gap: 1px;
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        opacity: 1;
        background:  ${textColor};
    
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet-active {
        width: 12px;
        height: 12px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${bgColor};

    }

    .btn-color {
        background: black;
        color:white;
        border:2px solid  black ;
        padding:10px 50px
       

    }
    .btn-color:hover {
        background: ${bgColor};
        color: ${textColor};
        border:2px solid  ${bgColor} ;

    }
    .arrow-color:hover {
        color: ${bgColor};
    }
      `;

    return (
        <div className="group z-0 relative ">
            <style>{styleCss}</style>
            <div>
                <div className="swiper-pagination-fourteen"></div>
            </div>

            <div className=" gap-2 sm:flex hidden lg:cursor-pointer">
                <div
                    className={`${prevEl}   text-gray-600 arrow-color absolute left-4 top-[50%] -translate-y-1/2 z-10 `}
                >
                    <ChevronLeftIcon className="h-12 font-serif font-bold" />
                </div>
                <div
                    className={`${nextEl}  text-gray-600 arrow-color absolute right-4 top-[50%] -translate-y-1/2 z-10 `}
                >
                    <ChevronRightIcon className="h-12 font-serif font-bold" />
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
                spaceBetween={30}
                pagination={pagination}
                autoplay={{
                    delay: 5000,
                }}
                modules={[
                    Pagination,
                    Autoplay,
                    Navigation,
                    Controller,
                    EffectCreative,
                    EffectFade,
                ]}
                className="mySwiper relative"
            >
                {slider?.map((s: any) => (
                    <SwiperSlide key={s.id}>
                        <div className="">
                            <div
                                style={{ color: s?.color }}
                                className="sm:pr-[50%] absolute top-[30%] lg:top-[40%] lg:left-60 md:left-[120px] sm:left-[60px] px-5 sm:px-0"
                            >
                                <h1 className="xl:text-4xl md:text-[28px] text-[22px] font-medium">
                                    {s?.title}
                                </h1>
                                <p className="md:text-xl text-sm">
                                    {s?.subtitle}
                                </p>
                                <Link
                                    href={s?.link ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="lg:px-5 px-2 lg:py-2 py-1 mt-5 bg-transparent border-white bg-slate-800 border-2 text-white font-seven lg:text-lg text-xs md:block hidden w-max btn-color duration-500 lg:cursor-pointer font-semibold">
                                        subscribe
                                        <AiOutlineArrowRight className="text-white inline ml-2" />
                                    </div>{' '}
                                </Link>
                            </div>
                        </div>

                        <img
                            className="h-auto min-w-full"
                            src={sliderImg + s.image}
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroTwentyTwo;

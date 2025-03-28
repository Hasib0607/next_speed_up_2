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
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { sliderImg } from '@/site-settings/siteUrl';

const HeroThirtyFour = ({ slider, design }: any) => {
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
        bottom: 10px !important;
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
        width: 7px;
        height: 7px;
        opacity: 1;
        background:  ${textColor};
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet-active {
        width: 7px;
        height: 7px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${bgColor};

    }

    .btn-color:hover {
        background: ${bgColor};
        color: ${textColor};

    }
    
    .arrow-color:hover {
        background: ${bgColor};
        color: ${textColor};
    }
    .arrow-color {
        color: ${bgColor};
    }
`;

    return (
        <div className="bg-[#F9F8FF]">
            <div className="z-0 relative sm:container px-5 pt-3 group">
                <style>{styleCss}</style>

                <div>
                    <div className="swiper-pagination-fourteen"></div>
                </div>

                <div className="hidden lg:flex lg:cursor-pointer">
                    <div
                        className={`${prevEl} text-gray-600 arrow-color absolute h-10 w-14 flex justify-center items-center bg-white left-5 top-[50%] -translate-y-1/2 z-10 `}
                    >
                        <BsArrowLeft className="text-xl font-bold" />
                    </div>
                    <div
                        className={`${nextEl} text-gray-600 arrow-color absolute h-10 w-14 flex justify-center items-center bg-white right-5 top-[50%] -translate-y-1/2 z-10 `}
                    >
                        <BsArrowRight className="text-xl font-bold" />
                    </div>
                </div>

                <Swiper
                    navigation={{
                        prevEl: `.${prevEl}`,
                        nextEl: `.${nextEl}`,
                    }}
                    speed={1000}
                    loop={true}
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
                                    className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 md:max-w-sm max-w-[250px] px-4 sm:px-0 lg:left-14 xl:left-24 md:left-10 sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
                                >
                                    <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                                        {s?.title}
                                    </h1>
                                    <p className="md:text-lg text-xs md:text-center md:leading-5">
                                        {s?.subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <img
                                    className="h-auto min-w-full rounded-lg"
                                    src={sliderImg + s.image}
                                    alt=""
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HeroThirtyFour;

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

// import './heroSixteenCss/herosixteen.css'
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { BiRightArrowAlt } from 'react-icons/bi';
import { sliderImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const HeroTwentyOne = ({ slider, design }: any) => {
    let menu = [''];
    let isLoop = slider.length > 1;

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
        border:2px solid  ${bgColor} ;
        color: ${bgColor};
    }
`;
    return (
        <div className="z-0 relative sm:container px-5 mt-3 group">
            <style>{styleCss}</style>

            <div>
                <div className="swiper-pagination-fourteen"></div>
            </div>

            <div className="hidden lg:group-hover:flex lg:cursor-pointer">
                <div
                    className={`${prevEl}   text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-white rounded-full left-6 top-[50%] -translate-y-1/2 z-10 `}
                >
                    <ChevronLeftIcon className="h-6 font-serif font-bold" />
                </div>
                <div
                    className={`${nextEl}  text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-white rounded-full right-6 top-[50%] -translate-y-1/2 z-10 `}
                >
                    <ChevronRightIcon className="h-6 font-serif font-bold" />
                </div>
            </div>

            <Swiper
                navigation={{
                    prevEl: `.${prevEl}`,
                    nextEl: `.${nextEl}`,
                }}
                speed={1000}
                // effect={"fade"}
                loop={isLoop}
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
                                {/* <p className='h-[2px] w-10 bg-black mx-auto md:block hidden'></p> */}
                                <p className="md:text-lg text-xs md:text-center md:leading-5">
                                    {s?.subtitle}
                                </p>
                                {s?.link && (
                                    <Link
                                        href={s?.link ?? '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h1
                                            className={`lg:px-10 px-6 md:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer bg-black text-white rounded-full font-medium ${
                                                !s?.title && 'sm:mt-20 mt-10'
                                            }`}
                                        >
                                            Shop Now{' '}
                                            <BiRightArrowAlt className="inline" />
                                        </h1>
                                    </Link>
                                )}
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
    );
};

export default HeroTwentyOne;

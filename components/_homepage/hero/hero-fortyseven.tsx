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
import { BiRightArrowAlt } from 'react-icons/bi';
import { sliderImg } from '@/site-settings/siteUrl';

const HeroFortySeven = ({ slider, design }: any) => {
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
        width: 33px;
        height: 5px;
        border-radius: 0px;
        opacity: 0.6;
        background: white;
    
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet-active {
        width: 33px;
        height: 5px;
        border-radius: 0px;
        opacity: 1;
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
        <div className="bg-[#F2F4F8] z-0 relative">
            <div className="lg:col-span-2 relative">
                <style>{styleCss}</style>

                <Swiper
                    navigation={{
                        prevEl: `.${prevEl}`,
                        nextEl: `.${nextEl}`,
                    }}
                    speed={1000}
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
                                    className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 px-4 sm:px-0 lg:left-14 xl:left-24 md:left-10 sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
                                >
                                    <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                                        {s?.title}
                                    </h1>
                                    <p className="md:text-lg text-xs md:text-center md:leading-5">
                                        {s?.subtitle}
                                    </p>
                                    {s?.link && (
                                        <a
                                            href={s?.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <h1
                                                className={`px-2 md:px-6 md:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer bg-black text-white rounded-full font-medium ${
                                                    !s?.title &&
                                                    'sm:mt-20 mt-10'
                                                }`}
                                            >
                                                Shop Now{' '}
                                                <BiRightArrowAlt className="inline" />
                                            </h1>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="relative w-full h-auto">
                                <img
                                    className="w-full h-auto object-cover"
                                    src={sliderImg + s.image}
                                    alt=""
                                />
                                <div className="absolute top-0 left-0 h-full w-1/4 bg-white/10 backdrop-blur-sm z-auto pointer-events-none"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Swiper Pagination */}
                <div className="swiper-pagination-fourteen absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"></div>
            </div>
        </div>
    );
};

export default HeroFortySeven;

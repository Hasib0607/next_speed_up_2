'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { bannerImg } from '@/site-settings/siteUrl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PromoBottomFortyThree = ({ banner, design }: any) => {
    const prevEl = 'promo-slider-prev';
    const nextEl = 'promo-slider-next';

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .arrow-hover-five {
        color: ${bgColor};
        
    }
    .arrow-hover-five:hover {
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${bgColor};
        
    }
      `;

    return (
        banner?.length > 0 && (
            <div className="bg-white relative">
                <style>{styleCss}</style>
                <div className="sm:container px-5 sm:py-10 py-5">
                    {/* Custom Navigation Arrows */}
                    <div className="lg:cursor-pointer">
                        <div
                            className={`${prevEl} flex h-10 w-10 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2 z-10 items-center justify-center cursor-pointer`}
                        >
                            <ChevronLeftIcon className="h-6 w-6 font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} flex h-10 w-10 bg-gray-300 arrow-hover-five duration-500 text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 z-10 items-center justify-center cursor-pointer`}
                        >
                            <ChevronRightIcon className="h-6 w-6 font-serif font-bold" />
                        </div>
                    </div>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            1024: { slidesPerView: 2, spaceBetween: 20 }, // 2 slides on large screens
                        }}
                        loop={true}
                        navigation={{
                            prevEl: `.${prevEl}`,
                            nextEl: `.${nextEl}`,
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {banner?.map((ban: any) => (
                            <SwiperSlide key={ban?.id}>
                                <div className="relative overflow-hidden">
                                    <a
                                        href={ban?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            alt="gallery"
                                            className="min-w-full h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                            src={bannerImg + ban?.image}
                                        />
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        )
    );
};

export default PromoBottomFortyThree;

'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { sliderImg } from '@/site-settings/siteUrl';

const HeroFour = ({ slider }: any) => {
    if (slider?.length === 0) {
        return;
    }

    return (
        <div className="z-0">
            <Swiper
                loop={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {slider?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="">
                            <div
                                style={{ color: item?.color }}
                                className="lg:pr-[50%] pr-[30%] absolute top-1/2 -translate-y-1/2 xl:left-48 lg:left-32 md:left-[120px] left-5"
                            >
                                <h1 className={`md:text-xl text-sm sm:mb-2`}>
                                    {item?.subtitle}
                                </h1>
                                <p className="xl:text-4xl md:text-[28px] text-[20px] font-medium">
                                    {item?.title}
                                </p>
                            </div>

                            <img
                                className="w-full h-auto z-0"
                                src={sliderImg + item?.image}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroFour;

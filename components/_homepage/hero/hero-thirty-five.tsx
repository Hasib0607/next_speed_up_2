'use client';

import { sliderImg } from '@/site-settings/siteUrl';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
    Autoplay,
    Controller,
    EffectCreative,
    EffectFade,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroThirtyFive = ({ slider }: any) => {
    return (
        <div className="border-b-2 border-black mt-20">
            <div className="z-0 relative sm:container px-5 group">
                <Swiper
                    speed={2000}
                    loop={true}
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
                                    className="h-auto min-w-full"
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

export default HeroThirtyFive;

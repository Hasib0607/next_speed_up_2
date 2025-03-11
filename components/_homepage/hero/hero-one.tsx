'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { sliderImg } from '@/site-settings/siteUrl';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

const HeroOne = ({ slider }: any) => {
    return (
        <>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2000,
                }}
                spaceBetween={30}
                effect={'fade'}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className="mySwiper"
            >
                {slider?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="">
                            <div
                                style={{ color: item?.color }}
                                className="md:pr-[50%] pr-[40%] absolute top-1/2 -translate-y-1/2 font-thin xl:left-48 lg:left-32 md:left-[120px] left-5 space-y-3"
                            >
                                <h1 className={`md:text-xl text-sm`}>
                                    {item?.subtitle}
                                </h1>
                                <p className="xl:text-4xl md:text-[28px] text-[22px] leading-none font-medium ">
                                    {item?.title}
                                </p>
                            </div>
                        </div>
                        <img
                            alt={item?.title}
                            src={sliderImg + item.image}
                            className="h-auto min-w-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default HeroOne;

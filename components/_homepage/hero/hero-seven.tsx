'use client';

import { Autoplay, Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { sliderImg } from '@/site-settings/siteUrl';
import './hero-seven.css';

const HeroSeven = ({ slider, design }: any) => {
    let menu = [''];
    let isLoop = slider.length > 1;

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const pagination = {
        el: '.swiper-pagination-seven',
        clickable: true,
        bulletElement: `swiper-pagination-bullet`,

        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '">' + menu + '</span>';
        },
    };

    const styleCss = `
      .swiper-pagination-seven .swiper-pagination-bullet {
        background:  ${textColor};
    }
    .swiper-pagination-seven .swiper-pagination-bullet-active {
        background: ${bgColor};
    }
      `;

    return (
        <div className="group z-0 mt-3 relative sm:container px-5 bg-white w-full">
            <style>{styleCss}</style>
            <div>
                <div className="swiper-pagination-seven hidden sm:block"></div>
            </div>
            <Swiper
                loop={isLoop}
                spaceBetween={30}
                pagination={pagination}
                autoplay={{
                    delay: 5000,
                }}
                modules={[Pagination, Autoplay, Navigation, Controller]}
                className={`mySwiper renderBullet relative rounded-lg`}
            >
                {slider?.map((s: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="absolute top-1/2 -translate-y-1/2 left-5 sm:left-[10%] max-w-[50%] xl:max-w-[40%]">
                            <div style={{ color: s?.color }} className="">
                                <h1 className="xl:text-4xl md:text-[24px] text-[14px] font-seven mb-1 md:mb-3 font-bold">
                                    {s?.title}
                                </h1>
                                <p className="md:text-base text-xs font-seven">
                                    {s?.subtitle}
                                </p>
                            </div>
                        </div>
                        {/* <Image
                            className="rounded-lg h-auto min-w-full object-cover"
                            src={`${sliderImg}/${s.image}`}
                            alt="Hero Banner"
                            width={100}
                            height={100}
                            unoptimized
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G4vAgABqwEGEzLyIQAAAABJRU5ErkJggg=="
                        /> */}
                        <img
                            className="rounded-lg h-auto min-w-full"
                            src={`${sliderImg}/${s.image}`}
                            width={100}
                            height={100}
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSeven;

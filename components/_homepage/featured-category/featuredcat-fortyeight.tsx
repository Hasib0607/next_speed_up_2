// components/FeaturedFortyEight.tsx

'use client';

import { catImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const FeaturedFortyEight = ({ category, design }: any) => {
    const bgColor = design?.header_color;

    const styleCss = `
    .category-hover:hover {
        color:  ${bgColor};
        border-bottom: 3px solid ${bgColor};  
    }
    `;

    return (
        <div>
            <style>{styleCss}</style>
            <div className="sm:container px-5 sm:py-10 py-5">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {category?.map((item: any) => (
                        <SwiperSlide key={item.id}>
                            <FeatureCatFortyEight item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedFortyEight;

const FeatureCatFortyEight = ({ item }: any) => {
    return (
        <Link
            href={`/category/${item.id}`}
            className="relative h-auto w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100"
        >
            <img
                src={catImg + item.banner}
                className="h-full w-full hover:scale-105 duration-500"
                alt=""
            />
            <div className="absolute top-1/4 -translate-y-1/2 uppercase text-black">
                <span className="text-3xl font-bold text-white category-hover">
                    {item.name}
                </span>
            </div>
        </Link>
    );
};

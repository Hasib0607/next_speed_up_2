'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import DefaultSlider from '@/components/slider/default-slider';
import { iconImg } from '@/site-settings/siteUrl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const FeaturedTwentyEight = ({ category, design, headersetting }: any) => {
    const prevEl = 'feature-category-prev';
    const nextEl = 'feature-category-next';

    let isLoop = category.length > 1;
    const styleCss = `
    .feature-category-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
    }
      .feature-category-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .category-hover:hover {

    }
  `;

    const { custom_design } = headersetting || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};

    return (
        <div data-aos="fade-up" className="sm:container px-5 relative">
            <style>{styleCss}</style>
            <div className="text-center py-10 flex items-center justify-center">
                <p className="border-b-[3px] border-dashed sm:w-full w-10"></p>
                <p
                    style={{ color: title_color }}
                    className="min-w-max px-2 text-3xl xl:text-4xl font-bold"
                >
                    {title || 'ক্যাটেগরীজ'}
                </p>
                <p className="border-b-[3px] border-dashed sm:w-full w-10"></p>
            </div>
            <div className="relative z-10">
                <div className=" lg:block hidden lg:cursor-pointer ">
                    <div className={`${prevEl} absolute -left-4  top-28 `}>
                        <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
                    </div>
                    <div className={`${nextEl} absolute -right-4 top-28  `}>
                        <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
                    </div>
                </div>
            </div>

            <DefaultSlider
                prevEl={prevEl}
                nextEl={nextEl}
                loop={isLoop}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                }}
            >
                {category?.map((productData: any) => (
                    <SwiperSlide key={productData.id}>
                        <Card item={productData} />
                    </SwiperSlide>
                ))}
            </DefaultSlider>
        </div>
    );
};

export default FeaturedTwentyEight;

const Card = ({ item }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Link href={'/category/' + item.id}>
                <div className="flex flex-col items-center justify-center gap-8 overflow-hidden h-60 category-hover group hover:grayscale-[50%]">
                    <div className="" onClick={() => setOpen(!open)}>
                        <img
                            src={iconImg + item.icon}
                            alt="Mountain"
                            className="h-28 w-28"
                        />
                    </div>

                    <div className="text-center font-twelve w-max relative px-1">
                        <p className="text-xl font-semibold text-gray-800 whitespace-normal overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {' '}
                            {item.name}
                        </p>
                        <p className="h-[2px] w-0 group-hover:w-full duration-700 absolute bottom-0 left-0 bg-red-200"></p>
                    </div>
                </div>
            </Link>
        </>
    );
};

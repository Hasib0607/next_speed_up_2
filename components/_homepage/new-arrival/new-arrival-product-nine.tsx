'use client';

import { useState } from 'react';
import {
    A11y,
    Autoplay,
    Controller,
    EffectFade,
    Navigation,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { productCurrentPrice } from '@/helpers/littleSpicy';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Details from '../../_product-details-page/components/details';
import SectionHeadingNine from '../../section-heading/section-heading-nine';

const NewArrivalProductNine = ({ product, design, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    const prevEl = 'new-product-prev';
    const nextEl = 'new-product-next';

    const styleCss = `
    .new-product-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
    }
        .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    `;

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="relative group">
                <style>{styleCss}</style>
                <SectionHeadingNine
                    title={title || 'New Arrivals'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div className="relative">
                    <div className=" gap-2 hidden group-hover:block lg:cursor-pointer ">
                        <div
                            className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4 top-10 z-[2] `}
                        >
                            <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-10 z-[2] `}
                        >
                            <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
                        </div>
                    </div>
                </div>

                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 5000,
                    }}
                    modules={[
                        Autoplay,
                        A11y,
                        EffectFade,
                        Navigation,
                        Controller,
                    ]}
                    breakpoints={{
                        375: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    navigation={{
                        prevEl: `.${prevEl}`,
                        nextEl: `.${nextEl}`,
                    }}
                    className="mySwiper"
                >
                    {product?.length > 0 &&
                        product?.map((productData: any) => (
                            <SwiperSlide key={productData.id}>
                                <Card item={productData} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NewArrivalProductNine;

const Card = ({ item }: any) => {
    const price = productCurrentPrice(item);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="flex xl:space-x-5 lg:space-x-3 space-x-2 h-28 mb-10 relative">
                    {/* out of stock  */}
                    {item?.quantity === '0' && (
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                                <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                    Sold Out
                                </p>
                            </div>
                        </Link>
                    )}
                    <div className="" onClick={() => setOpen(!open)}>
                        <img
                            src={productImg + item.image[0]}
                            alt="Mountain"
                            className="h-28 w-28"
                        />
                    </div>
                    <div className=" flex flex-col justify-between">
                        <div>
                            <h6 className="text-base capitalize font-semibold font-twelve text-gray-500">
                                {' '}
                                {item.name.slice(0, 18)}
                                {item.name.length > 18 && '...'}
                            </h6>
                        </div>
                        <div className="text-gray-600 text-lg font-semibold">
                            <BDT /> {price}
                        </div>
                        <div className="bg-gray-700 text-white px-3 text-sm py-1 w-max">
                            <p>NEW</p>
                        </div>
                    </div>
                </div>
            </Link>
            <QuickView open={open} setOpen={setOpen}>
                <Details data={{ product_id: item?.id }} />
            </QuickView>
        </>
    );
};

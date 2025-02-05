'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SectionHeadingNine from '@/components/section-heading/section-heading-nine';
import { productImg } from '@/site-settings/siteUrl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
    A11y,
    Autoplay,
    Controller,
    EffectFade,
    Navigation,
} from 'swiper/modules';
import Details from '@/components/_product-details-page/components/details';
import QuikView from '@/utils/quick-view';
import { productCurrentPrice } from '@/helpers/littleSpicy';
import BDT from '@/utils/bdt';

const FeatureProductNine = ({
    feature_product,
    design,
    headersetting,
}: any) => {
    const prevEl: any = 'feature-product-prev';
    const nextEl: any = 'feature-product-next';
    let isLoop = feature_product.length > 1;
    const styleCss = `
    .feature-product-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .feature-product-next:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
  `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="relative group">
                <style>{styleCss}</style>
                <SectionHeadingNine
                    title={title}
                    subtitle={''}
                    title_color={title_color}
                />
                <div className="relative">
                    <div className=" gap-2 hidden group-hover:block lg:cursor-pointer ">
                        <div
                            className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-10 z-[2] `}
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
                    loop={isLoop}
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
                    {feature_product?.length > 0 &&
                        feature_product
                            ?.slice(0, 10)
                            ?.map((item: any) => (
                                <SwiperSlide key={item.id}>
                                    <Card item={item} />
                                </SwiperSlide>
                            ))}
                </Swiper>
            </div>
        </div>
    );
};

export default FeatureProductNine;

const Card = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  
    const price = productCurrentPrice(item);

    return (
        <>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="flex xl:space-x-5 lg:space-x-3 space-x-2 h-28 relative">
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
            <QuikView open={open} setOpen={setOpen}>
                <Details data={{ product_id: item?.id }} />
            </QuikView>
        </>
    );
};

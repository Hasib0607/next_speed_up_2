'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Card56 from '@/components/card/card56';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';

const FeatureProductTwentySix = ({
    feature_product,
    design,
    headersetting,
}: any) => {
    const prevEl = 'feature-product-prev';
    const nextEl = 'feature-product-next';

    const styleCss = `
    .feature-product-prev {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
        .feature-product-next{
            color:  ${design?.header_color};
            border: 1px solid ${design?.header_color};
    }
        .feature-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
        .feature-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
        opacity:1;
        background: white;
    }
    `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full ">
            <style>{styleCss}</style>
            <div className="pb-2 text-2xl">
                <p style={{ color: title_color }}>{title}</p>
            </div>
            <div className="arrow-hov relative">
                <div className="">
                    <div className="arrow gap-2 lg:cursor-pointer opacity-0">
                        <div
                            className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                    </div>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    className=""
                    breakpoints={{
                        250: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        976: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {feature_product?.length > 0 &&
                        feature_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="py-2">
                                    <Card56 item={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductTwentySix;

'use client';

import Card56 from '@/components/card/card56';
import DefaultSlider from '@/components/slider/default-slider';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { SwiperSlide } from 'swiper/react';

const BestSellerTwentySix = ({
    best_sell_product,
    design,
    headersetting,
}: any) => {
    const prevEl = 'best-product-prev';
    const nextEl = 'best-product-next';

    const styleCss = `
    .best-product-prev {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
        .best-product-next{
            color:  ${design?.header_color};
            border: 1px solid ${design?.header_color};
    }
        .best-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
        .best-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
        opacity:1;
        background: white;
    }
    `;

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="flex justify-between items-center pb-2 text-2xl">
                <p style={{ color: title_color }}>{title}</p>
                <div className="">
                    <div className="lg:cursor-pointer flex items-center gap-2">
                        <div
                            className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear z-[5] `}
                        >
                            <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear z-[5] `}
                        >
                            <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
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
                    {best_sell_product?.length > 0 &&
                        best_sell_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="py-2 w-full">
                                    <Card56 item={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default BestSellerTwentySix;

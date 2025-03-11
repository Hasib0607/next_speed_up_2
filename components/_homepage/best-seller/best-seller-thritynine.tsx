'use client';

import Card67 from '@/components/card/card67';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';

const BestSellerThirtyNine = ({ best_sell_product, headersetting }: any) => {
    const prevEl = 'best-product-prev-thirtynine';
    const nextEl = 'best-product-next-thirtynine';

    let isLoop = best_sell_product.length > 1;

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="pl-5 sm:py-10 py-5">
            <div className=" relative">
                <div className="text-center pb-10">
                    <p
                        style={{ color: title_color }}
                        className="font-semibold text-[24px]"
                    >
                        {title}
                    </p>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={isLoop}
                    paginationType={'fraction'}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 5.35,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {best_sell_product?.length > 0 &&
                        best_sell_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                    <Card67 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default BestSellerThirtyNine;

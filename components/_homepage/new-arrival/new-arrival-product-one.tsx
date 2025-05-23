'use client';

import ProductCardOne from '@/components/card/product-card/product-card-one';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
import Arrow from '@/utils/arrow';
import { SwiperSlide } from 'swiper/react';

const NewArrivalProductOne = ({ product, headersetting }: any) => {
    const prev1 = 'best_seller_Prev1';
    const next1 = 'best_seller_Next1';

    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="shadow-lg sm:container px-5 sm:py-10 py-5 rounded-md">
            <div className="py-5 pt-1 flex justify-between items-center">
                <SectionHeadingFive
                    title={title || 'New Arrivals'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div className="pt-14 hidden sm:block">
                    <Arrow prevEl={prev1} nextEl={next1}></Arrow>
                </div>
            </div>

            <div className="">
                <DefaultSlider
                    prevEl={prev1}
                    nextEl={next1}
                    breakpoints={{
                        350: {
                            slidesPerView: 1,
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
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any) => {
                            return (
                                <SwiperSlide key={item?.id}>
                                    <ProductCardOne item={item} />
                                </SwiperSlide>
                            );
                        })}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default NewArrivalProductOne;

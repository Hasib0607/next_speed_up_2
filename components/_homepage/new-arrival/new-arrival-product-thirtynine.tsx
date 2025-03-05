'use client';

import Card67 from '../../card/card67';
import { SwiperSlide } from 'swiper/react';
import DefaultSlider from '../../slider/default-slider';

const NewArrivalProductThirtyNine = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    const prevEl = 'new-product-prev-thirtynine';
    const nextEl = 'new-product-next-thirtynine';

    return (
        <div className="pl-5 sm:py-10 py-5">
            <div className=" relative">
                <div className="text-center pb-10">
                    <p
                        className="font-semibold text-[24px]"
                        style={{ color: title_color || '#000000' }}
                    >
                        {title || 'New Arrival Product'}
                    </p>
                </div>
                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
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
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <Card67 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default NewArrivalProductThirtyNine;

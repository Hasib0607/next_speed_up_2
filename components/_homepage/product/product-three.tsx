'use client';

import Card23 from '@/components/card/card23';
import SectionHeadingSeven from '@/components/section-heading/section-heading-seven';
import DefaultSlider from '@/components/slider/default-slider';
import Arrowbetween from '@/utils/arrow-between';
import { SwiperSlide } from 'swiper/react';
const prev = 'valobashi_best_seller_Prev';
const next = 'valobashi_best_seller_Next';

const ProductThree = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    let isLoop = product.length > 1;

    return (
        <div className=" relative sm:py-10 py-5">
            <div className="sm:container px-5 mx-auto">
                <SectionHeadingSeven
                    titleColor={title_color || '#000'}
                    title={title || 'Regular Product'}
                    subtitle={''}
                />
                <div className="sm:container px-5 mt-20 absolute inset-0 flex items-center mx-auto">
                    <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
                </div>

                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    loop={isLoop}
                    breakpoints={{
                        350: {
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
                        1024: {
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
                    {product.map((productData: any) => (
                        <SwiperSlide key={productData.id}>
                            <Card23 item={productData} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default ProductThree;

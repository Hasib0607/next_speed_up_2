'use client';

import Card18 from '@/components/card/card18';
import SectionHeadingThirteen from '@/components/section-heading/section-heading-thirteen';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';

const FeatureProductThirteen = ({ feature_product, headersetting }: any) => {
    const prev = 'feature_productThirteen_prev';
    const next = 'feature_productThirteen_next';

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="bg-white">
            <div className="sm:container px-5 sm:py-10 py-5">
                <SectionHeadingThirteen
                    prev={prev}
                    next={next}
                    title={title}
                    title_color={title_color}
                />
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {feature_product?.length > 0 &&
                        feature_product
                            ?.slice(0, 10)
                            ?.map((item: any, index: any) => (
                                <SwiperSlide
                                    className="swiperjs-slide py-10"
                                    key={index}
                                >
                                    <Card18 item={item} />
                                </SwiperSlide>
                            ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductThirteen;

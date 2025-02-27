'use client';

import Card51 from '@/components/card/card51';
import SectionHeadingTwentySeven from '@/components/section-heading/section-heading-twenty-seven';
import DefaultSlider from '@/components/slider/default-slider';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { SwiperSlide } from 'swiper/react';

const FeatureProductTwentySeven = ({
    design,
    headersetting,
    feature_product,
}: any) => {
    const prevEl = 'feature-product-prev';
    const nextEl = 'feature-product-next';

    const styleCss = `
    .feature-product-prev {
        color:  ${design?.header_color};
        border: 1px solid transparent;
    }
    .feature-product-next{
        color:  ${design?.header_color};
        border: 1px solid transparent;
    }
    .feature-product-prev:hover {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .feature-product-next:hover {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
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
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="pb-2 flex justify-between items-center">
                <SectionHeadingTwentySeven
                    title={title}
                    title_color={title_color}
                />
                <div className=" gap-2 flex lg:cursor-pointer">
                    <div
                        className={`${prevEl}   text-gray-600 h-10 w-10 flex justify-center items-center bg-white rounded-full left-4 top-[50%] -translate-y-1/2`}
                    >
                        <BsArrowLeft className="h-6 font-serif font-bold" />
                    </div>
                    <div
                        className={`${nextEl}  text-gray-600 h-10 w-10 flex justify-center items-center bg-white rounded-full right-4 top-[50%] -translate-y-1/2 `}
                    >
                        <BsArrowRight className="h-6 font-serif font-bold" />
                    </div>
                </div>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    breakpoints={{
                        250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        976: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {feature_product?.length > 0 &&
                        feature_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <Card51 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductTwentySeven;

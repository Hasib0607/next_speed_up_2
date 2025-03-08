'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import Card40 from '@/components/card/card40';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import DefaultSlider from '@/components/slider/default-slider';
import Arrowbetween from '@/utils/arrow-between';

const BestSellerEight = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';

    return (
        <div className="bg-white ">
            <div className="sm:container px-5 sm:py-10 py-5 relative">
                <SectionHeadingSeventeen
                    title_color={title_color || '#000'}
                    title={title || 'Best Seller Products'}
                    subtitle={''}
                />
                <div className="demo">
                    <div className="sm:container px-5 mt-20 absolute inset-0 flex items-center ">
                        <Arrowbetween
                            prevEl={prev}
                            nextEl={next}
                        ></Arrowbetween>
                    </div>

                    <DefaultSlider
                        nextEl={next}
                        prevEl={prev}
                        breakpoints={{
                            250: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            560: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1000: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1600: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {product?.length > 0 &&
                            product?.map((item: any) => (
                                <SwiperSlide key={item.id}>
                                    <Card40 item={item} />
                                </SwiperSlide>
                            ))}
                    </DefaultSlider>
                </div>
            </div>
        </div>
    );
};

export default BestSellerEight;

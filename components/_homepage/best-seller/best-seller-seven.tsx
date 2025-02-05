'use client';

import dynamic from 'next/dynamic';
const Card11 = dynamic(() => import('@/components/card/card11'));
const SectionHeadingSeventeen = dynamic(
    () => import('@/components/section-heading/section-heading-seventeen')
);
import SliderFive from '@/components/slider/slider-five';
import Arrowbetween from '@/utils/arrow-between';
import { SwiperSlide } from 'swiper/react';

const BestSellerSeven = ({ headersetting, best_sell_product }: any) => {
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Flash Sale', title_color = '#000' } =
        bestSellProduct || {};

    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';

    return (
        <div className="container px-5 bg-white relative py-5">
            <SectionHeadingSeventeen
                title={title}
                subtitle={''}
                title_color={title_color}
            />
            <div className="relative px-5">
                <SliderFive prevEl={prev} nextEl={next}>
                    {best_sell_product?.length > 0 &&
                        best_sell_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <Card11 item={item} />
                            </SwiperSlide>
                        ))}
                </SliderFive>
                <div className="top-3 left-0 right-0 absolute inset-1 flex items-center">
                    <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
                </div>
            </div>
        </div>
    );
};

export default BestSellerSeven;

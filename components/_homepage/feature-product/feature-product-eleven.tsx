'use client';

import Card19 from '@/components/card/card19';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import SliderNine from '@/components/slider/slider-nine';
import Arrowbetween from '@/utils/arrow-between';
import { SwiperSlide } from 'swiper/react';

const FeatureProductEleven = ({ feature_product, headersetting }: any) => {
    const prev = 'daily_best_seller_Prev';
    const next = 'daily_best_seller_Next';

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 bg-white relative">
            <SectionHeadingSeventeen
                title={title}
                subtitle={''}
                title_color={title_color || '#000'}
            />
            <div className="mb-16 absolute inset-1 flex items-center">
                <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
            </div>

            <SliderNine prevEl={prev} nextEl={next}>
                {feature_product?.slice(0, 10).map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <Card19 item={item} />
                    </SwiperSlide>
                ))}
            </SliderNine>
        </div>
    );
};

export default FeatureProductEleven;

'use client';

import dynamic from 'next/dynamic';
const Card11 = dynamic(() => import('@/components/card/card11'), {
    ssr: false,
});

const SectionHeadingSeventeen = dynamic(
    () => import('@/components/section-heading/section-heading-seventeen')
);

import SliderFive from '@/components/slider/slider-five';
import Arrowbetween from '@/utils/arrow-between';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const BestSellerSeven = ({ best_sell_product }: any) => {
    const storeData = useSelector((state: any) => state.appStore.store); // Access updated Redux state
    const store_id = storeData?.id || null;

    const headerdata = useSelector((state: RootState) => state.home.header); // Access updated Redux state
    const { custom_design } = headerdata || {};
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
                        best_sell_product
                            ?.slice(0, 10)
                            .map((productData: any) => (
                                <SwiperSlide key={productData.id}>
                                    {' '}
                                    <Card11
                                        item={productData}
                                        productId={productData.id}
                                        store_id={store_id}
                                    />
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

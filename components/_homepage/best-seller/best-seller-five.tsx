'use client';

import Card4 from '@/components/card/card4';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
import { RootState } from '@/redux/store';
import Arrow from '@/utils/arrow';
import { useSelector } from 'react-redux';

import { SwiperSlide } from 'swiper/react';

const BestSellerFive = ({ best_sell_product, design }: any) => {
    const prev1 = 'best_seller_Prev1';
    const next1 = 'best_seller_Next1';

    const store = useSelector((state: RootState) => state.appStore.store); // Access updated Redux state
    const store_id = store?.id || null;

    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || null;
    if (!bestSellProduct) return null;
    const { title = 'Default Title', title_color = '#000' } =
        bestSellProduct || {};
        
    return (
        <div className="shadow-lg py-5 sm:pt-20 pt-10 rounded-md bg-white">
            <div className="py-5 pt-1 flex justify-between items-center container px-5">
                <SectionHeadingFive
                    title={title || 'Best Sellers'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div className="pt-14 hidden sm:block">
                    <Arrow prevEl={prev1} nextEl={next1}></Arrow>
                </div>
            </div>
            <div className="container px-5">
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
                            slidesPerView: 3,
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
                    {best_sell_product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card4
                                item={item}
                                design={design}
                                store_id={store_id}
                            />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default BestSellerFive;

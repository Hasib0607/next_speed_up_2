'use client';

import './best-seller-seventeen.css';
import image from './bg-img/17/show_divider_2_69x61.webp';
import Card31 from '@/components/card/card31';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import DefaultSlider from '@/components/slider/default-slider';
import Arrowbetween from '@/utils/arrow-between';
import {
    ParallaxBanner,
    ParallaxBannerLayer,
    ParallaxProvider,
} from 'react-scroll-parallax';
import { SwiperSlide } from 'swiper/react';
import img1 from './bg-img/17/offer_bg.webp';

const BestSellerSeventeen = ({ best_sell_product, headersetting }: any) => {
    const topBestDeals =
        best_sell_product?.length > 0 && best_sell_product.slice(0, 2);
    const topBestSecondDeals =
        best_sell_product?.length > 2 && best_sell_product.slice(2, 10);

    const prev = 'best_deals_seller_Prev';
    const next = 'best_deals_seller_Next';

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="relative z-0 h-full overflow-hidden">
            <div className="hidden lg:block">
                <ParallaxProvider>
                    <ParallaxBanner className="lg:aspect-[0.6/1] xl2:aspect-[0.7/1] xl:aspect-[1/1] bg-gray-100">
                        <ParallaxBannerLayer
                            image={img1.src}
                            speed={-100}
                            style={{
                                backgroundSize: 'contain',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </ParallaxBanner>
                </ParallaxProvider>
            </div>
            <div className="lg:absolute top-1/2 lg:-translate-y-1/2 left-1/2 lg:-translate-x-1/2 z-[1] sm:container px-5 xl:px-80 mx-auto">
                <div className="flex justify-center lg:pt-0 pt-10">
                    <SectionHeadingSeventeen
                        text={title || 'Best Deals'}
                        title_color={title_color || '#000'}
                    />
                </div>
                <div className="flex justify-center pt-2">
                    <img src={image.src} alt="" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 py-10 lg:pt-20 gap-8 ">
                    {topBestDeals?.map?.((item: any) => (
                        <Card31 key={item?.id} item={item} />
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute inset-1 flex items-center">
                        <Arrowbetween
                            prevEl={prev}
                            nextEl={next}
                        ></Arrowbetween>
                    </div>

                    <DefaultSlider
                        prevEl={prev}
                        nextEl={next}
                        breakpoints={{
                            350: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            480: {
                                slidesPerView: 1,
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
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1920: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {topBestSecondDeals?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                {' '}
                                <Card31 item={item} />
                            </SwiperSlide>
                        ))}
                    </DefaultSlider>
                </div>
            </div>
        </div>
    );
};

export default BestSellerSeventeen;

'use client';
import Card20 from '@/components/card/card20';
import SectionHeadingThirteen from '@/components/section-heading/section-heading-thirteen';
import GridSliderThirteen from '@/components/slider/grid-slider/grid-slider-thirteen';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const BestSellerThirteen = ({ best_sell_product }: any) => {
    const prev = 'bestseller_productThirteen_prev';
    const next = 'bestseller_productThirteen_next';

    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="bg-white ">
            {best_sell_product?.length > 0 && (
                <div className="sm:container px-5 sm:py-10 py-5">
                    <SectionHeadingThirteen
                        prev={prev}
                        next={next}
                        title={title || 'Best Seller'}
                        title_color={title_color || '#000'}
                    />
                    <GridSliderThirteen
                        prevEl={prev}
                        nextEl={next}
                        isLoop={best_sell_product?.length > 1}
                        breakpoints={{
                            40: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            750: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                        grid={{ rows: 3 }}
                        className={'h-[380px] mt-2 md:my-12'}
                    >
                        {best_sell_product?.length &&
                            best_sell_product
                                ?.slice(0, 20)
                                .map((item: any, index: any) => (
                                    <SwiperSlide
                                        className="swiperjs_grid_three"
                                        key={index}
                                    >
                                        <Card20
                                            item={item}
                                            store_id={store_id}
                                        />
                                    </SwiperSlide>
                                ))}
                    </GridSliderThirteen>
                </div>
            )}
        </div>
    );
};

export default BestSellerThirteen;

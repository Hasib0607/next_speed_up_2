'use client';
import { useState } from 'react';
import Card67 from '@/components/card/card67';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const BestSellerThirtyNine = ({ best_sell_product, design }: any) => {
    const [animate, setAnimate] = useState(false);

    const prevEl = 'best-product-prev-thirtynine';
    const nextEl = 'best-product-next-thirtynine';

    let isLoop = best_sell_product.length > 1;

    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;
    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="pl-5 sm:py-10 py-5">
            <div className=" relative">
                <div className="text-center pb-10">
                    <p
                        style={{ color: title_color }}
                        className="font-semibold text-[24px]"
                    >
                        {title}
                    </p>
                </div>

                {/* <div className="gap-10 flex lg:cursor-pointer absolute bottom-16 left-1/2 -translate-x-1/2 z-[2]">
          <div className={`${prevEl} lg:cursor-pointer `}>
            <ChevronLeftIcon className="h-4 font-serif font-bold" />
          </div>
          <div className=""></div>
          <div className={`${nextEl} lg:cursor-pointer`}>
            <ChevronRightIcon className="h-4 font-serif font-bold" />
          </div>
        </div> */}

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={isLoop}
                    paginationType={'fraction'}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 5.35,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {best_sell_product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <div
                                className={`${
                                    animate
                                        ? 'translate-y-0'
                                        : 'translate-y-[25px]'
                                } duration-1000 `}
                            >
                                <Card67
                                    item={item}
                                    design={design}
                                    store_id={store_id}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default BestSellerThirtyNine;

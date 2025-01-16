'use client';

import Card54 from '@/components/card/card54';
import SectionHeadingThirty from '@/components/section-heading/section-heading-thirty';
import DefaultSlider from '@/components/slider/default-slider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const BestSellerThirty = ({ best_sell_product, design }: any) => {
    const prevEl = 'best-product-prev';
    const nextEl = 'best-product-next';

    let isLoop = best_sell_product.length > 1;

    const styleCss = `
    .btn-best-product {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid transparent;
    }
    .btn-best-product:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .best-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .best-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .best-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .best-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
 `;

    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;
    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="py-5 relative">
                <div className="pb-2">
                    <SectionHeadingThirty
                        title={title || 'Our Special Editions'}
                        title_color={title_color || '#000'}
                    />
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={isLoop}
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
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {best_sell_product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card54
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

export default BestSellerThirty;

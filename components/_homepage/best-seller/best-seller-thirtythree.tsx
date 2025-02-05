'use client';

import Card59 from '@/components/card/card59';
import SectionHeadingThirtyThree from '@/components/section-heading/section-heading-thirtythree';
import DefaultSlider from '@/components/slider/default-slider';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

const BestSellerThirtyThree = ({
    design,
    headersetting,
    best_sell_product,
}: any) => {
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

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="py-5 relative">
                <div className="flex justify-between items-center mb-3">
                    <SectionHeadingThirtyThree
                        title={title || 'Best Sell Product'}
                        title_color={title_color || '#000'}
                    />
                    <Link href="/shop">
                        <p className="see py-1.5 px-2 font-bold rounded-md">
                            See More
                        </p>
                    </Link>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={isLoop}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {best_sell_product?.length > 0 &&
                        best_sell_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <Card59 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default BestSellerThirtyThree;

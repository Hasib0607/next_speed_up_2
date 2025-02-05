'use client';

import Card61 from '@/components/card/card61';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';
import SectionHeadingThirtyFive from '@/components/section-heading/section-heading-thirty-five';

const ProductThirtyFive = ({ product, design, headersetting }: any) => {
    const styleCss = `
    .new-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .new-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .new-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
  `;

    const prevEl = 'product-prev';
    const nextEl = 'product-next';

    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="">
            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="relative arrow-hov">
                    <div className="text-center mb-5">
                        <SectionHeadingThirtyFive
                            title={title || '✦ PRODUCTS ✦'}
                            title_color={title_color || '#000'}
                        />
                    </div>

                    <DefaultSlider
                        prevEl={prevEl}
                        nextEl={nextEl}
                        loop={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            980: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                            1440: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {product?.length > 0 &&
                            product?.slice(0, 10)?.map((item: any) => (
                                <SwiperSlide key={item?.id}>
                                    <div className="px-2">
                                        <Card61 item={item} />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </DefaultSlider>
                </div>
            </div>
        </div>
    );
};

export default ProductThirtyFive;

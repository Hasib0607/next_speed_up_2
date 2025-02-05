'use client';

import Card60 from '@/components/card/card60';
import SectionHeadingThirtyFour from '@/components/section-heading/section-heading-thirtyfour';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';

const FeatureProductThirtyFour = ({
    design,
    headersetting,
    feature_product,
}: any) => {
    let isLoop = feature_product?.length > 1;

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

    const prevEl = 'feature-product-prev';
    const nextEl = 'feature-product-next';

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="bg-[#F9F8FF]">
            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="relative arrow-hov">
                    <div className="text-center mb-5">
                        <SectionHeadingThirtyFour
                            title={title}
                            title_color={title_color}
                        />
                    </div>

                    <DefaultSlider
                        prevEl={prevEl}
                        nextEl={nextEl}
                        loop={isLoop}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 5,
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
                        {feature_product?.length > 0 &&
                            feature_product?.slice(0, 10)?.map((item: any) => (
                                <SwiperSlide key={item?.id}>
                                    <Card60 item={item} />
                                </SwiperSlide>
                            ))}
                    </DefaultSlider>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductThirtyFour;

'use client';

import Card63 from '@/components/card/card63';
import DefaultSlider from '@/components/slider/default-slider';
import { SwiperSlide } from 'swiper/react';

const FeatureProductThirtySix = ({
    design,
    headersetting,
    feature_product,
}: any) => {
    const prevEl = 'new-product-prev';
    const nextEl = 'new-product-next';

    let isLoop = feature_product.length > 1;

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
    `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div data-aos="fade-up" className="">
            <style>{styleCss}</style>
            <div
                data-aos="fade-up"
                className="gap-4 sm:container px-5 sm:py-10 py-5 relative arrow-hov"
            >
                <div className="text-center py-10 flex items-center justify-center">
                    <p
                        style={{ color: title_color }}
                        className="text-xl xl:text-2xl"
                    >
                        {title}
                    </p>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={isLoop}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        980: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {feature_product?.length > 0 &&
                        feature_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <Card63 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductThirtySix;

'use client';

import Card59 from '@/components/card/card59';
import SectionHeadingThirtyThree from '@/components/section-heading/section-heading-thirtythree';
import DefaultSlider from '@/components/slider/default-slider';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

const FeatureProductThirtyThree = ({
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
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="">
            <style>{styleCss}</style>
            <div className="gap-4 sm:container px-5 sm:py-10 py-5 relative arrow-hov">
                <div className="flex justify-between items-center mb-3">
                    <SectionHeadingThirtyThree
                        title={title}
                        title_color={title_color}
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
                    {feature_product?.length > 0 &&
                        feature_product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <Card59 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductThirtyThree;

'use client';

import Card8 from '@/components/card/card8';
import SectionHeadingSix from '@/components/section-heading/section-heading-six';
import GridSliderFour from '@/components/slider/grid-slider/grid-slider-four';
import ArrowSquare from '@/utils/arrow-square';
import { SwiperSlide } from 'swiper/react';
import './feature-product-six.css';

const FeatureProductSix = ({ product, headersetting }: any) => {
    const prev = 'feature_product_prev';
    const next = 'feature_product_next';

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="bg-white relative sm:container px-5 sm:py-10 py-5">
            <div className="py-3">
                <SectionHeadingSix
                    title={title}
                    subtitle={''}
                    title_color={title_color}
                />
                {product?.length > 0 && (
                    <div
                        className="mt-10 group featureCustomHoverSix"
                        style={{ border: '2px solid #f5f5f5', padding: '10px' }}
                    >
                        <div className="col-span-2">
                            <div className="flex px-1 top-5 absolute inset-1 items-center">
                                <ArrowSquare
                                    prevEl={prev}
                                    nextEl={next}
                                ></ArrowSquare>
                            </div>
                            <GridSliderFour
                                prevEl={prev}
                                nextEl={next}
                                isLoop={product?.length > 1}
                            >
                                {product?.map((item: any) => (
                                    <SwiperSlide
                                        className="swiperjs-slide"
                                        key={item?.id}
                                    >
                                        <Card8 item={item} />
                                    </SwiperSlide>
                                ))}
                            </GridSliderFour>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureProductSix;

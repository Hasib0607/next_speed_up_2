'use client';
import featureProduct from '@/assets/img/featureProduct.png';
import Card57 from '@/components/card/card57';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import GridSliderTwo from '@/components/slider/grid-slider/grid-slider-two';
import { RootState } from '@/redux/store';
import Arrow from '@/utils/arrow';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const FeatureProductFive = ({ feature_product }: any) => {
    const prev1 = 'feature_product_prev';
    const next1 = 'feature_product_next';

    let isLoop = feature_product.length > 1;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};

    if (!featuredProduct) {
        return null;
    }

    // featuredProduct = featuredProduct?.[0] || {};
    const title = featuredProduct?.title || 'Default Title';
    const title_color = featuredProduct?.title_color || '#000';

    return (
        <div
            style={{
                backgroundImage: `url(${featureProduct.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <div className="container px-5 py-5">
                <div className="grid grid-cols-7 py-3 sm:m-0">
                    <div className="hidden lg:flex lg:col-span-3"></div>
                    <div className="lg:col-span-4 col-span-7 mx-4 sm:mx-0">
                        <div className="my-5 pt-1 px-3 flex justify-between items-center">
                            <SectionHeadingFive
                                title={title}
                                subtitle={''}
                                title_color={title_color}
                            />
                            <div className="hidden lg:block">
                                <Arrow prevEl={prev1} nextEl={next1}></Arrow>
                            </div>
                        </div>
                        {feature_product?.length > 0 && (
                            <GridSliderTwo
                                loop={isLoop}
                                prevEl={prev1}
                                nextEl={next1}
                            >
                                {feature_product?.length > 0 &&
                                    feature_product
                                        ?.slice(0, 10)
                                        .map((item: any) => (
                                            <SwiperSlide
                                                className="swiperjs-slide"
                                                key={item?.id}
                                            >
                                                <Card57 item={item} />
                                            </SwiperSlide>
                                        ))}
                            </GridSliderTwo>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductFive;

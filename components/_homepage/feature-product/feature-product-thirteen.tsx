'use client';
// created by iazadur
import Card18 from '@/components/card/card18';
import Card8 from '@/components/card/card8';
import SectionHeadingThirteen from '@/components/section-heading/section-heading-thirteen';
import DefaultSlider from '@/components/slider/default-slider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const FeatureProductThirteen = ({ feature_product }: any) => {
    const prev = 'feature_productThirteen_prev';
    const next = 'feature_productThirteen_next';

    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="bg-white">
            <div className="sm:container px-5 sm:py-10 py-5">
                <SectionHeadingThirteen
                    prev={prev}
                    next={next}
                    title={title}
                    title_color={title_color}
                />
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {feature_product?.length > 0 &&
                        feature_product
                            ?.slice(0, 10)
                            .map((item: any, index: any) => (
                                <SwiperSlide
                                    className="swiperjs-slide py-10"
                                    key={index}
                                >
                                    {/* <Card18 item={item} store_id={store_id} /> */}
                                    <Card8 item={item} store_id={store_id} />
                                </SwiperSlide>
                            ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default FeatureProductThirteen;

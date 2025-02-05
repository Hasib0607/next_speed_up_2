'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import Card38 from '@/components/card/card38';
import SectionHeadingEighteen from '@/components/section-heading/section-heading-eighteen';
import DefaultSlider from '@/components/slider/default-slider';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const FeatureProductEighteen = ({
    feature_product,
    design,
    headersetting,
}: any) => {
    const prevEl = 'feature_product-sixteen-prev';
    const nextEl = 'feature_product-sixteen-next';
    let isLoop = feature_product.length > 1;
    const styleCss = `
    .arrow-hov:hover .arrow {
        opacity:1;
        background: white;
    }
    .text-hover:hover {
        color:  ${design?.header_color};
    }
    `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 relative">
            <style>{styleCss}</style>
            <SectionHeadingEighteen
                title={title}
                titleColor={title_color}
                subtitle={''}
            />
            <div className="relative z-[6]">
                <div className=" gap-4 lg:cursor-pointer flex absolute right-0 sm:-top-16 -top-10 duration-500">
                    <div className={`${prevEl}  `}>
                        <BsArrowLeft className="text-xl text-gray-500 text-hover" />
                    </div>
                    <div className={`${nextEl} `}>
                        <BsArrowRight className="text-xl text-gray-500 text-hover" />
                    </div>
                </div>
            </div>

            <DefaultSlider
                prevEl={prevEl}
                nextEl={nextEl}
                loop={isLoop}
                loopFillGroupWithBlank={true}
                breakpoints={{
                    250: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        slidesPerGroup: 1,
                    },
                    560: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        slidesPerGroup: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        slidesPerGroup: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        slidesPerGroup: 4,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                        slidesPerGroup: 4,
                    },
                }}
            >
                {feature_product?.length > 0 &&
                    feature_product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item.id}>
                            <Card38 item={item} />
                        </SwiperSlide>
                    ))}
            </DefaultSlider>
        </div>
    );
};

export default FeatureProductEighteen;

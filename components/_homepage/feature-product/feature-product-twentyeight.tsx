'use client';
import { SwiperSlide } from 'swiper/react';
import hot from '@/assets/bg-image/hot-deal-logo.gif';
import Card58 from '@/components/card/card58';
import DefaultSlider from '@/components/slider/default-slider';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FeatureProductTwentyEight = ({ feature_product, design }: any) => {
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

    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};

    if (!featuredProduct) {
        return null;
    }

    const title = featuredProduct?.title || 'See More';
    const title_color = featuredProduct?.title_color || '#000';

    return (
        <div className="sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="sm:container py-5 px-5 relative arrow-hov bg-[#FFEFCF]">
                <div className="mb-5 flex justify-between items-center">
                    <img src={hot.src} alt="" className="h-10" />
                    <Link href="/shop">
                        <p
                            style={{ color: title_color }}
                            className="text-xl text-orange-600 cursor-pointer flex items-center"
                        >
                            {title}
                            <IoIosArrowForward className="inline" />
                        </p>
                    </Link>
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
                        375: {
                            slidesPerView: 2,
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
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {feature_product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card58
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

export default FeatureProductTwentyEight;

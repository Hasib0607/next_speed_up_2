'use client';

import Card53 from '../../card/card53';
import { SwiperSlide } from 'swiper/react';
import DefaultSlider from '../../slider/default-slider';
import SectionHeadingTwentyNine from '../../section-heading/section-heading-twentynine';

const NewArrivalProductTwentyNine = ({
    product,
    design,
    headersetting,
}: any) => {
    const prevEl = 'new-product-prev';
    const nextEl = 'new-product-next';

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

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="relative arrow-hov">
                <div className=" pb-2">
                    <SectionHeadingTwentyNine
                        design={design}
                        title={title || 'Top Deals Of The Day'}
                        title_color={title_color || '#000'}
                    />
                </div>
                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        560: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {product?.length > 0 &&
                        product?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <div className="px-2 pb-3">
                                    <Card53 item={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default NewArrivalProductTwentyNine;

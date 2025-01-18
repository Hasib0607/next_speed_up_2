'use client';
import { SwiperSlide } from 'swiper/react';
import Card54 from '../card/card54';
import SectionHeadingThirty from '../section-heading/section-heading-thirty';
import DefaultSlider from '../slider/default-slider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const NewArrivalProductThirtyOne = ({ product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headerdata || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};
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

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="relative arrow-hov">
                <div className="">
                    <SectionHeadingThirty
                        title={title || 'The Biggest New Books'}
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
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card54
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

export default NewArrivalProductThirtyOne;

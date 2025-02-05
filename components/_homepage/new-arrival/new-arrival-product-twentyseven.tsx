'use client';

import Card51 from '../../card/card51';
import { SwiperSlide } from 'swiper/react';
import DefaultSlider from '../../slider/default-slider';
import SectionHeadingTwentySeven from '../../section-heading/section-heading-twenty-seven';

const NewArrivalProductTwentySeven = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};
    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5 ">
            <div className="">
                <div className="pb-2">
                    <SectionHeadingTwentySeven
                        title={title || 'New Arrival'}
                        title_color={title_color || '#000'}
                    />
                </div>
                <DefaultSlider
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        560: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide key={item?.id}>
                                <Card51 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

export default NewArrivalProductTwentySeven;

'use client';

import Card18 from '../../card/card18';
import { SwiperSlide } from 'swiper/react';
import SectionHeadingThirteen from '../../section-heading/section-heading-thirteen';
import GridSliderThirteen from '../../slider/grid-slider/grid-slider-thirteeen';

const NewArrivalProductThirteeen = ({
    product,
    design,
    headersetting,
}: any) => {
    const prev = 'newArrrival_productThirteen_prev';
    const next = 'newArrrival_productThirteen_next';

    const { custom_design } = headersetting || {};
    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="bg-white ">
            <div className="sm:container px-5 sm:py-10 py-5">
                <SectionHeadingThirteen
                    prev={prev}
                    next={next}
                    title={title || 'New Arrival Products'}
                    design={design}
                    title_color={title_color || '#000'}
                />
                <GridSliderThirteen
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        350: {
                            slidesPerView: 1,
                            spaceBetween: 20,
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
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    className={'h-[1000px] my-2 sm:my-12'}
                >
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any) => (
                            <SwiperSlide
                                className="swiperjs_grid_two"
                                key={item?.id}
                            >
                                <Card18 item={item} />
                            </SwiperSlide>
                        ))}
                </GridSliderThirteen>
            </div>
        </div>
    );
};

export default NewArrivalProductThirteeen;

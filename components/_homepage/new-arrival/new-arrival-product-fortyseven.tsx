'use client';

import Card77 from '@/components/card/card77';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
import { catImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const NewArrivalProductFortySeven = ({ product, headersetting }: any) => {
    const prev1 = 'best_seller_Prev1';
    const next1 = 'best_seller_Next1';

    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    return (
        <div className="sm:container px-5 sm:py-10 py-5 rounded-md">
            <div className="py-5 pt-1 flex justify-between items-center">
                <SectionHeadingFive
                    title={title || 'New Arrivals'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div className="pt-14 hidden sm:block">
                    <Arrow prevEl={prev1} nextEl={next1}></Arrow>
                </div>
            </div>

            <div className="">
                <DefaultSlider
                    prevEl={prev1}
                    nextEl={next1}
                    breakpoints={{
                        350: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
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
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any) => {
                            return (
                                <SwiperSlide key={item?.id}>
                                    <Card77 item={item} />
                                </SwiperSlide>
                            );
                        })}
                </DefaultSlider>
            </div>

            <div className="md:grid-cols-3 gap-5 bg-white grid mt-5">
                {category?.slice(2, 5)?.map((item: any) => (
                    <div key={item.id}>
                        <Link
                            href={`/category/${item.id}`}
                            className="relative h-auto w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100"
                        >
                            <img
                                src={catImg + item.banner}
                                className="h-full w-full hover:scale-105 duration-500"
                                alt=""
                            />
                            <div className="absolute bottom-1/4 -translate-y-1/2 uppercase text-black">
                                <span className="text-3xl font-bold text-white category-hover">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivalProductFortySeven;

'use client';

import Slider1 from '@/components/slider/slider-one';
import { iconImg } from '@/site-settings/siteUrl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

const FeaturedFortyThree = ({ category, headersetting }: any) => {
    const prev = 'cat_Prev';
    const next = 'cat_Next';
    const { custom_design } = headersetting || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {category?.length > 0 && (
                <div className="">
                    <div className="my-5 w-full pt-1 pb-12 flex justify-center items-center flex-wrap">
                        <Title
                            title_color={title_color}
                            text={title || 'Popular'}
                        />
                    </div>
                    <Slider1
                        prevEl={prev}
                        nextEl={next}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {category?.length > 0 &&
                            category?.map((cat: any) => (
                                <SwiperSlide key={cat?.id}>
                                    <SingleCard cat={cat} />
                                </SwiperSlide>
                            ))}
                    </Slider1>
                </div>
            )}
        </div>
    );
};
export default FeaturedFortyThree;

const SingleCard = ({ cat }: any) => {
    return (
        <div className='hover:border-x-0 hover:shadow-lg hover:border-y-0 py-16'>
            <Link href={'/category/' + cat?.id} className="drop-shadow-xl">
                <figure className="overflow-hidden flex justify-center items-center w-32 h-32 mx-auto">
                    <motion.img
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.5 },
                        }}
                        exit={{
                            scale: 1,
                            transition: { duration: 0.5 },
                        }}
                        src={iconImg + cat?.icon}
                        alt=""
                        className="h-auto max-w-full"
                    />
                </figure>
                <div className="text-center mt-20">
                    <h3 className="font-normal tracking-wider hover:text-[var(--header-color)] my-3">
                        {cat?.name}
                    </h3>
                    <p className="text-sm text-gray-500 hover:text-[var(--header-color)]">
                        DETAILS
                    </p>
                </div>
            </Link>
        </div>
    );
};

const Title = ({ text, title_color }: any) => {
    return (
        <h3
            style={{ fontSize: '22px' }}
            className="font-semibold flex gap-1 text-black"
        >
            <span style={{ color: title_color }}>{text}</span>
        </h3>
    );
};

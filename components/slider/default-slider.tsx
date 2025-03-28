'use client'

import React from 'react';
// import Swiper core and required modules
import {
    Navigation,
    A11y,
    EffectFade,
    Autoplay,
    Controller,
    Pagination,
} from 'swiper/modules';

import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const DefaultSlider = ({
    nextEl,
    prevEl,
    children,
    breakpoints,
    navigation,
    className,
    loop,
    pagination,
    paginationType,
}: any) => {
    return (
        <Swiper
            autoplay={{ delay: 2500 }}
            loop={loop ?? false}
            speed={1000}
            modules={[
                Autoplay,
                A11y,
                EffectFade,
                Navigation,
                Controller,
                Pagination,
            ]}
            breakpoints={breakpoints}
            // pagination={{
            //   pagination,
            //   type: paginationType,
            // }}
            navigation={navigation ?? {
                prevEl: `.${prevEl}`,
                nextEl: `.${nextEl}`,
            }}
            className={className ?? "mySwiper"}
        >
            {children}
        </Swiper>
    );
};

export default DefaultSlider;

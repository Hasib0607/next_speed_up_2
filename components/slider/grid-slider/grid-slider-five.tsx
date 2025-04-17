'use client';
import React from 'react';

import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './grid-style.css';

// import required modules
import {
    Grid,
    Navigation,
    Autoplay,
    A11y,
    EffectFade,
    Controller,
} from 'swiper/modules';

const GridSliderFive = ({ nextEl, prevEl, children, ...rest }: any) => {
    return (
        <Swiper
            loop={false}
            slidesPerView={4}
            spaceBetween={10}
            autoplay={{
                delay: 3000,
            }}
            grid={{
                rows: 2,
                fill: 'row' // Crucial for horizontal layout
            }}
            modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
            navigation={{
                prevEl: `.${prevEl}`,
                nextEl: `.${nextEl}`,
            }}
            className="w-full h-fit"
            breakpoints={{
                375: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                    grid: { rows: 1 }
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                    grid: { rows: 2 }
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                    grid: { rows: 2 }
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                    grid: { rows: 2 }
                },
            }}
        >
            {children}
        </Swiper>
    );
};

export default GridSliderFive;

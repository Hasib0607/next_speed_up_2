'use client';

import React, { createRef, useEffect } from 'react';
import { useState } from 'react';

import {
    BsFillArrowDownSquareFill,
    BsFillArrowUpSquareFill,
} from 'react-icons/bs';

import { productImg } from '@/site-settings/siteUrl';
// the above one

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const HorizontalSlider = ({
    design,
    product,
    variant,
    activeImg,
    setActiveImg,
}: any) => {
    const [id, setId] = useState(0);
    const [activeMbl, setActiveMbl] = useState(0);
    const [images, setImages] = useState<any>([]);

    //creating the ref
    const customeSlider = createRef<any>();

    // slider navigation button
    const gotoNext = () => {
        customeSlider.current.slickNext();
    };

    const gotoPrev = () => {
        customeSlider.current.slickPrev();
    };

    // for image
    useEffect(() => {
        const arr = product?.image;

        let variantImages;
        if (variant?.length > 0) {
            variantImages = variant
                ?.filter((v: any) => v?.image !== null)
                ?.map((v: any) => v?.image);
        }
        if (arr === undefined) return;
        setImages([...arr, ...(variantImages || [])]);
    }, [product?.image, variant]);

    // style css
    const styleCss = `
    .icon-color:hover {
        color: var(--header-color);
    }
    .active-img {
        border:  1px solid var(--header-color);
    }
    .inactive-img {
        border:  1px solid var(--text-color);
    }
    .arrow-slick-color {
        color: var(--header-color);
    }
    `;

    // slider settings for image
    const settings = {
        infinite: images.length > 5 && true,
        // fade: true,
        adaptiveHeight: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: false,
        // verticalSwiping: true,
        beforeChange: function (currentSlide: any, nextSlide: any) {
            console.log('before change', currentSlide, nextSlide);
        },
        afterChange: function (currentSlide: any) {
            console.log('after change', currentSlide);
        },
    };

    return (
        <div>
            <style>{styleCss}</style>
            <div className="flex flex-col max-h-128 w-full gap-5 ">
                {/* selected image show  */}
                <div className="relative h-full w-full shadow-forty-four">
                    <Image
                        src={
                            !activeImg
                                ? productImg + images[id]
                                : productImg + activeImg
                        }
                        height={500}
                        width={500}
                        className="h-full w-full object-cover object-center"
                        alt=""
                    />
                </div>

                {/* for small images */}
                {images.length > 0 && (
                    <div className="relative h-auto w-full group slider-container">
                        <Slider {...settings} ref={customeSlider}>
                            {images
                                ?.slice(0, 10)
                                ?.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="focus:outline-none px-2 "
                                    >
                                        <Image
                                            onClick={() => {
                                                setActiveMbl(index);
                                                setId(index);
                                                setActiveImg('');
                                            }}
                                            height={500}
                                            width={500}
                                            className={`${
                                                activeMbl === index
                                                    ? 'active-img '
                                                    : 'inactive-img'
                                            } h-24 w-24 object-cover object-center bg-gray-100 border border-gray-400`}
                                            src={productImg + item}
                                            alt=""
                                        />
                                    </div>
                                ))}
                        </Slider>
                        {images.length > 4 && (
                            <div className="lg:opacity-0 group-hover:opacity-100 duration-500">
                                <BsFillArrowDownSquareFill
                                    className="absolute -rotate-90 right-0 top-[50%] -translate-y-[50%] z-10 text-3xl arrow-slick-color"
                                    onClick={() => gotoNext()}
                                />
                                <BsFillArrowUpSquareFill
                                    className="absolute -rotate-90 left-0 z-10 text-3xl top-[50%] -translate-y-[50%] arrow-slick-color"
                                    onClick={() => gotoPrev()}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HorizontalSlider;

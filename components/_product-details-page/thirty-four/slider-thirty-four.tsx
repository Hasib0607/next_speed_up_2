"use client";

import React, { createRef, useEffect, useState } from "react";
// import "./style.css";
import Slider from "react-slick";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  A11y,
  EffectFade,
  Autoplay,
  Controller,
} from "swiper/modules";

import { productImg } from "@/site-settings/siteUrl";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HSliderThirtyFour = ({design, product, variant, activeImg, setActiveImg }: any) => {

  const [id, setId] = useState<any>(null);
  const [activeMbl, setActiveMbl] = useState(null);
  const [images, setImages] = useState<any>([]);

  //creating the ref
  const customeSlider = createRef<any>();
  const customSlider = createRef<any>();

  // setting slider configurations
  // const [sliderSettings, setSliderSettings] = useState({
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 2,
  //     arrows: false,
  // })

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
        ?.filter((v: any) => v.image != null)
        ?.map((v: any) => v.image);
    }
    if (arr === undefined) return;
    setImages([...arr, ...(variantImages) || []]);
  }, [product?.image,variant]);

  // style css
  const styleCss = `
    .icon-color:hover {
        color:${design?.header_color};
        }
        .active-img {
        border:  3px solid ${design?.header_color};
    }
        .active-img-mbl {
        border:  1px solid ${design?.header_color};
    }
    .arrow-slick-color {
        color:${design?.header_color};
    }
    `;

  const prev = "single_Prev";
  const next = "single_Next";

    // Custom arrows for main slider
    const PrevArrow = (props: any) => (
      <div
        className={`single_Prev w-12 h-12 text-orange-600 absolute left-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center cursor-pointer`}
        onClick={() => {
          props.onClick();
          setId(null);
        }}
      >
        <IoIosArrowBack className="text-4xl font-bold" />
      </div>
    );
  
    const NextArrow = (props: any) => (
      <div
        className={`single_Next w-12 h-12 text-orange-600 absolute right-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center cursor-pointer`}
        onClick={() => {
          props.onClick();
          setId(null);
        }}
      >
        <IoIosArrowForward className="text-4xl font-bold" />
      </div>
    );
  
    // Main slider settings
    const mainSliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,  
      autoplay: id === null,
      autoplaySpeed: 3000,
      fade: true,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      beforeChange: () => setActiveImg(""),
    };

  // slider settings for image
  const settings = {
    infinite: images.length > 4 && true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  const settingsSmall = {
    infinite: images.length > 4 && true,
    slidesToShow: 4,
    slidesToScroll: 1,
    verticalSwiping: true,
  };
  

  return (
    <div>
      <style>{styleCss}</style>

      <div className="grid grid-cols-5 gap-y-3 gap-x-5 overflow-hidden">
        {/* for large device  */}
        <div className="relative sm:flex flex-col justify-center items-center hidden w-full max-h-[450px] xl2:max-h-[800px] overflow-hidden">
          <Slider
            {...settings}
            ref={customeSlider}
            className="relative group w-full flex flex-col justify-center items-center min-h-[300px] overflow-hidden"
          >
            {images.length > 0 &&
              images?.map((item: any, index: any) => (
                <div key={item}>
                  <img
                    onClick={() => {
                      setActiveMbl(index);
                      setId(index);
                    }}
                    className={`${
                      activeMbl === index
                        ? "active-img-mbl opacity-100"
                        : "opacity-50"
                    } min-h-full min-w-full bg-gray-100 border border-transparent  overflow-hidden`}
                    src={productImg + item}
                    alt=""
                  />
                </div>
              ))}
          </Slider>

          {images.length > 4 && (
            <div>
              <BsFillArrowDownSquareFill
                className="absolute bottom-3 left-[50%] -translate-x-[50%] z-10 text-3xl arrow-slick-color lg:cursor-pointer"
                onClick={() => gotoNext()}
              />
              <BsFillArrowUpSquareFill
                className="absolute top-3 z-10 text-3xl left-[50%] -translate-x-[50%] arrow-slick-color lg:cursor-pointer"
                onClick={() => gotoPrev()}
              />
            </div>
          )}
        </div>

        {/* for small device  */}
        <div className="relative sm:hidden col-span-5">
          <Slider
            {...settingsSmall}
            ref={customSlider}
            className="relative group h-full w-full "
          >
            {images?.slice(0, 10)?.map((item: any, index: any) => (
              <div key={item}>
                <img
                  onClick={() => {
                    setActiveMbl(index);
                    setId(index);
                  }}
                  className={`${
                    activeMbl === index ? "active-img-mbl " : ""
                  } h-auto min-w-full bg-gray-100 border border-transparent focus:outline-none`}
                  src={productImg + item}
                  alt=""
                />
              </div>
            ))}
          </Slider>
          {images.length > 4 && (
            <div>
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

        {/* Main Image Slider */}
        <div className="relative z-[1] sm:col-span-4 col-span-5 overflow-hidden">
          <Slider {...mainSliderSettings}>
            {images?.map((item: any) => (
              <div key={item}>
                <img
                  className="h-auto min-w-full"
                  src={activeImg ? productImg + activeImg : productImg + item}
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>


        {/* <div className="relative z-[1] sm:col-span-4 col-span-5 overflow-hidden">
          <Swiper
            modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
            navigation={{
              prevEl: `.${prev}`,
              nextEl: `.${next}`,
            }}
            loop={true}
            autoplay={{
              delay: id === null ? 3000 : 10000000,
            }}
            className="mySwiper relative"
            onSlideChangeTransitionStart={() => setActiveImg("")}
          >
            {images?.map((item: any) => (
              <SwiperSlide key={item}>
                <img
                  className="h-auto min-w-full"
                  src={activeImg ? productImg + activeImg : productImg + item}
                  alt=""
                />
              </SwiperSlide>
            ))}
            <div
              onClick={() => setId(null)}
              className={`${prev} w-12 h-12 text-orange-600 absolute left-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
            >
              <IoIosArrowBack className="text-4xl font-bold" />
            </div>
            <div
              onClick={() => setId(null)}
              className={`${next} w-12 h-12 text-orange-600 absolute right-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
            >
              <IoIosArrowForward className="text-4xl font-bold" />
            </div>
          </Swiper>
        </div> */}
      </div>
    </div>
  );
};

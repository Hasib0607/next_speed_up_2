'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import {
    MdKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Card69 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const nextEl = 'card-slider-next';
    const prevEl = 'card-slider-prev';

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

    return (
        <div className="bg-white relative group">
            <div className="">
                <style>{styleCss}</style>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover"
                        />
                    </div>
                </Link>
                <Swiper
                    loop={item?.image?.length > 1 ? true : false}
                    navigation={{
                        prevEl: `.${prevEl}`,
                        nextEl: `.${nextEl}`,
                    }}
                    modules={[Navigation]}
                    className="mySwiper relative"
                >
                    {item?.image?.map((s: any, id: any) => (
                        <SwiperSlide key={id}>
                            <div className="">
                                <Link
                                    href={
                                        '/product/' +
                                        item?.id +
                                        '/' +
                                        item?.slug
                                    }
                                >
                                    {' '}
                                    <img
                                        className="h-auto min-w-full"
                                        src={productImg + s}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="w-full group-hover:opacity-100 opacity-0">
                        <div
                            className={`${prevEl} lg:cursor-pointer flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-0 z-[2]`}
                        >
                            <MdKeyboardArrowLeft className="text-3xl" />
                        </div>
                        <div
                            className={`${nextEl} lg:cursor-pointer flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-0 z-[2]`}
                        >
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </div>
                </Swiper>

                <div className="text-gray-700 text-base py-1">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="text-sm sm:text-[15px] capitalize truncate">
                            {item?.name}
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center gap-2 w-full">
                    {productAvailablity && save > 0 && (
                        <p className="line-through text-gray-400 text-xs">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                    <div className="text-sm">
                        <BDT />
                        {price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card69;

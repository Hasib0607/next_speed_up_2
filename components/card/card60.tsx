'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { HiOutlineDocumentText } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

import { getDataByType } from '@/helpers/getCustomDataByType';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

const Card60 = ({ item, type = '' }: any) => {
    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const { cartList } = useSelector((state: RootState) => state.cart);

    const router = useRouter();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const handleAddToCart = () => {
        addToCart({
            dispatch,
            product: item,
            cartList,
            price,
            qty: 1,
            productQuantity: item?.quantity,
        });
    };

    const add_cart_item = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
        }
    };

    const buy_now = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
            router.push('/checkout');
        }
    };

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const customDesignData = getDataByType(headersetting, type);

    const {
        button,
        button_color,
        button_bg_color,
        button1,
        button1_color,
        button1_bg_color,
        is_buy_now_cart,
        is_buy_now_cart1,
    } = customDesignData || {};

    const isEmpty = Object.keys(customDesignData).length === 0;

    const styleCss = `
    .searchHover:hover {
        color:  white;
        background: #83C341;
    }
    .text-color-thirty {
        color:  ${bgColor};
    }
    .text-hover:hover {
        color: ${bgColor};
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-three {  
        background: ${bgColor};
    }

     .c60_button {
        color:  ${button_color};
        background: ${button_bg_color};
        border: 2px solid transparent;
        transition: all 0.3s ease; 
    }
    .c60_button:hover {
        color:  ${button_color};
        background: transparent;
        border: 2px solid ${button_color};
    }
    .c60_button1 {
        color:  ${button1_color};
        background: ${button1_bg_color};
        border: 2px solid transparent;
    }
    .c60_button1:hover {
        color:  ${button1_color};
        background: transparent;
        border: 2px solid ${button1_color};
    }

    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
       
      }
    .image-div:hover .image-hover-two {
        display: block;
       
      }
      .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: 0;
      }
      .overlay-group:hover .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: .5;
      }

  `;

    return (
        <div className="group overlay-group relative px-2 border rounded-xl shadow-xl">
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute rounded-xl top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                            Sold Out
                        </p>
                    </div>
                </Link>
            )}
            <div className="">
                <style>{styleCss}</style>
                <div className="relative overflow-hidden">
                    <div className="relative overflow-hidden w-full h-full sm:p-5 p-1 border-b">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                src={productImg + item.image[0]}
                                alt=""
                                className="h-auto min-w-full object-center object-cover group-hover:hidden block hover:scale-105 transform transition duration-700 ease-in-out"
                            />
                            <img
                                src={productImg + secondImg}
                                alt=""
                                className="h-auto min-w-full object-center object-cover group-hover:block hidden hover:scale-105 transform transition duration-500"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 pb-3">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="font-medium flex justify-between items-center flex-wrap">
                                <h1 className="text-gray-700 text-hover capitalize truncate">
                                    {item?.name}
                                </h1>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2">
                            {save > 0 && (
                                <p className="line-through text-xs text-color-thirty">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                            <div className="text-sm py-1 rounded-lg text-[#83C341] font-bold">
                                <BDT />
                                {price}
                            </div>
                        </div>

                        {item?.variant?.length > 0 ? (
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <div className="flex py-2 searchHover duration-500 bg-color justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold ">
                                    <HiOutlineDocumentText className="text-lg" />
                                    <p className="text-sm">View Details</p>
                                </div>
                            </Link>
                        ) : (
                            <div>
                                {productAvailablity && (
                                    <>
                                        {isEmpty ? (
                                            <div
                                                onClick={add_cart_item}
                                                className="bg-color flex py-2 searchHover duration-500 justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold "
                                            >
                                                Add To Cart
                                            </div>
                                        ) : (
                                            <>
                                                {(button || button1) && (
                                                    <div
                                                        onClick={
                                                            numberParser(
                                                                is_buy_now_cart
                                                            ) == 1
                                                                ? buy_now
                                                                : add_cart_item
                                                        }
                                                        className="c60_button mb-2 flex py-2 mt-2 searchHover duration-500 justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold "
                                                    >
                                                        {button}
                                                    </div>
                                                )}
                                                {button1 && (
                                                    <div
                                                        onClick={
                                                            numberParser(
                                                                is_buy_now_cart1
                                                            ) == 1
                                                                ? buy_now
                                                                : add_cart_item
                                                        }
                                                        className="c60_button1 flex py-2 searchHover duration-500 justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold "
                                                    >
                                                        {button1}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card60;

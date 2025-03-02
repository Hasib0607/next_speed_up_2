'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { HeaderColor, TextColor } from '@/consts';
import { getDataByType } from '@/helpers/getCustomDataByType';
import { useRouter } from 'next/navigation';

const Card45 = ({ item, type = '' }: any) => {
    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

    const router = useRouter();
    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const [open, setOpen] = useState<any>(false);

    const { cartList } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

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

    const buy_now = () => {
        if (item?.variant.length !== 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
            router.push('/checkout');
        }
    };

    const add_cart_item = () => {
        if (item?.variant.length !== 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
        }
    };

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
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .text-color {
        color:  ${HeaderColor};
    }
    .text-hover:hover {
        color: ${HeaderColor};
      }
    .bg-color {
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .cart-btn {
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .cart-btn:hover {
        color:  ${HeaderColor};
        background: transparent;
        border: 1px solid ${TextColor};
    }
    .c58_btn {
        color:  ${button_color};
        background: ${button_bg_color};
        border: 2px solid transparent;
    }
    .c58_btn:hover {
        color:  ${button_color};
        background: transparent;
        border: 2px solid ${button_color};
    }
    .c58_btn1 {
        color:  ${button1_color};
        background: ${button1_bg_color};
        border: 2px solid transparent;
    }
    .c58_btn1:hover {
        color:  ${button1_color};
        background: transparent;
        border: 2px solid ${button1_color};
    }
  `;

    return (
        <div className="group">
            <div className=" relative overflow-hidden border rounded-md duration-500">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {!productAvailablity && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Out of Stock
                        </p>
                    </div>
                )}
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
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

                        <div
                            onClick={() => setOpen(!open)}
                            className="w-10 h-10 rounded-full lg:cursor-pointer bg-white searchHover flex justify-center items-center absolute group-hover:opacity-100 opacity-0 scale-50 group-hover:scale-100 duration-500 left-[45%] top-[45%]"
                        >
                            <BiSearch className="text-xl text-center" />
                        </div>
                        {productAvailablity && save > 0 && (
                            <>
                                <div className="absolute text-center text-xs h-12 w-12 rounded-full flex flex-wrap justify-center items-center bg-color text-white top-2 right-2 ">
                                    <p className="flex flex-col">
                                        <span>Dis.</span>
                                        <span className="text-[10px]">
                                            {numberParser(item.discount_price)}
                                            {item.discount_type === 'fixed'
                                                ? 'TK'
                                                : ''}
                                            {item.discount_type === 'percent'
                                                ? '%'
                                                : ''}
                                        </span>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </Link>

                <div className="flex flex-col gap-2 px-4 py-3 lg:group-hover:pb-[40px] duration-1000 w-full">
                    <div className="flex gap-x-1 pt-2">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({parsedNumberRating})
                        </div>
                    </div>
                    <div className="text-gray-700 font-bold w-full">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="text-hover capitalize truncate text-sm sm:text-base">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-gray-600 font-semibold flex items-center gap-2 w-full group-hover:opacity-0 duration-500">
                        <div className="text-base font-semibold">
                            <BDT />
                            {price}
                        </div>
                        {save > 0 && (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                </div>
                {/* <div
                        onClick={handleAddToCart}
                        className="w-full lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] px-4"
                    >
                        <p className=" font-medium w-full text-center cart-btn duration-500 border border-transparent rounded-lg lg:cursor-pointer text-xs py-2">
                            {'Add to Cart'}
                        </p>
                    </div> */}
                {productAvailablity ? (
                    <>
                        {isEmpty && (
                            <div
                                onClick={add_cart_item}
                                className="font-medium w-full text-center cart-btn border-transparent rounded-lg lg:cursor-pointer text-xs lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] px-4"
                            >
                                    {'Add to Cart'}
                            </div>
                        )}
                        {(button || button1) && (
                            <div  className='flex flex-col gap-4'>
                                <div>
                                {button && (
                                    <div
                                        onClick={
                                            numberParser(is_buy_now_cart) == 1
                                                ? buy_now
                                                : add_cart_item
                                        }
                                        className="font-medium w-full text-center c58_btn border-transparent rounded-lg lg:cursor-pointer text-xs lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] px-4"
                                    >
                                            {button}
                                    </div>
                                )}
                                </div>
                                <div>
                                {button1 && (
                                    <div
                                        onClick={
                                            numberParser(is_buy_now_cart1) == 1
                                                ? buy_now
                                                : add_cart_item
                                        }
                                        className="font-medium w-full text-center c58_btn rounded-lg lg:cursor-pointer text-xs lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-12 lg:bottom-20 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] px-4"
                                    >
                                            {button1}
                                    </div>
                                )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="px-4">
                        <a
                            href={'tel:+88' + headersetting?.phone}
                            className="w-full lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1]"
                        >
                            <p className=" font-medium w-full text-center cart-btn duration-500 border border-transparent rounded-lg lg:cursor-pointer text-xs py-2">
                                ASK FOR PRICE
                            </p>
                        </a>
                    </div>
                )}
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card45;

'use client';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';

const Card29 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  
  }
  `;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const handleAddToCart = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            addToCart({
                dispatch,
                product: item,
                cartList,
                price,
                qty: 1,
                productQuantity: item?.quantity,
            });
        }
    };

    return (
        <div>
            <div className="group relative overflow-hidden">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                            Sold Out
                        </p>
                    </div>
                )}
                <style>{styleCss}</style>
                <div className="relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item.image[id]}
                            alt=""
                            className="h-auto min-w-full"
                        />
                    </Link>
                    <div className="flex flex-col gap-y-1 absolute right-3 group-hover:bottom-12 -bottom-5  group-hover:opacity-100 opacity-0 duration-500">
                        {item?.image?.map((data: any, index: any) => (
                            <div key={index}>
                                {item.image.length > 1 ? (
                                    <p
                                        onClick={() => setId(index)}
                                        className={`${id === index ? 'bg-blue-600' : 'bg-gray-200'} h-3 w-3 rounded-full `}
                                    ></p>
                                ) : (
                                    ' '
                                )}
                            </div>
                        ))}
                    </div>
                    <div
                        onClick={() => setOpen(!open)}
                        className="w-full lg:cursor-pointer bg-white searchHover py-3 flex justify-center absolute group-hover:bottom-0 -bottom-16 duration-500"
                    >
                        <BiSearch className="text-2xl text-center" />
                    </div>
                    {item?.product_offer?.status ? (
                        ''
                    ) : (
                        <div className="absolute sm:text-xs text-[10px] px-1 sm:px-2 sm:py-1 py-0 bg-color text-white top-2 right-2 ">
                            <p>
                                {item.discount_type === 'fixed' ? 'BDT' : ''}{' '}
                                {Math.trunc(item.discount_price)}{' '}
                                {item.discount_type === 'percent' ? '%' : ''}
                            </p>
                        </div>
                    )}
                </div>

                <div className="text-gray-700 sm:text-base text-sm font-bold p-2 pt-4 ">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h1>{' '}
                    </Link>
                </div>

                <div className="text-gray-600 font-semibold flex sm:flex-row flex-col sm:items-center sm:gap-2 w-full px-2 pb-5 ">
                    <div className="text-base font-semibold">
                        <BDT />
                        {price}
                    </div>
                    {priceLineThrough ? (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    ) : null}
                </div>

                <div
                    onClick={handleAddToCart}
                    className="px-2 lg:cursor-pointer text-xs gap-1 w-full absolute group-hover:bottom-4 -bottom-12 duration-500 bg-white z-[1]"
                >
                    <p className=" font-medium border-b-2 px-2 py-1 w-max cart-color">
                        ADD IN CART
                    </p>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card29;

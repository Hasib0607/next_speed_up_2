'use client';

import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';

import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Details from '../_product-details-page/components/details';
import QuickView from '@/utils/quick-view';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { numberParser } from '@/helpers/numberParser';

const Card26 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cardHover:hover {
        border: 1px solid ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
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
            <div className="group cardHover border-[1px] rounded-lg relative overflow-hidden lg:hover:-translate-y-2 duration-700">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                            <p className="bg-blue-600 text-white px-2 py-1 w-max absolute right-0 rounded-bl-lg">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <style>{styleCss}</style>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto lg:group-hover:opacity-10 max-w-full duration-700"
                        />
                    </div>
                </Link>
                {item?.discount_type === 'no_discount' ||
                item.discount_price === '0.00' ? (
                    ''
                ) : (
                    <div className="absolute text-xs px-2 py-1 bg-color text-white top-2 left-2 rounded-md">
                        <p>
                            {item.discount_type === 'fixed' ? (
                                <BDT price={Math.trunc(item.discount_price)} />
                            ) : (
                                ''
                            )}
                            {Math.trunc(item.discount_price)}
                            {item.discount_type === 'percent' ? '%' : ''}
                        </p>
                    </div>
                )}

                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="text-gray-500 text-sm sm:text-lg font-medium sm:py-6 py-2 px-5 capitalize">
                        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h1>
                    </div>
                </Link>

                <div className="text-gray-600 text-lg font-semibold flex gap-1 pb-6 px-5">
                    {priceLineThrough && (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                    <div className="text-base font-semibold">
                        <BDT />
                        {price}
                    </div>
                </div>

                <div
                    onClick={handleAddToCart}
                    className="searchHover w-full lg:cursor-pointer text-base  text-center lg:w-max lg:px-16 bg-blue-400 py-2 lg:absolute lg:top-32  z-[1] lg:group-hover:translate-x-[-50%] lg:group-hover:left-[50%] lg:translate-x-[-100%] lg:left-[-100%] duration-700 rounded-sm"
                >
                    <p className="text-white font-medium sm:text-base text-xs">
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

export default Card26;

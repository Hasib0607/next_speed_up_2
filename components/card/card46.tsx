'use client';

import Link from 'next/link';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';

const Card46 = ({ item }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);

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
        <>
            <div className="group flex flex-col justify-between overflow-hidden relative">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                {item?.image && (
                    <div className="relative overflow-hidden">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="flex-1">
                                <img
                                    src={productImg + item?.image[0]}
                                    className="h-auto min-w-full"
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="bg-black text-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 divide-white lg:cursor-pointer">
                            <div
                                className="h-full grow flex items-center justify-center  transition-all duration-200 ease-linear"
                                onClick={() => setOpen(!open)}
                            >
                                <p className="px-3 hover:bg-green-500 hover:rounded-lg hover:shadow-xl py-1 md:test-sm text-xs sm:text-sm">
                                    quick look
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="p-[10px] bg-white h-[70px] flex justify-between items-center">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h2 className="text-md capitalize lg:text-sm hover:text-green-500 font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                            {item?.name}
                        </h2>
                    </Link>
                    <div className="flex justify-between items-center">
                        <div
                            onClick={handleAddToCart}
                            className="lg:cursor-pointer hover:touch-pinch-zoom hover:text-green-600 group-hover:opacity-100 opacity-0 -translate-x-20 group-hover:translate-x-0 duration-700 flex items-start justify-between text-sm"
                        >
                            <p>Add to cart </p>{' '}
                            <AiOutlineArrowRight className="ml-2 mt-1" />
                        </div>

                        <div className="flex group-hover:opacity-0 opacity-100 translate-x-0 group-hover:translate-x-20 duration-700 group-hover:hidden">
                            {priceLineThrough && (
                                <p className="line-through text-gray-400">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                            <div className="text-base font-semibold">
                                <BDT />
                                {price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </>
    );
};

export default Card46;

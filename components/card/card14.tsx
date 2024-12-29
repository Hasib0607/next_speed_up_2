'use client';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

import BDT from '@/utils/bdt';
import QuikView from '@/utils/quick-view';

import { LinkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { numberParser } from '@/helpers/numberParser';
import Details from '../_product-details-page/components/details';

const Card14 = ({ item }: any) => {
    const [open, setOpen] = useState<any>(false);

    const { cartList } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

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
    return (
        <div>
            <div className="relative overflow-hidden group">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative">
                        <span className="absolute bg-gray-800 text-white px-12 py-2 -rotate-45 overflow-clip -ml-12 -mt-1">
                            New
                        </span>
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full"
                        />
                        <div className="absolute bottom-2 right-2 bg-gray-100  px-5 text-xs text-black shadow flex j justify-between gap-4 py py-2">
                            {priceLineThrough ? (
                                <p className="line-through text-gray-400">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            ) : null}
                            <div className="">
                                <BDT />
                                {price}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="absolute right-2 top-8 translate-x-12  group-hover:-translate-x-0  transition-transform duration-500 ease-linear">
                    <div className="flex flex-col gap-4">
                        <div
                            className="p-3 border-0 bg-white rounded-full all-icon translate-x-6 lg:cursor-pointer  group-hover:-translate-x-2  transition-all group-hover:duration-300 ease-linear"
                            onClick={handleAddToCart}
                        >
                            <ShoppingBagIcon
                                className=""
                                width={20}
                                height={20}
                            />
                        </div>
                        <div
                            className="p-3 border-0 bg-white rounded-full all-icon translate-x-6 lg:cursor-pointer group-hover:-translate-x-2  transition-all  group-hover:duration-500 ease-linear"
                            onClick={() => setOpen(!open)}
                        >
                            <IoSearchCircleOutline width={20} height={20} />
                        </div>
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="p-3 border-0 bg-white rounded-full all-icon translate-x-6 lg:cursor-pointer group-hover:-translate-x-2  transition-all  group-hover:duration-1000 ease-linear">
                                <LinkIcon width={20} height={20} />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="py-4">
                    <p className="text-gray-500 text-sm font-medium ">
                        {item.category}
                    </p>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <p className="font-semibold text-base text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </p>
                    </Link>
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card14;

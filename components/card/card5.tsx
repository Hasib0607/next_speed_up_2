'use client';

import { productImg } from '@/site-settings/siteUrl';

import Rate from '@/utils/rate';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuikView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import './card.css';

const Card5 = ({ item }: any) => {
    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const { cartList } = useSelector((state: RootState) => state.cart);

    const store_id = store?.id || null;
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

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
        <div className="group rounded-md bg-white shadow-lg w-full h-full relative">
            {/* out of stock  */}
            {item?.quantity === '0' && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                            Out of Stock
                        </p>
                    </div>
                </Link>
            )}

            <div className="overflow-hidden grid grid-cols-2">
                <div className="w-full h-full">
                    <img
                        className="h-auto w-full"
                        src={productImg + item.image[0]}
                        alt="Mountain"
                    />
                </div>

                <div className="px-5 flex flex-col justify-start mt-6">
                    <div className="font-sans text-sm font-normal antialiased card5itemCategory">
                        {item.category}
                    </div>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className=" text-base antialiased capitalize font-semibold truncate">
                            {item?.name}
                        </div>
                    </Link>

                    <div className="flex gap-x-1">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({parsedNumberRating})
                        </div>
                    </div>

                    <div className="px-1 text-sm font-medium lg:group-hover:hidden">
                        <div className="text-base font-semibold">
                            <BDT />
                            {price}
                        </div>
                        {priceLineThrough && (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                    <div
                        onClick={handleAddToCart}
                        className="text-xs lg:cursor-pointer lg:hover:-translate-y-1 duration-1000 lg:hidden lg:group-hover:block font-semibold underline"
                    >
                        {store_id === 2669 ? 'Buy Now' : 'ADD TO CART'}
                    </div>
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card5;

'use client';

import './card.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { productImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';

const Card57 = ({ item }: any) => {
    const category = item?.category || [];

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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
        <div className="group rounded-md bg-white shadow-lg w-full h-[190px] overflow-hidden relative">
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                            Out of Stock
                        </p>
                    </div>
                </Link>
            )}

            <div className="overflow-hidden flex">
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="w-auto h-full">
                        <img
                            className="h-[190px] w-auto scale-110"
                            src={productImg + item.image[0]}
                            alt="Mountain"
                        />
                    </div>
                </Link>

                <div className="px-5 flex flex-col justify-start mt-6">
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="font-sans text-sm font-normal antialiased card5itemCategory">
                            <ProdMultiCategory
                                category={category}
                                className={'text-gray-500'}
                                count={1}
                            />
                        </p>
                    )}
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

                    <div className="px-1 text-sm font-medium lg:group-hover:hidden flex items-center gap-2">
                        <div className="">
                            <BDT />
                            {price}
                        </div>
                        {save > 0 && (
                            <p className="line-through">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                    {productAvailablity && (
                        <div
                            onClick={handleAddToCart}
                            className="text-xs lg:cursor-pointer lg:hover:-translate-y-1 duration-1000 lg:hidden lg:group-hover:block font-semibold underline"
                        >
                            {'ADD TO CART'}
                        </div>
                    )}
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card57;

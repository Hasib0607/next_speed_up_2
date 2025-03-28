'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';

const Card48 = ({ item }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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
            <div
                className="group flex flex-col justify-between overflow-hidden relative"
                key={item?.id}
            >
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                {item?.image && (
                    <div className=" w-full h-full relative overflow-hidden">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="flex-1 h-auto min-w-full">
                                <img
                                    src={productImg + item?.image[0]}
                                    className="h-full w-full"
                                    alt=""
                                />
                            </div>
                        </Link>
                    </div>
                )}
                <div className="w-full">
                    <div className="w-full flex justify-center my-2">
                        <h2 className="text-md capitalize lg:text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                            {item?.name}
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="lg:cursor-pointer group-hover:opacity-100 opacity-0 -translate-x-10 group-hover:translate-x-0 duration-700 flex items-start justify-between text-sm"
                            >
                                <p>Add to cart </p>{' '}
                                <AiOutlineArrowRight className="ml-2 mt-1" />
                            </div>
                        )}

                        <div className="flex items-center gap-2 group-hover:opacity-0 opacity-100 -translate-x-12 group-hover:translate-x-40 duration-700 ">
                            <div className="text-base font-semibold">
                                <BDT />
                                {price}
                            </div>
                            {save > 0 && (
                                <p className="line-through text-gray-400">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
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

export default Card48;

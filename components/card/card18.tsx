'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuikView from '@/utils/quick-view';
import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';
import { PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { numberParser } from '@/helpers/numberParser';
import Details from '@/components/_product-details-page/components/details';
import { useState } from 'react';

const Card18 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState<any>(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedRating = numberParser(item?.rating, true);
    const parsedNumberRating = numberParser(item?.number_rating);

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
        <div className="shadow-lg group flex flex-col justify-between relative">
            {/* out of stock  */}
            {!productAvailablity && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                    <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                        Sold Out
                    </p>
                </div>
            )}
            {item?.image && (
                <div className=" w-full h-full relative overflow-hidden">
                    <div
                        className="h-10 w-[75px] absolute top-4 left-0 bg-black flex justify-center items-center -rotate-90"
                        style={{
                            clipPath:
                                'polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)',
                        }}
                    >
                        <p className="font-semibold text-xl text-white pl-1">
                            New
                        </p>
                    </div>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="flex-1">
                            <img
                                src={productImg + item?.image[0]}
                                className={'h-auto min-w-full'}
                                alt=""
                            />
                        </div>
                    </Link>
                    <div className="bg-gray-200 h-[40px] w-full absolute bottom-0 left-0 right-0 translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 divide-white lg:cursor-pointer">
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear"
                            >
                                <ShoppingBagIcon className="h-6 w-6" />
                            </div>
                        )}
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="h-full grow flex items-center justify-center hover:bg-gray-100  transition-all duration-200 ease-linear"
                            >
                                <p className="uppercase px-1 text-xs sm:text-sm ">
                                    Add To Cart
                                </p>
                            </div>
                        )}
                        <div
                            onClick={() => setOpen(!open)}
                            className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear"
                        >
                            <PlusIcon className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            )}
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                {' '}
                <div className="p-3 bg-[#f1f1f1] h-fit w-full">
                    <div className="flex flex-col justify-between items-center flex-wrap">
                        <h2 className="text-md hover:text-green-600 capitalize lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="text-[#0f8ea1] font-semibold">
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
                        <div className="flex gap-x-1">
                            <div>
                                <Rate rating={parsedRating} />
                            </div>
                            <div className="text-gray-500 sm:text-sm text-xs">
                                ({parsedNumberRating})
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card18;

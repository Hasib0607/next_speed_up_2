'use client';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
// import "./cardCss/Card.css";

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { numberParser } from '@/helpers/numberParser';
import QuikView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

const Card7 = ({ item, setView, view }: any) => {
    const [open, setOpen] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const card7CustomStyle = `       
     .testDiv7{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius:50%;
        top: 10%;
        left: 50%;
    }
    .testDiv7:hover{
        background-color: var(--header-color);
        display: block;
    }
    .testShoppingBagDiv7{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius:50%;
        top: 10%;
        right: 50%;
    }
    .testShoppingBagDiv7:hover{
        background-color: var(--header-color);
        display: block;
    }
    .card7SearchIcon{
        height: 20px;
        color: var(--text-color);
        margin-top: 10px;
        margin-left: 10px;
    }`;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
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

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                className="bg-white relative rounded-lg"
                style={{ width: '100%' }}
            >
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}

                <style>{card7CustomStyle}</style>
                <div className="w-full card7Hover block relative rounded overflow-hidden">
                    <div
                        className="cursor-pointer"
                        onClick={() => setView(!view)}
                    >
                        <img
                            className="min-w-full h-auto"
                            src={productImg + item?.image[0]}
                            alt=""
                        />
                    </div>
                    <div className="w-full absolute -bottom-5 mx-auto px-1 quick7 font-normal text-md pb-2 text-black text-md bg-gray-600 items-center">
                        <div className="flex justify-between">
                            {productAvailablity && (
                                <div
                                    className="testShoppingBagDiv7 lg:cursor-pointer"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingBagIcon className="card7SearchIcon" />
                                </div>
                            )}
                            <div
                                className="testDiv7 lg:cursor-pointer"
                                onClick={() => setOpen(!open)}
                            >
                                <IoSearchCircleOutline className="card7SearchIcon" />
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href={'/product/' + item?.id + '/' + item?.slug}
                    className="p-5"
                >
                    <h5
                        className="mb-3 menu-hover font-six font-base text-lg sm:text-base text-gray-500 dark:text-gray-300"
                        style={{
                            height: '20px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: '130px',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {capitalizeFirstLetter(item?.name)}
                    </h5>
                    <div className="font-six font-bold text-gray-700 text-sm flex items-center gap-2">
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
                </Link>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </>
    );
};

export default Card7;

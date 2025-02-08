'use client';

import { AppDispatch } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { motion } from 'framer-motion';

import {
    handleDecrement,
    handleIncrement,
} from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { numberParser } from '@/helpers/numberParser';

const SingleCartProduct = ({ product, design }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const cartProductVariant = useMemo(
        () =>
            product?.variant?.find(
                (item: any) => item?.id == product?.variant_id
            ) || {},
        [product]
    );

    return (
        <motion.li
            initial={{ y: 0, opacity: 1 }}
            key={product?.id}
            className="py-6"
        >
            <div className="flex justify-between">
                <div className="h-[70px] w-[62px] sm:h-[112px] sm:w-[112px] mr-4 flex-shrink-0 overflow-hidden rounded-xl ">
                    <img
                        src={productImg + product?.image[0]}
                        alt={product?.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex justify-around flex-col">
                    <div className="flex flex-col">
                        <Link
                            href={
                                '/product/' + product?.id + '/' + product?.slug
                            }
                            className="sm:text-sm text-xs text-gray-900 focus:outline-none"
                        >
                            {product?.name}
                        </Link>
                        <div className="flex items-center">
                            {cartProductVariant?.color ? (
                                <div className="flex items-center gap-2 pr-2">
                                    <p className="font-semibold text-sm">
                                        Color:{' '}
                                    </p>
                                    <p
                                        style={{
                                            backgroundColor:
                                                cartProductVariant?.color,
                                        }}
                                        className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                                    ></p>
                                </div>
                            ) : null}
                            {cartProductVariant?.size ? (
                                <p className="font-semibold text-sm">
                                    Size:{' '}
                                    <span className="font-normal text-sm">
                                        {cartProductVariant?.size}
                                    </span>
                                </p>
                            ) : null}
                            {cartProductVariant?.unit ? (
                                <p className="font-semibold text-sm">
                                    Unit:{' '}
                                    <span className="font-normal text-sm">
                                        {cartProductVariant?.volume +
                                            ' ' +
                                            cartProductVariant?.unit}
                                    </span>
                                </p>
                            ) : null}
                        </div>
                        <p className="sm:text-sm text-xs text-gray-600">
                            <span className="text-sm">
                                Total Price:{' '}
                                <BDT price={parseInt(product?.price)} />
                            </span>
                        </p>
                    </div>
                    <div className="hidden sm:flex gap-3 w-full items-center justify-between text-sm">
                        <div
                            className="flex h-9 w-24 justify-between items-center rounded-md font-semibold"
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                        >
                            <div
                                onClick={() =>
                                    handleDecrement(dispatch, product)
                                }
                                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                            >
                                <MinusIcon
                                    color={design?.text_color}
                                    width={15}
                                />
                            </div>
                            <div
                                style={{ color: design?.text_color }}
                                className={'text-gray-700'}
                            >
                                {product?.qty}
                            </div>
                            <div
                                onClick={() =>
                                    handleIncrement(dispatch, product)
                                }
                                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                            >
                                <PlusIcon
                                    color={`${design?.text_color}`}
                                    width={15}
                                />
                            </div>
                        </div>
                        <p className="text-gray-900 flex text-center font-semibold text-base">
                            <span className="text-sm">
                                Total Price:{' '}
                                <BDT
                                    price={
                                        numberParser(product?.price) *
                                        product?.qty
                                    }
                                />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-3 gap-3 justify-between text-sm sm:hidden">
                <div
                    className="flex h-9 w-24 justify-between items-center rounded-md font-semibold"
                    style={{
                        backgroundColor: design?.header_color,
                        color: design?.text_color,
                    }}
                >
                    <div className="hover:bg-gray-800 hover:rounded-md py-2 h-full w-8 flex justify-center items-center">
                        <MinusIcon
                            color={design?.text_color}
                            onClick={() => handleDecrement(dispatch, product)}
                            width={15}
                        />
                    </div>
                    <div
                        style={{ color: design?.text_color }}
                        className={'text-gray-700'}
                    >
                        {product?.qty}
                    </div>
                    <div className="hover:bg-gray-800 hover:rounded-md py-2 h-full w-8 flex justify-center items-center">
                        <PlusIcon
                            color={`${design?.text_color}`}
                            onClick={() => handleIncrement(dispatch, product)}
                            width={15}
                        />
                    </div>
                </div>
                <p className="text-gray-900 flex text-center font-semibold text-base">
                    {' '}
                    {numberParser(product?.price) * product?.qty} BDT
                </p>
            </div>
        </motion.li>
    );
};
export default SingleCartProduct;

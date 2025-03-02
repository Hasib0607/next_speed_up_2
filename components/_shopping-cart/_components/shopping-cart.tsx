'use client';

import { AppDispatch, RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { motion } from 'framer-motion';

import {
    handleDecrement,
    handleIncrement,
} from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import {
    MinusIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { numberParser } from '@/helpers/numberParser';
import { removeFromCartList } from '@/redux/features/cart/cartSlice';
import { DialogTitle } from '@headlessui/react';


const ShoppingCart = ({ setOpen, design, incDecOff, children }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl relative">
            <div className="flex-1 ">
                <div className="flex items-start justify-between bg-black py-3 px-3  top-0  right-0 w-full">
                    <DialogTitle className="text-lg font-medium text-white uppercase">
                        Your Cart
                    </DialogTitle>
                    <XMarkIcon
                        onClick={() => setOpen(false)}
                        color={'white'}
                        className="h-6 w-6 lg:cursor-pointer"
                        aria-hidden="true"
                    />
                </div>

                <div className="my-8 px-6">
                    <div className="flow-root">
                        <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                        >
                            {cartList?.map((product: any, index: number) => (
                                <SingleCartProduct
                                    key={index}
                                    product={product}
                                    setOpen={setOpen}
                                    design={design}
                                    incDecOff={incDecOff}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default ShoppingCart;


export const SingleCartProduct = ({ product, design, incDecOff }: any) => {
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
                <div className="h-[65px] w-[65px] sm:h-[112px] sm:w-[112px] mr-4 flex-shrink-0 overflow-hidden rounded-xl ">
                    <img
                        src={productImg + product?.image[0]}
                        alt={product?.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex justify-around flex-col">
                    <div className="flex flex-col">
                        <div className="flex justify-between lg:cursor-pointer">
                            <Link
                                href={
                                    '/product/' +
                                    product?.id +
                                    '/' +
                                    product?.slug
                                }
                                className="sm:text-sm text-xs text-gray-900 focus:outline-none"
                            >
                                {product?.name}
                            </Link>
                            <div className="ml-4 min-w-fit lg:cursor-pointer">
                                <TrashIcon
                                    onClick={() =>
                                        dispatch(
                                            removeFromCartList(product?.cartId)
                                        )
                                    }
                                    width={15}
                                    className={'text-gray-700'}
                                />{' '}
                            </div>
                        </div>
                        <div className="flex items-center my-1">
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
                        <div className="">
                            <p className="flex items-center gap-2 sm:text-sm text-xs text-gray-900">
                                <span className="text-sm">
                                    Unit Price:{' '}
                                    <BDT price={parseInt(product?.price)} />
                                </span>
                                {incDecOff && (
                                    <>
                                        <XMarkIcon
                                            width={15}
                                            className="mx-1"
                                        />
                                        <span>
                                            {product?.qty} ={' '}
                                            <BDT
                                                price={
                                                    parseInt(product?.price) *
                                                    product?.qty
                                                }
                                            />
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    {!incDecOff && (
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
                    )}
                </div>
            </div>
            {!incDecOff && (
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
                                onClick={() =>
                                    handleDecrement(dispatch, product)
                                }
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
                                onClick={() =>
                                    handleIncrement(dispatch, product)
                                }
                                width={15}
                            />
                        </div>
                    </div>
                    <p className="text-gray-900 flex text-center font-semibold text-base">
                        {' '}
                        {numberParser(product?.price) * product?.qty} BDT
                    </p>
                </div>
            )}
        </motion.li>
    );
};

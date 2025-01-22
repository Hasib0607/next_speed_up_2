'use client';

import BDT from '@/utils/bdt';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import SingleCartProduct from '@/components/_shopping-cart/_components/single-cart-product';
import { useSelector } from 'react-redux';
import { XIcon } from 'react-share';
import { RootState } from '@/redux/store';

const CartPopUpThree = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const [open, setOpen] = useState(false);
    const { cartList } = useSelector((state: RootState) => state.cart);

    return (
        <>
            <div
                className={`${
                    open
                        ? 'invisible opacity-0 '
                        : 'invisible sm:opacity-100 relative lg:visible transition-all duration-1000 ease-linear'
                } `}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className="fixed z-30 p-2 right-6 bottom-20  shadow-lg rounded-full lg:cursor-pointer md:block w-20 h-20 pb-3"
                    style={{ backgroundColor: design?.header_color }}
                >
                    <div className="flex flex-col justify-center items-center  ">
                        <div className="flex justify-center gap-x-1 items-center">
                            <ShoppingBagIcon
                                width={25}
                                color={design?.text_color}
                                className="font-semibold text-sm"
                            />
                        </div>
                        <h3
                            style={{ color: design?.text_color }}
                            className="font-bold m-0"
                        >
                            Cart
                        </h3>
                        <span
                            className="text-sm  font-bold ab absolute -top-[4px] right-0 rounded-full w-5 h-5 text-center"
                            style={{
                                backgroundColor: design?.text_color,
                                color: design?.header_color,
                            }}
                        >
                            {cartList?.length}
                        </span>
                    </div>
                </div>
            </div>
            <CartSideBar open={open} setOpen={setOpen} />
        </>
    );
};

export default CartPopUpThree;

export const CartSideBar = (props: any) => {
    return (
        <Drawer {...props}>
            <ShoppingCart {...props} />
        </Drawer>
    );
};

export const Drawer = ({ open, setOpen, children }: any) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[110]" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const ShoppingCart = ({ setOpen }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const total = subTotal(cartList);

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl relative">
            <div className="flex-1 ">
                <div className="flex items-start justify-between bg-black py-3 px-3  top-0  right-0 w-full">
                    <Dialog.Title className="text-lg font-medium text-white uppercase">
                        Your Cart
                    </Dialog.Title>
                    <XIcon
                        onClick={() => setOpen(false)}
                        color={'white'}
                        className="h-6 w-6 lg:cursor-pointer"
                        aria-hidden="true"
                    />
                </div>

                <div className="my-6 px-6">
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
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center  bottom-0 right-0">
                <Link
                    onClick={() => setOpen(false)}
                    href="/checkout"
                    className="w-full flex justify-between items-center py-4 divide-x-2 my-3 mx-6 px-6 rounded-md"
                    style={{
                        color: design?.text_color,
                        backgroundColor: design?.header_color,
                    }}
                >
                    <p className="sm:text-base text-sm font-bold ">
                        {design?.template_id === '29'
                            ? 'অর্ডার করুন'
                            : 'Checkout'}
                    </p>{' '}
                    <p className="pl-4 sm:text-base text-sm">
                        {total} <BDT />
                    </p>
                </Link>
            </div>
        </div>
    );
};

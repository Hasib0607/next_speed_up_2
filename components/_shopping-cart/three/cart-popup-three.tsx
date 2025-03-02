'use client';

import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { CartSideBar } from '../_components/cart-side-bar';
import { subTotal } from '@/utils/_cart-utils/cart-utils';

const CartPopUpThree = ({ design }: any) => {
    const [open, setOpen] = useState(false);
    const { cartList } = useSelector((state: RootState) => state.cart);
    const total = subTotal(cartList);

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
            <CartSideBar open={open} setOpen={setOpen} design={design}>
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
            </CartSideBar>
        </>
    );
};

export default CartPopUpThree;

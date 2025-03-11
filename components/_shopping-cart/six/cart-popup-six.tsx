'use client';

import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import { CartSideBar } from '../_components/cart-side-bar';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import './six.css';

const CartPopUpSix = ({ design }: any) => {
  
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const total = subTotal(cartList);

    useEffect(() => {
        if (cartList.length > 0) {
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 1000);
        } else {
            return setActive(false);
        }
    }, [cartList]);

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
                    className={`${
                        active === true ? 'second_button' : ''
                    } fixed z-30 h-20 p-2 right-10 bottom-10  shadow-lg rounded-md lg:cursor-pointer md:block w-20 pb-3`}
                    style={{ backgroundColor: design?.header_color }}
                >
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <GiShoppingCart
                            style={{ color: design?.text_color }}
                            className="font-semibold text-5xl"
                        />
                    </div>

                    <span
                        className={`${
                            active === true ? 'first_button' : ''
                        } font-semibold text-sm  ab absolute -top-[10px] -right-1 rounded-full w-5 h-5 text-center`}
                        style={{
                            backgroundColor: design?.text_color,
                            color: design?.header_color,
                        }}
                    >
                        {cartList.length}
                    </span>
                </div>
            </div>
            <CartSideBar
                open={open}
                setOpen={setOpen}
                design={design}
                incDecOff
            >
                <div className="flex flex-col border border-t border-gray-100 w-full ">
                    <div className="grid grid-cols-2 bg-white shadow-lg py-3 px-6">
                        <p className="text-sm font-medium text-gray-900 text-right">
                            Total
                        </p>
                        <p className="text-sm font-medium text-gray-900 text-right">
                            <span>
                                <BDT price={total} />
                            </span>
                        </p>
                    </div>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/checkout"
                        className="w-full flex justify-center items-center py-2"
                        style={{
                            color: design?.text_color,
                            backgroundColor: design?.header_color,
                        }}
                    >
                        <p className="text-center text-base font-bold">
                            Checkout
                        </p>
                    </Link>
                </div>
            </CartSideBar>
        </>
    );
};

export default CartPopUpSix;

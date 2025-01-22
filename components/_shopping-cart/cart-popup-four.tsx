"use client";

import React, { Fragment, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { XIcon } from "react-share";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import { RootState } from "@/redux/store";
import BDT from "@/utils/bdt";
import { subTotal } from "@/utils/_cart-utils/cart-utils";
import {
  removeFromCartList,
} from '@/redux/features/cart/cartSlice';
import { numberParser } from "@/helpers/numberParser";


const CartPopUpFour = () => {
 const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};
    
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector((state: RootState) => state.cart);
     const total = subTotal(cartList);

  return (
        <>
          <div
            className={`${
              open
                ? "invisible opacity-0 "
                : "invisible sm:opacity-100  lg:visible transition-all duration-1000 ease-linear"
            } `}
          >
            <div
              onClick={() => setOpen(!open)}
              className="fixed z-30 p-2 right-0 top-1/2  shadow-lg rounded-l-md lg:cursor-pointer md:block w-24 pb-3"
              style={{ backgroundColor: design?.header_color }}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="flex justify-center gap-x-1 items-center mb-2">
                  <GiShoppingBag
                    color={design?.text_color}
                    className="font-semibold text-sm"
                  />
                  <div className="flex flex-col leading ">
                    <span
                      className="font-semibold text-sm mt-1"
                      style={{ color: design?.text_color }}
                    >
                      {cartList.length}
                    </span>
                  </div>
                </div>

                <div className="bg-white  text-center py-1  w-full mx-2 rounded-md hover:bg-gray-200">
                  <span className=" text-xs text-center text-black font-semibold tracking-wider ">
                    <BDT price={total} />
                  </span>
                </div>
              </div>
            </div>

            {/*
             */}
          </div>
          <Drawer open={open} setOpen={setOpen}>
            <ShoppingCart open={open} setOpen={setOpen} />
          </Drawer>
        </>
  );
};

export default CartPopUpFour;

const ShoppingCart = ({ setOpen }: any) => {
  const home = useSelector((state: RootState) => state?.home);
  const { design } = home || {};

  const store = useSelector((state: RootState) => state.appStore.store);
  const store_id = store?.id || null;

  const { cartList } = useSelector((state: RootState) => state.cart);
     const total = subTotal(cartList);

  const handleNavLink = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            {" "}
          </Dialog.Title>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartList?.map((product: any, id: any) => (
                <SingleCartProduct key={id} product={product}/>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            <BDT price={total} />
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            onClick={handleNavLink}
            href="/checkout"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
            className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm"
          >
            {store_id === 3512 ? "অর্ডার করতে চাই" : "Checkout"}
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link
              href={"/shop"}
              type="button"
              className="font-medium text-gray-600 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Drawer = ({ open, setOpen, children }: any) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
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

const SingleCartProduct = ({ product }: any) => {
  const dispatch = useDispatch();

  const deleteBtn = (item:any) => {
    dispatch(removeFromCartList(item?.cartId))
    toast.warning("Removed this item from cart!");
  };

  return (
    <motion.li exit={{ y: 10 }} key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={productImg + product.image[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 capitalize">
            <h3>
              <Link href={"/product/" + product?.id + "/" + product?.slug}>
                {" "}
                {product?.name}{" "}
              </Link>
            </h3>
            <div className="ml-4 min-w-fit">
              <BDT price={product?.price} />
            </div>
          </div>
          <div className="flex items-center mt-1">
            {product?.color ? (
              <div className="flex items-center gap-2 pr-2">
                <p className="font-semibold text-sm">Color: </p>
                <p
                  style={{ backgroundColor: product?.color }}
                  className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {product?.size ? (
              <p className="font-semibold text-sm">
                Size:{" "}
                <span className="font-normal text-sm">{product?.size}</span>
              </p>
            ) : null}
            {product?.unit ? (
              <p className="font-semibold text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {product?.volume + " " + product?.unit}
                </span>
              </p>
            ) : null}
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">{product?.color ? <><span className='font-semibold text-sm '>Color: </span><span className='capitalize'>{product?.color}</span></> : product?.unit ? <><span className='font-semibold text-sm'>Unit: </span>{product?.volume + " " + product?.unit}</> : null} {product?.size ? <><span className='font-semibold text-sm'>Size: </span>{product?.size} </> : null}</p> */}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {product?.qty}</p>

          <div className="flex">
            <button
              onClick={() => {
                deleteBtn(product);
              }}
              type="button"
              className="font-medium text-gray-800 hover:text-gray-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { forwardRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import { isQtyLeft } from '@/utils/_cart-utils/cart-utils';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { productImg } from '@/site-settings/siteUrl';
import { toast } from 'react-toastify';
import {
    Colors,
    ColorsOnly,
    Sizes,
    Units,
} from '../imageVariations-landing-page';
import CallForPrice from '@/utils/call-for-price';

const CheckOutForm = forwardRef<HTMLDivElement, any>((props, ref) => {
    const {
        design,
        appStore,
        headersetting,
        product,
        qty,
        variantId,
        variant,
        setQty,
        productQuantity,
        currentVariation,
        color,
        size,
        unit,
        filterV,
        onClick,
        setColor,
        variant_color,
        setSize,
        setActiveImg,
        setUnit,
        children,
        buttonStyle,
        price,
        handleCheckout,
    } = props;

    const store_id = appStore?.id || null;
    const dispatch: AppDispatch = useAppDispatch();
    const { cartList } = useSelector((state: RootState) => state.cart);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setPurchaseList([]));
        dispatch(setGrandTotal(0));
    }, [dispatch]);

    const updateQuantity = (
        isAbleToAddOrChange: boolean,
        inputValue: number | null = null
    ) => {
        const newQty = inputValue ?? qty + 1;

        if (newQty <= productQuantity) {
            setQty(newQty);
        } else {
            toast.warning('Cannot add more than available stock', {
                toastId: product?.id,
            });
        }
    };

    const incNum = () => {
        const isAbleToAdd = isQtyLeft(product, variantId, qty + 1, cartList);

        if (variant?.length > 0) {
            if (currentVariation?.colorsAndSizes) {
                if (filterV?.length === 0) {
                    toast.warning('Please Select Variant', {
                        toastId: filterV?.length,
                    });
                    return;
                } else if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: product?.id,
                    });
                    return;
                }
                updateQuantity(isAbleToAdd);
            } else if (currentVariation?.sizesOnly) {
                if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: product?.id,
                    });
                    return;
                }
                updateQuantity(isAbleToAdd);
            } else if (currentVariation?.colorsOnly) {
                if (color === null) {
                    toast.warning('Please Select color', {
                        toastId: product?.id,
                    });
                    return;
                }
                updateQuantity(isAbleToAdd);
            } else if (currentVariation?.unitsOnly) {
                if (unit === null) {
                    toast.warning('Please Select Unit', {
                        toastId: product?.id,
                    });
                    return;
                }
                updateQuantity(isAbleToAdd);
            }
        } else {
            updateQuantity(isAbleToAdd);
        }
    };

    const decNum = () => {
        setQty((prevCount: any) => (prevCount > 1 ? prevCount - 1 : 1));
    };

    return (
        <div className="bg-[#F3F4F6] py-10 my-5" ref={ref}>
            <div className="sm:container px-5 xl:px-24">
                <div className="container">
                    <div className=" mt-1 py-4">
                        <div className="mt-5 lg:mt-0 lg:col-span-1">
                            <div className="border p-5 sm:rounded-md shadow">
                                <div className="mb-12">
                                    <h3 className="text-center font-semibold text-xl">
                                        Product Details
                                    </h3>
                                    <hr className="border-dashed border border-gray-300 my-2 w-36 mx-auto" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">
                                        Product Name
                                    </p>
                                    <p className="font-semibold">Price</p>
                                </div>
                                <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />

                                <div className="">
                                    <div className="flex flex-col justify-between">
                                        <div className="px-2 h-2/3 overflow-y-auto">
                                            <div className="flex justify-between space-x-1 last:border-0 border-b border-gray-400 py-2">
                                                <div className="w-32">
                                                    <img
                                                        className="w-full h-auto "
                                                        src={
                                                            productImg +
                                                            product?.image
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-x-2 gap-y-1 pl-2 w-full">
                                                    <h3 className="text-black text-md whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
                                                        {product?.name}
                                                    </h3>

                                                    <div className="flex flex-col gap-x-2 gap-y-1 justify-start">
                                                        <div className="">
                                                            {currentVariation.colorsAndSizes && (
                                                                <>
                                                                    <Colors
                                                                        color={
                                                                            color
                                                                        }
                                                                        setColor={
                                                                            setColor
                                                                        }
                                                                        variant_color={
                                                                            variant_color
                                                                        }
                                                                        setSize={
                                                                            setSize
                                                                        }
                                                                        setActiveImg={
                                                                            setActiveImg
                                                                        }
                                                                    />
                                                                    <Sizes
                                                                        size={
                                                                            size
                                                                        }
                                                                        setSize={
                                                                            setSize
                                                                        }
                                                                        variant={
                                                                            filterV
                                                                        }
                                                                        setActiveImg={
                                                                            setActiveImg
                                                                        }
                                                                    />
                                                                </>
                                                            )}

                                                            {currentVariation.unitsOnly && (
                                                                <Units
                                                                    unit={unit}
                                                                    setUnit={
                                                                        setUnit
                                                                    }
                                                                    variant={
                                                                        variant
                                                                    }
                                                                    setActiveImg={
                                                                        setActiveImg
                                                                    }
                                                                />
                                                            )}

                                                            {currentVariation.colorsOnly && (
                                                                <ColorsOnly
                                                                    color={
                                                                        color
                                                                    }
                                                                    setColor={
                                                                        setColor
                                                                    }
                                                                    variant={
                                                                        variant
                                                                    }
                                                                    setActiveImg={
                                                                        setActiveImg
                                                                    }
                                                                />
                                                            )}

                                                            {currentVariation.sizesOnly && (
                                                                <Sizes
                                                                    size={size}
                                                                    setSize={
                                                                        setSize
                                                                    }
                                                                    variant={
                                                                        variant
                                                                    }
                                                                    setActiveImg={
                                                                        setActiveImg
                                                                    }
                                                                />
                                                            )}

                                                            <div className="">
                                                                <CallForPrice
                                                                    headersetting={
                                                                        headersetting
                                                                    }
                                                                    cls={
                                                                        buttonStyle
                                                                    }
                                                                    price={
                                                                        price
                                                                    }
                                                                />
                                                            </div>
                                                            {children}
                                                        </div>

                                                        <div className="flex h-7 w-24 justify-between items-center rounded-md font-semibold bg-[var(--header-color)] text-[var(--text-color)]">
                                                            <div
                                                                onClick={decNum}
                                                                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                                                            >
                                                                <MinusIcon
                                                                    className="text-[var(--text-color)]"
                                                                    width={15}
                                                                />
                                                            </div>
                                                            <div className="text-[var(--text-color)]">
                                                                {qty}
                                                            </div>
                                                            <div
                                                                onClick={incNum}
                                                                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                                                            >
                                                                <PlusIcon
                                                                    className="text-[var(--text-color)]"
                                                                    width={15}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm justify-self-end flex items-center gap-x-2">
                                                        <BDT />
                                                        <span className="font-bold text-xl text-gray-500">
                                                            {price}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />

                                <div
                                    className="my-5 text-gray-500 px-2"
                                    style={{ fontWeight: 500 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <p>Sub Total</p>
                                        <p>
                                            <BDT
                                                price={numberParser(
                                                    price * qty
                                                )}
                                            />
                                        </p>
                                    </div>

                                    <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />
                                    <div className="flex justify-between items-center  font-semibold">
                                        <p>Total</p>
                                        <p>
                                            <BDT
                                                price={numberParser(
                                                    price * qty
                                                )}
                                            />
                                        </p>
                                    </div>
                                </div>
                                {isLoading ? (
                                    <div className="flex justify-center items-center font-semibold tracking-wider my-1 rounded-full border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] border-gray-300 w-full py-3">
                                        Loading
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleCheckout}
                                        className={`flex justify-center items-center font-semibold tracking-wider my-1 rounded-full border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] hover:bg-transparent border-gray-300 w-full py-3 disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300`}
                                    >
                                        {'Checkout'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

CheckOutForm.displayName = 'CheckOutForm';

export default CheckOutForm;

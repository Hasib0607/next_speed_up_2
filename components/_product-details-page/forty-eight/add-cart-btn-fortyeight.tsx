'use client';

import { getDataByType } from '@/helpers/getCustomDataByType';
import { classNames } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import { isActiveCart, isQtyLeft } from '@/utils/_cart-utils/cart-utils';
import { useRouter } from 'next/navigation';

import { useEffect, useMemo } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddCartBtnFortyEight = ({
    setQty,
    qty,
    variant,
    variantId,
    productQuantity,
    currentVariation,
    color,
    size,
    unit,
    filterV,
    onClick,
    buttonOne,
    product,
    children,
}: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);
    const router = useRouter();

    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

    const customDesignData = getDataByType(
        headersetting,
        'single_product_page'
    );

    const {
        button,
        button_color,
        button_bg_color,
        button1,
        button1_color,
        button1_bg_color,
        is_buy_now_cart,
        is_buy_now_cart1,
    } = customDesignData || {};

    const isEmpty = useMemo(
        () => Object.keys(customDesignData).length === 0,
        [customDesignData]
    );

    const hasInCartList = useMemo(
        () => isActiveCart(product, cartList, variantId),
        [variantId, product, cartList]
    );

    const updateQuantity = (
        isAbleToAddOrChange: boolean,
        inputValue: number | null = null
    ) => {
        const newQty = inputValue ?? qty + 1;

        if (hasInCartList) {
            if (isAbleToAddOrChange) {
                setQty(inputValue ?? ((prevCount: number) => prevCount + 1));
            } else {
                toast.warning('Cannot add more than available stock', {
                    toastId: product?.id,
                });
            }
        } else if (newQty <= productQuantity) {
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
            // Color and size
            if (currentVariation?.colorsAndSizes) {
                // Early exit if variant and size/filter conditions are not satisfied
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
                // Proceed with quantity addition checks
                updateQuantity(isAbleToAdd);
            }

            // size only
            else if (currentVariation?.sizesOnly) {
                if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: product?.id,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleToAdd);
            }

            // color only
            else if (currentVariation?.colorsOnly) {
                if (color === null) {
                    toast.warning('Please Select color', {
                        toastId: product?.id,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleToAdd);
            }

            // unit only
            else if (currentVariation?.unitsOnly) {
                if (unit === null) {
                    toast.warning('Please Select Unit', {
                        toastId: product?.id,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleToAdd);
            }
        } else {
            // Proceed with quantity addition checks
            updateQuantity(isAbleToAdd);
        }
    };

    const decNum = () => {
        setQty((prevCount: any) => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const buy_now = () => {
        onClick();
        router.push('/checkout');
    };

    useEffect(() => {
        if (variantId) {
            setQty(1);
        }
    }, [variantId, setQty]);

    const cssStyle = `
    .c_button {
        color:  ${button_color};
        background: ${button_bg_color};
        border: 2px solid transparent;
    }
    .c_button:hover {
        color:  ${button_bg_color};
        background: transparent;
        border: 2px solid black;
    }
    .c_button1 {
        color:  ${button1_color};
        background: ${button1_bg_color};
        border: 2px solid transparent;
    }
    .c_button1:hover {
        color:  ${button1_bg_color};
        background: transparent;
        border: 2px solid black;
    }
    `;

    return (
        <div className="flex sm:flex-row flex-col sm:items-center gap-3 relative">
            <style>{cssStyle}</style>

            {/* Quantity Selector */}
            <div className="border border-gray-200 w-max grid grid-cols-2 justify-items-center items-center ">
                <div className="row-span-2 py-1 border-r-[1px] border-gray-200">
                    <input
                        type="text"
                        className="form-control w-10 text-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 py-[1px] sm:py-[7px] text-lg font-semibold"
                        value={qty}
                        disabled
                    />
                </div>
                <div
                    onClick={incNum}
                    className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer border-b-[1px] border-gray-200 flex justify-center"
                >
                    <button className="focus:outline-none " type="button">
                        <MdKeyboardArrowUp />
                    </button>
                </div>
                <div
                    onClick={decNum}
                    className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer flex justify-center"
                >
                    <button className="focus:outline-none" type="button">
                        <MdKeyboardArrowDown />
                    </button>
                </div>
            </div>

            {/* Button Section */}
            <div className="flex sm:static fixed bottom-0 left-0 mb-12 md:mb-0 w-full sm:w-auto sm:relative justify-center flex-row gap-2 bg-white sm:bg-transparent z-50 px-4 py-2 sm:p-0">
                {productQuantity === 0 ? (
                    <button className={buttonOne}> Sold Out</button>
                ) : (
                    <>
                        {isEmpty && (
                            <button
                                onClick={onClick}
                                className={classNames(
                                    buttonOne
                                        ? buttonOne
                                        : `cart-btn-twenty-one mt-3 font-bold py-[11px] px-10 w-full rounded-full`,
                                    'c_button1'
                                )}
                            >
                                <p className="center gap-2">
                                    <HiShoppingCart className="inline text-lg mr-2" />
                                    {children ?? 'Add to cart'}
                                </p>
                            </button>
                        )}
                        {button && (
                            <button
                                className={classNames(
                                    buttonOne
                                        ? buttonOne
                                        : `cart-btn-twenty-one mt-3 font-bold py-[11px] px-10 w-full rounded-full`,
                                    'c_button'
                                )}
                                onClick={
                                    numberParser(is_buy_now_cart) == 1
                                        ? buy_now
                                        : onClick
                                }
                            >
                                <p className="center gap-2">
                                    <HiShoppingCart className="inline text-lg mr-2" />
                                    {button}
                                </p>
                            </button>
                        )}
                        {isEmpty && (
                            <div
                                onClick={buy_now}
                                className={classNames(
                                    buttonOne
                                        ? buttonOne
                                        : `cart-btn-twenty-one mt-3 font-bold py-[11px] px-10 w-full rounded-full`,
                                    'c_button1'
                                )}
                            >
                                <p className="center gap-2">
                                    <HiShoppingCart className="inline text-lg mr-2" />
                                    {'ORDER NOW'}
                                </p>
                            </div>
                        )}
                        {button1 && (
                            <button
                                onClick={
                                    numberParser(is_buy_now_cart1) == 1
                                        ? buy_now
                                        : onClick
                                }
                                type="submit"
                                className={classNames(
                                    buttonOne
                                        ? buttonOne
                                        : `cart-btn-twenty-one mt-3 font-bold py-[11px] px-10 w-full rounded-full`,
                                    'c_button1'
                                )}
                            >
                                <p className="center gap-2">
                                    <HiShoppingCart className="inline text-lg mr-2" />
                                    {button1}
                                </p>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AddCartBtnFortyEight;

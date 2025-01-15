'use client';

import { RootState } from '@/redux/store';
import {
    isActiveCart,
    isEqlQty,
    isQtyLeft,
} from '@/utils/_cart-utils/cart-utils';
import { HiMinus, HiPlus } from 'react-icons/hi';

import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddCartBtnSixteen = ({
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
}: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const inputRef = useRef<HTMLInputElement>(null);

    const { headersetting } = useSelector((state: RootState) => state.home); // Access updated Redux state

    const { button } =
        headersetting?.custom_design?.single_product_page?.[0] || {};

    const isDisabled = useMemo(
        () => isEqlQty(product, variantId, cartList),
        [product, variantId, cartList]
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

    useEffect(() => {
        if (variantId) {
            setQty(1);
        }
    }, [variantId, setQty]);

    return (
        <div className="flex lg2:flex-row flex-col justify-start lg2:items-center gap-8 py-10">
            <p className="text-base pb-2 pt-4">QTY</p>

            <div className="flex flex-col lg2:flex-row gap-5">
                <div className=" w-max flex items-center">
                    <button
                        className="px-4 py-3 rounded-tl-full rounded-bl-full text-xl custom-all text-white"
                        type="button"
                        onClick={decNum}
                    >
                        <HiMinus />
                    </button>

                    {isDisabled ? (
                        <div className="center w-24 py-2 text-lg font-semibold">
                            {qty}
                        </div>
                    ) : (
                        <input
                            type="number"
                            className="form-control w-24 text-center border-cart py-[7px] text-lg font-semibold"
                            value={qty}
                            ref={inputRef}
                            disabled
                        />
                    )}

                    <button
                        className="px-4 py-3 rounded-tr-full rounded-br-full text-xl custom-all text-white"
                        type="button"
                        onClick={incNum}
                    >
                        <HiPlus />
                    </button>
                </div>
                <button
                    onClick={onClick}
                    type="submit"
                    className={buttonOne ? buttonOne : 'flex group bg-gray-200'}
                >
                    {button || '+ ADD TO CART'}
                </button>
            </div>
        </div>
    );
};

export default AddCartBtnSixteen;

'use client';

import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import {
    isActiveCart,
    isEqlQty,
    isQtyLeft,
} from '@/utils/_cart-utils/cart-utils';

import {
    ChevronDownIcon,
    ChevronUpIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddCartBtnThirteen = ({
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

    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

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
            <p className="text-sm text-[#353535]">Quantity</p>
            <div className="flex space-x-4 mb-4">
                {/* Quantity  */}
                <div className="flex">
                    <div className="border border-gray-100 w-14 h-10 flex justify-center items-center font-semibold">
                        {isDisabled ? (
                            <div className="center w-24 py-2 text-lg font-semibold">
                                {qty}
                            </div>
                        ) : (
                            <input
                                type="number"
                                className="h-full w-full focus:ring-0 focus:border-gray-300 ring-0 border-gray-200 text-black"
                                value={qty}
                                ref={inputRef}
                                disabled
                            />
                        )}
                    </div>
                    <div className="flex flex-col h-full ml-1">
                        <div
                            onClick={incNum}
                            className="border border-gray-200 h-1/2"
                        >
                            <ChevronUpIcon
                                width={16}
                                className={'text-gray-600'}
                            />
                        </div>
                        <div
                            onClick={decNum}
                            className="border border-gray-200 h-1/2"
                        >
                            <ChevronDownIcon
                                width={16}
                                className={'text-gray-600'}
                            />
                        </div>
                    </div>
                </div>
                {/* Add to Cart  */}
                <button
                    onClick={onClick}
                    type={'submit'}
                    className={
                        buttonOne
                            ? buttonOne
                            : 'flex group bg-gray-200 lg:cursor-pointer'
                    }
                >
                    <div className="h-full w-12 flex items-center justify-center bg-gray-300 group-hover:bg-red-500 group-hover:text-white transition-all duration-200 ease-linear">
                        <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                    <div className="h-full px-2 grow flex items-center justify-center hover:bg-gray-100  transition-all duration-200 ease-linear lg:cursor-pointer">
                        <p className="uppercase px-1 text-xs sm:text-sm ">
                            {button || ' Add To Cart'}
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AddCartBtnThirteen;

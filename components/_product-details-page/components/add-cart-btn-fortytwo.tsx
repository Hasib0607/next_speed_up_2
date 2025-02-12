'use client';

import { RootState } from '@/redux/store';
import { isActiveCart, isQtyLeft } from '@/utils/_cart-utils/cart-utils';

import { IoMdCart } from 'react-icons/io';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { IoMdHeartEmpty, IoIosReturnLeft } from 'react-icons/io';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { customizeSingleProductPage } from '@/utils/customizeDesign';
import { useRouter } from 'next/navigation';
import { numberParser } from '@/helpers/numberParser';

const AddCartBtnFortyTwo = ({
    headersetting,
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
    const store_id = numberParser(headersetting?.store_id) || null;

    const customizeTextData = customizeSingleProductPage.find(
        (item) => item.id == store_id
    );

    const { cartList } = useSelector((state: RootState) => state.cart);

    const router = useRouter();

    const { button } =
        headersetting?.custom_design?.single_product_page?.[0] || {};

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

    return (
        <div className="flex flex-col justify-start gap-3 py-1 lg:w-96">
            <p className="text-sm">Quantity</p>
            <div
                className="flex border border-black rounded-md w-max"
                // style={
                //   {
                //     "--header-color": design?.header_color,
                //     "--text-color": design?.text_color,
                //   } as React.CSSProperties
                // }
            >
                <div
                    className="h-12 w-12  flex justify-center items-center bg-[var(--header-color)] rounded-l-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
                    onClick={decNum}
                >
                    <MinusIcon width={15} />
                </div>
                <div className="h-12 w-16  flex justify-center items-center font-bold">
                    {qty}
                </div>
                <div
                    className="h-12 w-12  flex justify-center items-center bg-[var(--header-color)] rounded-r-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
                    onClick={incNum}
                >
                    <PlusIcon width={15} />
                </div>
            </div>
            <div
                className={`w-full flex items-center gap-2 rounded-md text-center py-3 justify-center lg:cursor-pointer bg-transparent border border-black text-black `}
                onClick={onClick}
            >
                <IoMdCart />
                <button>Add to cart</button>
            </div>
            <div className={`${buttonOne}`} onClick={buy_now}>
                <IoMdCart />
                <button>{button || 'Buy it now'}</button>
            </div>
            {customizeTextData?.customize_text_show_for_watchtime_1 ? (
                customizeTextData?.customize_text_show_for_watchtime_1
            ) : (
                <div className="flex gap-5 md:gap-11 py-4">
                    <div className="flex flex-col items-center justify-center">
                        <IoMdHeartEmpty className="text-[40px]" />
                        <p>Best Quality</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <IoIosReturnLeft className="text-[40px]" />
                        <p>Easy Return</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <MdOutlineLocalShipping className="text-[40px]" />
                        <p>Fast Shipping</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCartBtnFortyTwo;

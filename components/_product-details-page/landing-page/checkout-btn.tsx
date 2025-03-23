'use client';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import {
    isActiveCart,
    isEqlQty,
    isQtyLeft,
} from '@/utils/_cart-utils/cart-utils';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { classNames } from '@/helpers/littleSpicy';

const CheckoutBtn = ({
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
    roundedBtn,
    product,
    children,
    productButton,
}: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = numberParser(e.target.value) || 1;
        const isAbleQtyChange = isQtyLeft(
            product,
            variantId,
            inputValue,
            cartList
        );

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
                        toastId: size,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleQtyChange, inputValue);
            }

            // size only
            else if (currentVariation?.sizesOnly) {
                if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: size,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleQtyChange, inputValue);
            }

            // color only
            else if (currentVariation?.colorsOnly) {
                if (color === null) {
                    toast.warning('Please Select color', {
                        toastId: color,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleQtyChange, inputValue);
            }

            // unit only
            else if (currentVariation?.unitsOnly) {
                if (unit === null) {
                    toast.warning('Please Select Unit', {
                        toastId: unit,
                    });
                    return;
                }
                // Proceed with quantity addition checks
                updateQuantity(isAbleQtyChange, inputValue);
            }
        } else {
            // Proceed with quantity addition checks
            updateQuantity(isAbleQtyChange, inputValue);
        }
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

    // const cssStyle = `
    // .c_button {
    //     color:  ${button_color};
    //     border: 2px solid ${button_color};
    // }
    // .c_button:hover {
    //     color:  ${button_bg_color};
    //     background: ${button_color}
    //     border: 2px solid ${button_color};
    // }
    // .c_button1 {
    //     color:  ${button1_color};
    //     border: 2px solid ${button1_color};
    // }
    // .c_button1:hover {
    //     color:  ${button1_bg_color};
    //     background: ${button1_color};
    //     border: 2px solid ${button1_color};
    // }
    // `;

    return (
        <div className="">
            {/* <style>{cssStyle}</style> */}
            <div className="flex justify-center items-center gap-x-10 pb-6">
                {/* <p className="font-bold">Quantity:</p>
                {roundedBtn ? (
                    <div className="w-max flex items-center">
                        <button
                            className="px-4 py-3 border border-gray-100 text-xl bg-gray-50 text-black"
                            type="button"
                            onClick={decNum}
                        >
                            <HiMinus />
                        </button>
                        <input
                            type="number"
                            className="form-control w-14 text-center border border-gray-100 outline-none py-[8px] text-lg font-semibold remove-arrow"
                            value={qty}
                            ref={inputRef}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <button
                            className="px-4 py-3 border border-gray-100 text-xl bg-gray-50 text-black"
                            type="button"
                            onClick={incNum}
                        >
                            <HiPlus />
                        </button>
                    </div>
                ) : (
                    <div className="flex border border-gray-300 divide-x-2 w-max">
                        <div
                            className="h-12 w-12  flex justify-center items-center hover:bg-[var(--header-color)] hover:text-[var(--text-color)] font-semibold transition-all duration-300 ease-linear cursor-pointer"
                            onClick={decNum}
                        >
                            <MinusIcon width={15} />
                        </div>
                        {isDisabled ? (
                            <div className="center w-20 py-2 text-lg font-semibold">
                                {qty}
                            </div>
                        ) : (
                            <input
                                type="number"
                                className="form-control w-20 text-center border-0 outline-none py-2 text-lg font-semibold remove-arrow"
                                value={qty}
                                ref={inputRef}
                                onChange={(e) => handleInputChange(e)}
                            />
                        )}
                        <div
                            className="h-12 w-12  flex justify-center items-center hover:bg-[var(--header-color)] hover:text-[var(--text-color)] font-semibold transition-all duration-300 ease-linear cursor-pointer"
                            onClick={incNum}
                        >
                            <PlusIcon width={15} />
                        </div>
                    </div>
                )} */}

                <div className="flex flex-wrap gap-6">
                    <div className="">
                        {productQuantity === 0 ? (
                            <button className={buttonOne}>Out of Stock</button>
                        ) : (
                            <>
                                <button
                                    className="px-6 py-3"
                                    style={{
                                        backgroundColor: productButton?.design?.bg_color || '#ffffff',
                                        color: productButton?.design?.color || '#f1593a',
                                        border: `2px solid ${productButton?.design?.color || '#f1593a'}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            productButton?.design?.hover_color || '#f1593a';
                                        e.currentTarget.style.color =
                                            productButton?.design?.bg_color || '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            productButton?.design?.bg_color || '#ffffff';
                                        e.currentTarget.style.color =
                                            productButton?.design?.color || '#f1593a';
                                    }}
                                    onClick={buy_now}
                                >
                                    {productButton?.button}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutBtn;

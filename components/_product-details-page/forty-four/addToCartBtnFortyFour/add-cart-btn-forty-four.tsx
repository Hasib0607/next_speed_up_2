'use client';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import {
    isActiveCart,
    isEqlQty,
    isQtyLeft,
} from '@/utils/_cart-utils/cart-utils';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDataByType } from '@/helpers/getCustomDataByType';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { classNames } from '@/helpers/littleSpicy';
import { ImPlus } from 'react-icons/im';

const AddToCartBtnFortyFour = ({
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
    className,
    children,
}: any) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const { cartList } = useSelector((state: RootState) => state.cart);
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

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
    const hasImages = useMemo(
        () => variant?.some((item: any) => item?.image),
        [variant]
    );
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
                    toast.warning(
                        `Please Select ${hasImages ? 'Pattern' : 'Size'}`,
                        {
                            toastId: product?.id,
                        }
                    );
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
                    toast.warning(
                        `Please Select ${hasImages ? 'Pattern' : 'Size'}`,
                        {
                            toastId: product?.id,
                        }
                    );
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

    useEffect(() => {
        if (productQuantity === 0 || isDisabled) {
            setDisabled(true);
        }else{
            setDisabled(false)
        }
    }, [productQuantity,isDisabled]);

    const cssStyle = `
        .c_button {
            color:  ${button_color};
            background: ${button_bg_color};
            opacity: 0.90;
        }
        .c_button:hover {
            color:  ${button_color};
            background: ${button_bg_color};
            opacity: 1;
        }
        .c_button1 {
            color:  ${button1_color};
            background: ${button1_bg_color};
            opacity: 0.90;
        }
        .c_button1:hover {
            color:  ${button1_color};
            background: ${button1_bg_color};
            opacity: 1;
        }
    `;

    const fallbackBtnStyle =
        'text-sm font-normal py-2 px-3 max-w-44 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700';    

    return (
        <div className={className ?? 'flex flex-wrap justify-start gap-5'}>
            <style>{cssStyle}</style>

            <div className="text-sm font-normal max-w-44 center border border-gray-500 py-[2px]">
                <button
                    className={fallbackBtnStyle}
                    type="button"
                    onClick={decNum}
                >
                    <HiMinus />
                </button>
                {isDisabled ? (
                    <div className="text-center h-auto w-14">{qty}</div>
                ) : (
                    <input
                        type="number"
                        className="text-center h-auto w-14 remove-arrow"
                        value={qty}
                        ref={inputRef}
                        onChange={(e) => handleInputChange(e)}
                    />
                )}
                <button
                    className={fallbackBtnStyle}
                    type="button"
                    onClick={incNum}
                >
                    <HiPlus />
                </button>
            </div>
            <>
                {isEmpty && (
                    <button
                        onClick={onClick}
                        className={classNames(
                            buttonOne ? buttonOne : fallbackBtnStyle,
                            !disabled && 'c_button1'
                        )}
                        disabled={disabled}
                    >
                        <p className="center gap-2">
                            <ImPlus />
                            {disabled
                                ? 'Out of Stock'
                                : (children ?? 'Add to cart')}
                        </p>
                    </button>
                )}
                {isEmpty && (
                    <button
                        onClick={buy_now}
                        className={classNames(
                            buttonOne ? buttonOne : fallbackBtnStyle,
                            !disabled && 'c_button1'
                        )}
                        disabled={disabled}
                    >
                        <p className="center gap-2">
                            <ImPlus />
                            {'ORDER NOW'}
                        </p>
                    </button>
                )}
                {button && (
                    <button
                        className={classNames(
                            buttonOne ? buttonOne : fallbackBtnStyle,
                            !disabled && 'c_button'
                        )}
                        onClick={
                            numberParser(is_buy_now_cart) == 1
                                ? buy_now
                                : onClick
                        }
                        disabled={disabled}
                    >
                        <p className="center gap-x-2">
                            <ImPlus />
                            {button}
                        </p>
                    </button>
                )}
                {button1 && (
                    <button
                        onClick={
                            numberParser(is_buy_now_cart1) == 1
                                ? buy_now
                                : onClick
                        }
                        disabled={disabled}
                        className={classNames(
                            buttonOne ? buttonOne : fallbackBtnStyle,
                            !disabled && 'c_button1'
                        )}
                    >
                        <p className="center gap-2">
                            <ImPlus />
                            {button1}
                        </p>
                    </button>
                )}
            </>
        </div>
    );
};

export default AddToCartBtnFortyFour;

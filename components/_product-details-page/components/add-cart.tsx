'use client';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import {
    isActiveCart,
    isEqlQty,
    isQtyLeft,
} from '@/utils/_cart-utils/cart-utils';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddCart = ({
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

    const { custom_design } = headersetting || {};
    const singleProductPageData = custom_design?.single_product_page?.[0] || {};
    const { button } = singleProductPageData || {};

    const isDisabled = useMemo(
        () => isEqlQty(product, variantId, cartList),
        [product, variantId, cartList]
    );

    const hasInCartList = useMemo(
        () => isActiveCart(variantId, product, cartList),
        [variantId, product, cartList]
    );

    // const quantityAddition = (isAbleToAdd: boolean) => {
    //     if (hasInCartList) {
    //         if (isAbleToAdd) {
    //             setQty((prevCount: number) => prevCount + 1);
    //         } else {
    //             toast.warning('Cannot add more than available stock', {
    //                 toastId: variantId,
    //             });
    //         }
    //     } else if (qty + 1 <= productQuantity) {
    //         setQty((prevCount: number) => prevCount + 1);
    //     } else {
    //         toast.warning('Cannot add more than available stock', {
    //             toastId: product?.id,
    //         });
    //     }
    // };

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

    // const quantityAdditionCng = (isAbleQtyChange: boolean,inputValue:number) => {
    //     if (hasInCartList) {
    //         if (isAbleQtyChange) {
    //             setQty(inputValue);
    //         } else {
    //             toast.warning('Cannot add more than available stock', {
    //                 toastId: variantId,
    //             });
    //         }
    //     } else if (inputValue <= productQuantity) {
    //         setQty(inputValue);
    //     } else {
    //         toast.warning('Cannot add more than available stock', {
    //             toastId: product?.id,
    //         });
    //     }
    // };

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

    useEffect(() => {
        if (variantId) {
            setQty(1);
        }
    }, [variantId, setQty]);

    return (
        <div className="flex lg2:flex-row flex-col justify-start lg2:items-center gap-8 py-10">
            <div className="flex border border-gray-300 divide-x-2 rounded-md w-max">
                <div
                    className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibold transition-all duration-300 ease-linear"
                    onClick={decNum}
                >
                    <MinusIcon width={15} />
                </div>
                {isDisabled ? (
                    <div className="center w-24 py-2 text-lg font-semibold">
                        {qty}
                    </div>
                ) : (
                    <input
                        type="number"
                        className="form-control w-24 text-center border-0 outline-none py-2 text-lg font-semibold remove-arrow"
                        value={qty}
                        ref={inputRef}
                        onChange={(e) => handleInputChange(e)}
                    />
                )}
                <div
                    className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibold transition-all duration-300 ease-linear"
                    onClick={incNum}
                >
                    <PlusIcon width={15} />
                </div>
            </div>
            <div className="">
                {product?.quantity === 0 ? (
                    <button className={buttonOne}>Out of Stock</button>
                ) : (
                    <button className={buttonOne} onClick={onClick}>
                        {button || 'Add to cart'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddCart;

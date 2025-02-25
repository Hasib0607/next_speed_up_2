'use client';

import { getCampainOfferDiscount } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import {
    addToCartList,
    decreaseQuantity,
    increaseQuantity,
    removeFromCartList,
} from '@/redux/features/cart/cartSlice';

import { AppDispatch } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { toast } from 'react-toastify';

export const handleIncrement = (dispatch: AppDispatch, item: any): void => {
    if (item?.qty >= item?.availability) {
        toast.warning('Out of Stock', {
            toastId: item?.availability,
        });
    } else {
        dispatch(increaseQuantity(item?.cartId));
        toast.success('Successfully added to cart', {
            toastId: item?.cartId,
        });
    }
};

export const handleDecrement = (dispatch: AppDispatch, item: any): void => {
    if (item?.qty - 1 <= 0) {
        dispatch(removeFromCartList(item?.cartId));
        toast.warning('Successfully Removed from cart', {
            toastId: item?.cartId,
        });
    } else {
        dispatch(decreaseQuantity(item?.cartId));
        toast.success('Successfully decreased from cart', {
            toastId: item?.id,
        });
    }
};

export const isActiveCart = (product: any, cartList: any, variantId?: any) => {
    let isProductInList = false;
    cartList?.map((item: any) => {
        if (product?.variant?.length > 0) {
            if (variantId == item?.variant_id && item?.id == product?.id) {
                isProductInList = true;
            }
        } else {
            if (item?.id == product?.id) {
                isProductInList = true;
            }
        }
    });

    return isProductInList;
};

export const isQtyLeft = (
    product: any,
    variantId: any,
    qty: number,
    cartList: any
) => {
    const cartItem = cartList?.find((item: any) => {
        if (product?.variant?.length > 0) {
            if (variantId == item?.variant_id && item?.id == product?.id) {
                return item;
            }
        } else {
            if (item?.id == product?.id) {
                return item;
            }
        }
    });

    if (cartItem) {
        return cartItem && cartItem?.qty + qty <= cartItem?.availability;
    } else {
        return false;
    }
};

export const isEqlQty = (product: any, variantId: any, cartList: any) => {
    const cartItem = cartList?.find((item: any) => {
        if (product?.variant?.length > 0) {
            if (variantId == item?.variant_id && item?.id == product?.id) {
                return item;
            }
        } else {
            if (item?.id == product?.id) {
                return item;
            }
        }
    });

    if (cartItem) {
        return cartItem && cartItem?.qty == cartItem?.availability;
    } else {
        return false;
    }
};

export const subTotal = (cartList: any) => {
    const priceList = cartList?.map((item: any) => item.price * item.qty);
    const total = priceList?.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        0
    );
    return total;
};

export const totalCampainOfferDiscount = (cartList: any) => {
    const campainOfferDiscountList = cartList?.map((item: any) => {
        let offerPrice = getCampainOfferDiscount(item);
        return offerPrice;
    });

    const campainOfferDiscountListTotal = campainOfferDiscountList?.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        0
    );

    return campainOfferDiscountListTotal;
};

export const grandTotal = (
    total: any,
    tax: any,
    shippingArea: any,
    totalDis: any
) => {
    const gTotal =
        shippingArea === '--Select Area--' || shippingArea === null
            ? numberParser(total) + numberParser(tax) - numberParser(totalDis)
            : numberParser(total) +
              numberParser(tax) +
              numberParser(shippingArea) -
              numberParser(totalDis);

    return gTotal;
};

// add to cart
export const addToCart = ({
    dispatch,
    product,
    cartList,
    price,
    qty,
    variant = [],
    variantId = null,
    currentVariation,
    unit = null,
    size = null,
    color = null,
    filterV = [],
    productQuantity,
}: {
    dispatch: AppDispatch;
    product: any;
    cartList: any[];
    price: number;
    qty: number;
    variant?: any[];
    currentVariation?: any;
    variantId?: any;
    unit?: any;
    size?: any;
    color?: any;
    filterV?: any[];
    productQuantity: number;
}) => {
    const hasInCartList = isActiveCart(product, cartList, variantId);
    const isAbleToCart = isQtyLeft(product, variantId, qty, cartList);

    const addOnBoard = () => {
        dispatch(
            addToCartList({
                price,
                qty,
                availability: productQuantity,
                variant_id: variantId,
                ...product,
            })
        );
        sendGTMEvent({
            event: 'add_to_cart',
            value: {
                price,
                qty,
                availability: productQuantity,
                variant_id: variantId,
                ...product,
            },
        });
    };

    if (hasInCartList && !isAbleToCart) {
        toast.warning('Cannot add more than available stock', {
            toastId: product?.id,
        });
        return;
    } else {
        if (variant?.length > 0) {
            // size and color
            if (currentVariation?.colorsAndSizes) {
                // alert variant add
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
                addOnBoard();
                toast.success('Successfully you added to cart', {
                    toastId: variantId,
                });
            }

            // unit only
            else if (currentVariation?.unitsOnly) {
                // alert variant add
                if (unit === null) {
                    toast.warning('Please Select Unit', {
                        toastId: product?.id,
                    });
                    return;
                }
                addOnBoard();
                toast.success('Successfully you added to cart', {
                    toastId: unit?.id,
                });
            }

            // size only
            else if (currentVariation?.sizesOnly) {
                // alert variant add
                if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: product?.id,
                    });
                    return;
                }
                addOnBoard();
                toast.success('Successfully you added to cart', {
                    toastId: size?.id,
                });
            }

            // color only
            else if (currentVariation?.colorsOnly) {
                // alert variant add
                if (color === null) {
                    toast.warning('Please Select color', {
                        toastId: product?.id,
                    });
                    return;
                }
                addOnBoard();
                toast.success('Successfully you added to cart', {
                    toastId: color?.id,
                });
            }
        } else {
            addOnBoard();
            toast.success('Successfully you added to cart', {
                toastId: product?.id,
            });
        }
    }
};

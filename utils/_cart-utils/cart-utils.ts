'use client';

import {
    addToCartList,
    decreaseQuantity,
    increaseQuantity,
    removeFromCartList,
} from '@/redux/features/cart/cartSlice';

import { toast } from 'react-toastify';
import { AppDispatch } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';

export const handleIncrement = (dispatch: AppDispatch, item: any): void => {
    if (item?.qty >= item?.availability) {
        toast.warning('Out of Stock', {
            toastId: item?.availability,
        });
    } else {
        dispatch(increaseQuantity(item?.cartId));
        toast.success('Successfully added to cart', {
            toastId: item?.qty,
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

export const isActiveCart = (variantId: any, product: any, cartList: any) => {
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

export const isEqlQty = (product: any, variantId: any,  cartList: any) => {
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
    const total = priceList.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        0
    );
    return total;
};

export const grandTotal = (
    total: any,
    tax: any,
    shippingArea: any,
    couponDis: any
) => {
    const gTotal =
        parseInt(total) +
        parseInt(tax) +
        parseInt(shippingArea) -
        parseInt(couponDis);

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
    variantId?: any;
    unit?: any;
    size?: any;
    color?: any;
    filterV?: any[];
    productQuantity?: number;
}) => {
    const hasInCartList = isActiveCart(variantId, product, cartList);
    const isAbleToCart = isQtyLeft(product, variantId, qty, cartList);

    if (hasInCartList && !isAbleToCart) {
        toast.warning('Cannot add more than available stock', {
            toastId: product?.id,
        });
        return;
    } else {
        if (variant?.length) {
            // unit with offer
            if (unit) {
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
                toast.success('Successfully you added to cart', {
                    toastId: variantId,
                });
            }

            // size and color also with offer
            else if (size && filterV) {
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
                toast.success('Successfully you added to cart', {
                    toastId: variantId,
                });
            }

            // color with offer
            else if (color && filterV.length === 0) {
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
                toast.success('Successfully you added to cart', {
                    toastId: variantId,
                });
            }

            // alert variant add
            else if (filterV?.length === 0) {
                toast.warning('Please Select Variant', {
                    toastId: filterV?.length,
                });
            } else if (size === null) {
                toast.warning('Please Select Size', {
                    toastId: size,
                });
            }
        } else {
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
            toast.success('Successfully you added to cart');
        }
    }
};

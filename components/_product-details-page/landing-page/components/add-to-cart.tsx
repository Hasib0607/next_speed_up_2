'use client';

import { addToCartList } from '@/redux/features/cart/cartSlice';
import { AppDispatch } from '@/redux/store';
import { sendGTMEvent } from '@next/third-parties/google';
import { toast } from 'react-toastify';

// Add return type to function signature
export const addToCart = ({
    dispatch,
    product,
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
    price: number;
    qty: number;
    variant?: any[];
    currentVariation?: any;
    variantId?: any;
    unit?: any;
    size?: any;
    color?: any;
    filterV?: any[];
    productQuantity?: number;
}): boolean => {
    // Added boolean return type
    const hasImages = variant?.some((item: any) => item?.image);

    const addOnBoard = () => {
        if (productQuantity !== 0 && price !== 0) {
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
            return true;
        }
        return false;
    };

    try {
        if (variant?.length > 0) {
            if (currentVariation?.colorsAndSizes) {
                if (filterV?.length === 0) {
                    toast.warning('Please Select Variant', {
                        toastId: filterV?.length,
                    });
                    return false;
                }
                if (size === null) {
                    toast.warning(`Please Select Size`, {
                        toastId: product?.id,
                    });
                    return false;
                }
                const added = addOnBoard();
                if (added) {
                    toast.success('Successfully added to cart', {
                        toastId: variantId,
                    });
                }
                return added;
            }

            if (currentVariation?.unitsOnly) {
                if (unit === null) {
                    toast.warning('Please Select Unit', {
                        toastId: product?.id,
                    });
                    return false;
                }
                const added = addOnBoard();
                if (added) {
                    toast.success('Successfully added to cart', {
                        toastId: unit?.id,
                    });
                }
                return added;
            }

            if (currentVariation?.sizesOnly) {
                if (size === null) {
                    toast.warning('Please Select Size', {
                        toastId: product?.id,
                    });
                    return false;
                }
                const added = addOnBoard();
                if (added) {
                    toast.success('Successfully added to cart', {
                        toastId: size?.id,
                    });
                }
                return added;
            }

            if (currentVariation?.colorsOnly) {
                if (color === null) {
                    toast.warning('Please Select color', {
                        toastId: product?.id,
                    });
                    return false;
                }
                const added = addOnBoard();
                if (added) {
                    toast.success('Successfully added to cart', {
                        toastId: color?.id,
                    });
                }
                return added;
            }
        }

        // Non-variant product case
        const added = addOnBoard();
        if (added) {
            toast.success('Successfully added to cart', {
                toastId: product?.id,
            });
        }
        return added;
    } catch (error) {
        console.error('Add to cart error:', error);
        return false;
    }
};

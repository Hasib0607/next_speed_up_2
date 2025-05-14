import { OpsType } from '@/types/cart';
import { apiSlice } from '../api/apiSlice';
import {
    addToCartList,
    decreaseQuantity,
    increaseQuantity,
    removeFromCartList,
    mutateCartItem,
} from './cartSlice';
import { toast } from 'react-toastify';
import { handleClearCart } from '@/utils/_cart-utils/cart-utils';
import { makeUniqueid } from '@/helpers/getBakedId';
import { numberParser } from '@/helpers/numberParser';

// Inject the getHome mutation endpoint into apiSlice
export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendCartInfo: builder.mutation({
            query: ({ ops, item }) => ({
                url: `store/cart/add`,
                method: 'POST',
                body: item,
            }),
            async onQueryStarted({ ops, item }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    //  do the job
                    if (ops.operations === OpsType.ADD) {
                        const dbItemRes = data?.data?.data || {
                            id: null,
                        };

                        const mutateData = {
                            cartId: item?.cartId,
                            dbCartId: dbItemRes?.id,
                        };

                        dispatch(mutateCartItem(mutateData));
                    }

                    if (!data?.status) {
                        switch (ops.operations) {
                            case OpsType.ADD:
                                dispatch(removeFromCartList(item?.cartId));
                                break;
                            case OpsType.INC:
                                dispatch(decreaseQuantity(item?.cartId));
                                break;
                            case OpsType.DEC:
                                dispatch(increaseQuantity(item?.cartId));
                                break;
                            default:
                                console.warn(
                                    'Database operations not held',
                                    ops
                                );
                                break;
                        }
                    }
                } catch (error) {
                    toast.error('Something went wrong, Please try again!', {
                        toastId: item?.cartId,
                    });
                    switch (ops.operations) {
                            case OpsType.ADD:
                                dispatch(removeFromCartList(item?.cartId));
                                break;
                            case OpsType.INC:
                                dispatch(decreaseQuantity(item?.cartId));
                                break;
                            case OpsType.DEC:
                                dispatch(increaseQuantity(item?.cartId));
                                break;
                            default:
                                console.warn(
                                    'Database operations not held',
                                    ops
                                );
                                break;
                        }
                    console.warn('Unable to send cart operations', error);
                }
            },
        }),
        removeFromDbCart: builder.mutation({
            query: ({ ops, item }) => ({
                url: `store/cart/remove`,
                method: 'DELETE',
                body: {
                    store_id: item?.store_id,
                    cart_id: item?.dbCartId,
                },
            }),
            async onQueryStarted({ ops, item }, { dispatch, queryFulfilled }) {
                const trashedItem = item || {};

                try {
                    const { data } = await queryFulfilled;
                    if (data?.status) {
                        return;
                    } else {
                        toast.warning(
                            'Unable to remove item, Please try again!',
                            { toastId: item?.cartId }
                        );
                        dispatch(
                            addToCartList({
                                ...trashedItem,
                            })
                        );
                    }
                } catch (error) {
                    toast.error('Something went wrong, Please try again!', {
                        toastId: item?.cartId,
                    });
                    dispatch(
                        addToCartList({
                            ...trashedItem,
                        })
                    );
                    console.warn('Unable to remove cart operations', error);
                }
            },
        }),
        clearFromDbCart: builder.mutation({
            query: ({ ops, item }) => ({
                url: `store/cart/clear`,
                method: 'DELETE',
                body: item,
            }),
        }),
        addContactToDbCart: builder.mutation({
            query: ({ ops, item }) => ({
                url: `store/cart/add-contact`,
                method: 'POST',
                body: item,
            }),
        }),
        getDbCart: builder.query({
            query: ({ store_id }) => ({
                url: `store/cart/items?store_id=${store_id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: dbCartList } = await queryFulfilled;
                    const cartItems = dbCartList?.data?.data || [];
                    handleClearCart(dispatch,true);
                    if (cartItems?.length > 0) {

                        cartItems.forEach((item: any) => {
                            const cartId = makeUniqueid(100);
                            const {
                                cart_id,
                                product,
                                qty,
                                price,
                                selected_variant,
                            } = item;

                            const productQuantity = selected_variant
                                ? selected_variant?.quantity
                                : product?.quantity;
                            const variantId = selected_variant
                                ? numberParser(selected_variant?.id)
                                : null;

                            dispatch(
                                addToCartList({
                                    cartId,
                                    price,
                                    qty,
                                    availability: numberParser(productQuantity),
                                    variant_id: variantId,
                                    ...product,
                                    dbCartId: numberParser(cart_id),
                                })
                            );
                        });
                    }
                } catch (error) {
                    console.warn('Unable to fetch db cartList', error);
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetDbCartQuery } = cartApi;

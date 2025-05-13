import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    cartList: [],
};

const findProductInCart = (state: any, action: PayloadAction<any>) => {
    const cartItem = state.cartList?.find(
        (item: any) =>
            item.id === action.payload.id &&
            (!item.variant_id || item.variant_id === action.payload.variant_id)
    );
    return cartItem;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartList: (state, action: PayloadAction<any>) => {
            const foundProduct = findProductInCart(state, action);

            if (foundProduct) {
                state.cartList = state.cartList?.map((item: any) => {
                    // Check if this is the product to update
                    if (
                        item.id === action.payload.id &&
                        (!item.variant_id ||
                            item.variant_id === action.payload.variant_id)
                    ) {
                        return {
                            ...item,
                            qty: action.payload.qty
                                ? item.qty + action.payload.qty
                                : item.qty + 1,
                        };
                    }

                    return item; // Return other items unchanged
                });
            } else {
                state.cartList = [
                    ...state.cartList, // Spread the current cartList array
                    {
                        // cartId: makeid(100),
                        ...action.payload,
                        qty: action.payload.qty ? action.payload.qty : 1,
                    },
                ];
            }
        },
        removeFromCartList: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList?.filter(
                (item: any) => item.cartId !== action.payload
            );
        },
        increaseQuantity: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList?.map((item: any) => {
                if (item.cartId === action.payload) {
                    return {
                        ...item,
                        qty: item.qty + 1,
                    };
                } else {
                    return item;
                }
            });
        },
        decreaseQuantity: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList?.map((item: any) => {
                if (item.cartId === action.payload) {
                    return {
                        ...item,
                        qty: item.qty - 1,
                    };
                } else {
                    return item;
                }
            });
        },
        clearCartList: (state) => {
            state.cartList = [];
        },
        mutateCartItem: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList?.map((item: any) => {
                if (item.cartId === action.payload.cartId) {
                    return {
                        ...item,
                        dbCartId: action.payload.dbCartId,
                    };
                } else {
                    return item;
                }
            });
        },
    },
});

export const {
    addToCartList,
    removeFromCartList,
    increaseQuantity,
    decreaseQuantity,
    clearCartList,
    mutateCartItem,
} = cartSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = cartSlice;

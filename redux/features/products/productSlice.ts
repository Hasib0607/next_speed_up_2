import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    related: null,
    campaign: null,
    product: null,
    bestSellProduct: null,
    featureProduct: null,
    cartList: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<any>) => {
            state.product = action.payload;
        },
        setRelatedProduct: (state, action: PayloadAction<any>) => {
            state.related = action.payload;
        },
        // need to remove later ----
        setCampaignProduct: (state, action: PayloadAction<any>) => {
            state.campaign = action.payload;
        },
        setBestSellProduct: (state, action: PayloadAction<any>) => {
            state.bestSellProduct = action.payload;
        },
        setFeatureProduct: (state, action: PayloadAction<any>) => {
            state.featureProduct = action.payload;
        },

        // ----
        // addToCartList: (state, action) => {
        //     // const cartItem = state.cartList?.find((item) => item.id === action.payload.id & item.color === action.payload.color && item.size === action.payload.size);
        //     const cartItem: any = state.cartList?.find(
        //         (item: any) =>
        //             item.id === action.payload.id &&
        //             item.size === action.payload.size &&
        //             item.color === action.payload.color &&
        //             item.unit === action.payload.unit &&
        //             item.volume === action.payload.volume
        //     );

        //     if (cartItem) {
        //         cartItem.qty = action.payload.qty
        //             ? cartItem.qty + action.payload.qty
        //             : cartItem.qty + 1;
        //     } else {
        //         state.cartList.push({
        //             ...action.payload,
        //             qty: action.payload.qty || 1,
        //         });
        //     }
        // },
    },
});

export const {
    setProduct,
    setRelatedProduct,
    setCampaignProduct,
    setBestSellProduct,
    setFeatureProduct
} = productSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = productSlice;

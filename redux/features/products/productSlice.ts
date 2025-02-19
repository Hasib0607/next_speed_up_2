import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    related: null,
    campaign: null,
    product: null,
    bestSellProduct: null,
    featureProduct: null,
    storeId:null
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<any>) => {
            state.product = action.payload;
        },
        setStoreId: (state, action: PayloadAction<any>) => {
            state.storeId = action.payload;
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
    },
});

export const {
    setProduct,
    setRelatedProduct,
    setCampaignProduct,
    setBestSellProduct,
    setFeatureProduct,
    setStoreId
} = productSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = productSlice;

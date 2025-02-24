import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    totalOfferPrice: null,
};

export const offerFilterSlice = createSlice({
    name: 'offerFilters',
    initialState,
    reducers: {
        setTotalProductDis: (state, action: PayloadAction<any>) => {
            state.totalOfferPrice = action.payload;
        },
    },
});

export const { setTotalProductDis } = offerFilterSlice.actions;

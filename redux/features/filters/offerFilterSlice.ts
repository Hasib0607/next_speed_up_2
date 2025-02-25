import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    totalcampainOfferAmount: 0,
};

export const campainOfferFilterSlice = createSlice({
    name: 'campainOfferFilters',
    initialState,
    reducers: {
        setTotalCampainOfferDis: (state, action: PayloadAction<any>) => {
            state.totalcampainOfferAmount = action.payload;
        },
    },
});

export const { setTotalCampainOfferDis } = campainOfferFilterSlice.actions;

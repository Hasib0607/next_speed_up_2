import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    couponResult: null,
};

export const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        setCouponResult: (state, action: PayloadAction<any>) => {
            state.couponResult = action.payload;
        },
    },
});

export const { setCouponResult } = couponSlice.actions;

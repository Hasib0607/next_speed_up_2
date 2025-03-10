import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    couponResult: null,
    couponDiscount: 0,
};

export const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        setCouponResult: (state, action: PayloadAction<any>) => {
            state.couponResult = action.payload;
        },
        setCouponDiscount: (state, action: PayloadAction<any>) => {
            state.couponDiscount = action.payload;
        },
    },
});

export const { setCouponResult, setCouponDiscount } = couponSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    checkoutFromData:null,
    // couponDetails:null
};

export const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutFromData: (state, action: PayloadAction<any>) => {
            state.checkoutFromData = action.payload;
        },
        // setCouponDetails: (state, action: PayloadAction<any>) => {
        //     state.couponDetails = action.payload;
        // },
    },
});

export const {setCheckoutFromData} = checkOutSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = checkOutSlice;

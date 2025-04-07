import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    checkoutFromData: null,
    checkoutBookingFromData: null,
    districtArr: null,
    countryArr: null,
};

export const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutFromData: (state, action: PayloadAction<any>) => {
            state.checkoutFromData = action.payload;
        },
        setCheckoutBookingFromData: (state, action: PayloadAction<any>) => {
            state.checkoutBookingFromData = action.payload;
        },
        setDistrictArr: (state, action: PayloadAction<any>) => {
            state.districtArr = action.payload;
        },
        setCountryArr: (state, action: PayloadAction<any>) => {
            state.countryArr = action.payload;
        },
    },
});

export const {
    setCheckoutFromData,
    setCheckoutBookingFromData,
    setDistrictArr,
    setCountryArr,
} = checkOutSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = checkOutSlice;

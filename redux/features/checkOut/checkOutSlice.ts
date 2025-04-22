import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    checkoutFromData: null,
    checkoutBookingFromData: null,
    districtArr: [],
    countryArr: [],
    formFieldsArr: [],
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
            if (
                JSON.stringify(state.districtArr) !==
                JSON.stringify(action.payload)
            ) {
                state.districtArr = action.payload;
            }
        },
        setCountryArr: (state, action: PayloadAction<any>) => {
            if (
                JSON.stringify(state.countryArr) !==
                JSON.stringify(action.payload)
            ) {
                state.countryArr = action.payload;
            }
        },
        setFormFieldsArr: (state, action: PayloadAction<any>) => {
            state.formFieldsArr = action.payload;
        },
    },
});

export const {
    setCheckoutFromData,
    setCheckoutBookingFromData,
    setDistrictArr,
    setCountryArr,
    setFormFieldsArr
} = checkOutSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = checkOutSlice;

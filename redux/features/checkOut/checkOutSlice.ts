import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    checkoutFromData:null,
    checkoutBookingFromData:null,
    districtArr:null
    // couponDetails:null
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
        // setCouponDetails: (state, action: PayloadAction<any>) => {
        //     state.couponDetails = action.payload;
        // },
    },
});

export const {setCheckoutFromData,setCheckoutBookingFromData,setDistrictArr} = checkOutSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = checkOutSlice;

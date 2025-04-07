import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    paymentMethod: null,
};

export const paymentFilterSlice = createSlice({
    name: 'paymentFilter',
    initialState,
    reducers: {
        setSelectPayment: (state, action: PayloadAction<any>) => {
            state.paymentMethod = action.payload;
        },
    },
});

export const { setSelectPayment } = paymentFilterSlice.actions;

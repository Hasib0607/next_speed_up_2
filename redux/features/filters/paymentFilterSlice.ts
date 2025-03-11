import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    paymentMethod: 'cod',
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

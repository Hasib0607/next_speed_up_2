import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    purchaseList: null,
    grandTotal: null,
    customer: null,
};

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        setPurchaseList: (state, action: PayloadAction<any>) => {
            state.purchaseList = action.payload;
        },
        setGrandTotal: (state, action: PayloadAction<any>) => {
            state.grandTotal = action.payload;
        },
        setCustomer: (state, action: PayloadAction<any>) => {
            state.customer = action.payload;
        },
    },
});

export const { setPurchaseList, setGrandTotal, setCustomer } =
    purchaseSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = purchaseSlice;

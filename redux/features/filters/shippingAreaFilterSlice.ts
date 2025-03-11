import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    selectedShippingArea: null,
};

export const shippingAreaFilterSlice = createSlice({
    name: 'shippingAreaFilter',
    initialState,
    reducers: {
        setSelectedShippingArea: (state, action: PayloadAction<any>) => {
            state.selectedShippingArea = action.payload;
        },
    },
});

export const { setSelectedShippingArea } = shippingAreaFilterSlice.actions;
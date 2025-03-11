import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    selectedShippingArea: null,
    shippingAreaCost: null,
};

export const shippingAreaFilterSlice = createSlice({
    name: 'shippingAreaFilter',
    initialState,
    reducers: {
        setSelectedShippingArea: (state, action: PayloadAction<any>) => {
            state.selectedShippingArea = action.payload;
        },
        setShippingAreaCost: (state, action: PayloadAction<any>) => {
            state.shippingAreaCost = action.payload;
        },
    },
});

export const { setSelectedShippingArea, setShippingAreaCost } =
    shippingAreaFilterSlice.actions;

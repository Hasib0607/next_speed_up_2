import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    shop: null,
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShop: (state, action: PayloadAction<any>) => {
            state.shop = action.payload;
        },
    },
});

export const {
    setShop
} = shopSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = shopSlice;

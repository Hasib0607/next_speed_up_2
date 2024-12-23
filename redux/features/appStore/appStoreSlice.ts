import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    store: null,
};

export const storeSlice = createSlice({
    name: 'appStore',
    initialState,
    reducers: {
        setStore: (state, action: PayloadAction<any>) => {
            state.store = action.payload;
        },
    },
});

export const { setStore } = storeSlice.actions;

// Export the reducer
export const { reducerPath, reducer } = storeSlice;

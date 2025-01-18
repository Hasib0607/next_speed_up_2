import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    categories: null,
    subcategories: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<any>) => {
            state.categories = action.payload;
        },
        setSubCategory: (state, action: PayloadAction<any>) => {
            state.subcategories = action.payload;
        },
    },
});

export const { setCategory, setSubCategory } = categorySlice.actions;
// Export the reducer
export const { reducerPath, reducer } = categorySlice;

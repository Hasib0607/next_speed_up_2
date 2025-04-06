import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    activeBrands: [],
    color: '',
    price: null,
    sort: null,
    statusBtn: 'All',
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveBrands: (state, action: PayloadAction<any>) => {
            state.activeBrands = action.payload;
        },
        setColor: (state, action: PayloadAction<any>) => {
            state.color = action.payload;
        },
        setPrice: (state, action: PayloadAction<any>) => {
            state.price = action.payload;
        },
        setSort: (state, action: PayloadAction<any>) => {
            state.sort = action.payload;
        },
        setStatusBtn: (state, action: PayloadAction<any>) => {
            state.statusBtn = action.payload;
        },
        resetFilters: (state) => {
            state.color = '';
            state.price = null;
            state.sort = null;
            state.statusBtn = 'All';
        },
    },
});

export const {
    setActiveBrands,
    setColor,
    setPrice,
    setSort,
    setStatusBtn,
    resetFilters,
} = filterSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = filterSlice;

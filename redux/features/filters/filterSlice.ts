import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    color: "",
    price: null,
    sort: null,
    statusBtn:'All'
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
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
    },
});

export const {setColor,setPrice,setSort,setStatusBtn} = filterSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = filterSlice;

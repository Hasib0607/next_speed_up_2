import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    page: null,
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<any>) => {
            state.page = action.payload;
        },
    },
});

export const { setPage } = pageSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = pageSlice;

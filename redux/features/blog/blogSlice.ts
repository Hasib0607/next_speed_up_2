import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    blog: null,
};

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlog: (state, action: PayloadAction<any>) => {
            state.blog = action.payload;
        },
    },
});

export const { setBlog } = blogSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = blogSlice;

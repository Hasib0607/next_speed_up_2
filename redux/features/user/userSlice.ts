import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const {} = userSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = userSlice;

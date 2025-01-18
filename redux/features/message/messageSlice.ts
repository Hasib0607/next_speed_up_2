import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    message: null,
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<any>) => {
            state.message = action.payload;
        },
        clearMessage:(state) => {
            state.message = '';
        },
    },
});

export const { setMessage,clearMessage } = messageSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = messageSlice;

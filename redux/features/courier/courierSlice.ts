import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    courierNames: [],
};

export const courierSlice = createSlice({
    name: 'courier',
    initialState,
    reducers: {
        setcourierNames: (state, action: PayloadAction<any>) => {
            state.courierNames = action.payload;
        },
    },
});

export const { setcourierNames } = courierSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = courierSlice;

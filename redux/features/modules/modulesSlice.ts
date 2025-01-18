import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    modules: null,
};

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<any>) => {
            state.modules = action.payload;
        },
    },
});

export const { setModules } = modulesSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = modulesSlice;

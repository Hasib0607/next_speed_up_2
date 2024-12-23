import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    profile: null,
    
};

export const affiliateUserSlice = createSlice({
    name: 'affiliateUser',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
    },
});

export const {
    setProfile
} = affiliateUserSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = affiliateUserSlice;
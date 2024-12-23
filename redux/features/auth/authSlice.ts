'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    user: undefined,
    accessToken: undefined,
    referralCode: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<any>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.referralCode = action.payload.referral;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
        updateUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
});

export const { userLoggedIn, userLoggedOut, updateUser } = authSlice.actions;
export const { reducerPath, reducer } = authSlice;

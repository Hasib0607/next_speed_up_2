'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    user: undefined,
    accessToken: undefined,
    sessionToken: undefined,
    referralCode: null,
    hasSynced: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserSessionToken: (state, action: PayloadAction<any>) => {
            state.sessionToken = action.payload;
        },
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
        setHasSynced: (state, action: PayloadAction<any>) => {
            state.hasSynced = action.payload;
        },
    },
});

export const {
    setUserSessionToken,
    userLoggedIn,
    userLoggedOut,
    updateUser,
    setHasSynced,
} = authSlice.actions;
export const { reducerPath, reducer } = authSlice;

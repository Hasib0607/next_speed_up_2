'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    analyticsData: null,
};

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setAnalyticsData(state, action: PayloadAction<any>) {
            state.analyticsData = action.payload;
        },
    },
});

export const { setAnalyticsData } = analyticsSlice.actions;

export const { reducerPath, reducer } = analyticsSlice;

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

export const analyticsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});


export const { reducerPath, reducer } = analyticsSlice;

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

export const offerSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});


export const { reducerPath, reducer } = offerSlice;

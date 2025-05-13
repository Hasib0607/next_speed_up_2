'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearLocalStorage } from '@/helpers/localStorage';
import { userLoggedOut } from '../auth/authSlice';
import { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
        const state = getState() as RootState;

        const token = state?.auth?.accessToken || undefined;
        const sessionToken = state?.auth?.sessionToken || undefined

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        if (sessionToken) {
            headers.set('X-App-Session-ID', `${sessionToken}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args: any, api: any, extraOptions: any) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            clearLocalStorage();
        }

        return result;
    },
    tagTypes: ['HomeCategoryProduct', 'initializeApp', "AllOrders"] as string[],
    // tagTypes: [...cacher.defaultTags],
    keepUnusedDataFor: 900, // Default cache duration for all queries
    endpoints: () => ({}),
});

export const { reducerPath, reducer, middleware } = apiSlice;

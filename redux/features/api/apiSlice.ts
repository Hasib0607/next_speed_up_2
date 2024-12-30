'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setStore } from '../home/homeSlice';
import { clearLocalStorage } from '@/helpers/localStorage';
import { userLoggedOut } from '../auth/authSlice';
// import { RootState } from '@/redux/store';

type RootState = any;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const state = getState() as RootState;

        const token = state?.auth?.accessToken || undefined;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
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
    endpoints: (builder) => ({
        // refreshToken: builder.query({
        //     query: () => ({
        //         url: "/refresh",
        //         method: "GET",
        //     }),
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         // try {
        //         //     const result = await queryFulfilled;
        //         //     dispatch(
        //         //         userLoggedIn({
        //         //             accessToken: result.data.accessToken,
        //         //             user: result.data.user,
        //         //         })
        //         //     );
        //         // } catch (err) {
        //         //     dispatch(userLoggedOut());
        //         // }
        //     },
        // }),
    }),
});

export const { reducerPath, reducer, middleware } = apiSlice;

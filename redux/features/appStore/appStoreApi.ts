'use client';

import { name } from '@/consts';

import { apiSlice } from '../api/apiSlice';
import { setStore } from './appStoreSlice';

// Inject the getHome mutation endpoint into apiSlice
export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStore: builder.query<any, any>({
            query: () => ({
                url: `store`,
                method: 'POST',
                body: { name: name },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;

                    if (res?.data?.status) {
                        dispatch(setStore(res?.data?.data)); // Dispatch the action with the received data
                    } else {
                        // not found
                        dispatch(setStore(undefined));
                    }
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

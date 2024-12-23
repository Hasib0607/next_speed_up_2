'use client';
import { name } from '@/consts';
import { apiSlice } from '../api/apiSlice';
import { setStore } from './appStoreSlice';

// Inject the getHome mutation endpoint into apiSlice
export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStore: builder.query<any, any>({
            query: () => ({
                url: `store/${name}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setStore(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {} = storeApi;

'use client';

import { apiSlice } from '../api/apiSlice';
import { setModules } from './modulesSlice';

// Inject the getHome mutation endpoint into apiSlice
export const modulesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `modules/${store_id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setModules(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setModules(null));
                }
            },
        }),
        getModuleStatus: builder.query<any, any>({
            query: ({ store_id, module_id }) => ({
                url: `get-module/${store_id}/${module_id}`,
                method: 'GET',
            })
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useGetModulesQuery,
    useGetModuleStatusQuery
} = modulesApi;

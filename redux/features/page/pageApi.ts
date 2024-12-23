import { name } from '@/consts';
import { apiSlice } from '../api/apiSlice';
import { setPage } from './pageSlice';

// Inject the getHome mutation endpoint into apiSlice
export const pageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPage: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/page`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setPage(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setPage(null));
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetPageQuery } = pageApi;

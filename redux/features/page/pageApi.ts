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
                const res = await queryFulfilled;
                const resData = res?.data || null
                try {
                    if (resData?.status) {
                        dispatch(setPage(resData?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setPage(null));
                }
            },
        }),
        getPageData: builder.query<any, any>({
            query: ({ store_id, slug }) => ({
                url: `page/${store_id}/${slug}`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetPageQuery,useGetPageDataQuery } = pageApi;

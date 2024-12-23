import { name } from '@/consts';
import { apiSlice } from '../api/apiSlice';
import { setCategory, setSubCategory } from './categorySlice';

// Inject the getHome mutation endpoint into apiSlice
export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/category`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setCategory(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setCategory(null));
                }
            },
        }),
        getSubCategory: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/subcategory`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setSubCategory(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setSubCategory(null));
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetCategoryQuery, useGetSubCategoryQuery } = categoryApi;

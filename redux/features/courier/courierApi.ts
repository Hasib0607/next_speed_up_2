import { apiSlice } from '../api/apiSlice';

// Inject the getHome mutation endpoint into apiSlice
export const courierApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourierName: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `get/courier-list/${store_id}`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetCourierNameQuery } = courierApi;

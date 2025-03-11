import { apiSlice } from '../api/apiSlice';

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postEbitansAnalytics: builder.mutation<any, any>({
            query: (analyticsData) => ({
                url: `store/visitor-data`,
                method: 'POST',
                body: analyticsData,
            }),
        }),
    }),
});

export const { usePostEbitansAnalyticsMutation } = analyticsApi;

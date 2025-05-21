import { apiSlice } from '../api/apiSlice';

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postAnalytics: builder.mutation<any, any>({
            query: ({ payload }) => ({
                url: `store/visitor-data`,
                method: 'POST',
                body: payload,
            }),
            // async onQueryStarted(queryArgument, mutationLifeCycleApi) {
            //     console.log('queryArgument', queryArgument);
            // },
        }),
        patchAnalytics: builder.mutation<any, any>({
            query: ({ payload }) => ({
                url: `update/visitor-data`,
                method: 'PATCH',
                body: payload,
            }),
        }),
    }),
});

export const { usePostAnalyticsMutation, usePatchAnalyticsMutation } =
    analyticsApi;

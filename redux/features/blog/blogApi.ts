import { name, BLOG_PAGE_NUMBER } from '@/consts';
import { apiSlice } from '../api/apiSlice';
import { setBlog } from './blogSlice';

// Inject the getHome mutation endpoint into apiSlice
export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlog: builder.query<any, any>({
            query: () => ({
                url: `blog/get?page=${BLOG_PAGE_NUMBER}&name=${name}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setBlog(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setBlog(null));
                }
            },
        }),
        subscribeNewsletter: builder.mutation<any, any>({
            query: (body) => ({
                url: `news-latter/store`,
                method: 'POST',
                body: body,
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const { useGetBlogQuery,useSubscribeNewsletterMutation } = blogApi;

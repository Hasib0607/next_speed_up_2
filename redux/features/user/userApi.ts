'use client';

import { apiSlice } from '../api/apiSlice';
import { updateUser } from '../auth/authSlice';

// Inject the getHome mutation endpoint into apiSlice
export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUserProfile: builder.mutation<any, any>({
            query: (data) => ({
                url: `user/updateprofile`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if (response) {
                        dispatch(updateUser(response?.data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    //   do nothing
                }
            },
        }),
        updateUserPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `password-change`,
                method: 'POST',
                body: data,
            }),
        }),
        forgotUserPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `forget-pass`,
                method: 'POST',
                body: data,
            }),
        }),
        forgotVerifyUserPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `forget-verify`,
                method: 'POST',
                body: data,
            }),
        }),
        resetUserPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `change-password`,
                method: 'POST',
                body: data,
            }),
        }),
        userOrders: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `getorder/${store_id}`,
                method: 'GET',
            }),
            providesTags: () => [{ type: 'AllOrders' }],
        }),
        userReview: builder.mutation<any, any>({
            query: (data) => ({
                url: `review`,
                method: 'POST',
                body: data,
            }),
        }),
        orderDetails: builder.query<any, any>({
            query: ({ order_id }) => ({
                url: `getorder/details/${order_id}`,
                method: 'GET',
            }),
        }),
        orderStatus: builder.query<any, any>({
            query: () => ({
                url: `get/order-status`,
                method: 'GET',
            }),
        }),
        orderCancel: builder.mutation<any, any>({
            query: (data) => ({
                url: `order/cancel`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useUpdateUserProfileMutation,
    useUpdateUserPasswordMutation,
    useForgotUserPasswordMutation,
    useForgotVerifyUserPasswordMutation,
    useResetUserPasswordMutation,
    useUserOrdersQuery,
    useOrderDetailsQuery,
    useOrderStatusQuery,
    useOrderCancelMutation,
    useUserReviewMutation,
} = userApi;

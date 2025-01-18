'use client';

import { apiSlice } from '../api/apiSlice';
import { updateUser } from '../auth/authSlice';

// Inject the getHome mutation endpoint into apiSlice
export const affiliateUserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        affiliateCustomerOrders: builder.query<any, any>({
            query: ({ page }) => ({
                url: `customer-affiliate/order-list?page=${page}`,
                method: 'GET',
            }),
        }),
        affiliateUserCreateWithdraw: builder.mutation<any, any>({
            query: (data) => ({
                url: `customer-affiliate/create/withdraw-requests`,
                method: 'POST',
                body: data,
            }),
        }),
        affiliateUserWithdraw: builder.query<any, any>({
            query: ({ page }) => ({
                url: `customer-affiliate/withdraw-requests?page=${page}`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useAffiliateUserWithdrawQuery,
    useAffiliateCustomerOrdersQuery,
    useAffiliateUserCreateWithdrawMutation,
} = affiliateUserApi;

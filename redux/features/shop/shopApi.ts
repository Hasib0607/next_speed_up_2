'use client';

import { name } from '@/consts';
import { getQueryString } from '@/helpers/getQueryString';
import { apiSlice } from '../api/apiSlice';

// Inject the getHome mutation endpoint into apiSlice
export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `get/attribute/${store_id}/color`,
                method: 'GET',
            }),
        }),
        getShopPageProducts: builder.query<any, any>({
            query: ({ page, encodedColor, priceValue, sort }) => ({
                url: `shoppage/products?name=${name}&page=${page}&colorFilter=${encodedColor}&priceFilter=${priceValue}&filter=${sort}`,
                method: 'GET',
            }),
        }),
        getCategoryPageProducts: builder.query<any, any>({
            query: ({ catId, page, filtersData }) => {
                let queryString = '';
                if (filtersData) {
                    const {
                        color: activeColor,
                        price: priceValue,
                        sort,
                    } = filtersData || {};
                    queryString = getQueryString(activeColor, priceValue, sort);
                }
                return {
                    url: `getcatproducts/${catId}?page=${page}${queryString}`,
                    method: 'GET',
                };
            },
        }),
        // getHeaderSettings: builder.query<any, any>({
        //     query: () => ({
        //         url: `header-settings/${name}`,
        //         method: 'GET',
        //     }),
        //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled;
        //             if (data) {
        //                 dispatch(setHeader(data?.data)); // Dispatch the action with the received data
        //             }
        //         } catch (error) {
        //             dispatch(setHeader(null));
        //         }
        //     },
        // }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useGetShopPageProductsQuery,
    useGetColorsQuery,
    useGetCategoryPageProductsQuery,
} = shopApi;

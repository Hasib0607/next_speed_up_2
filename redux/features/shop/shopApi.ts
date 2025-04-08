'use client';

import { name } from '@/consts';
import { getQueryString } from '@/helpers/queryStrings';
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
            query: ({ page, filtersData }) => {
                let queryString = getQueryString(filtersData);

                return {
                    url: `shoppage/products?name=${name}&page=${page}${queryString}`,
                    method: 'GET',
                };
            },
        }),

        getCategoryPageProducts: builder.query<any, any>({
            query: ({ catId, page, filtersData }) => {
                let queryString = getQueryString(filtersData);

                return {
                    url: `getcatproducts/${catId}?page=${page}${queryString}`,
                    method: 'GET',
                };
            },
        }),

        getBrandPageProducts: builder.query<any, any>({
            query: ({ brandId, page, filtersData }) => {
                let queryString = getQueryString(filtersData);

                return {
                    url: `get/brand-products/${brandId}?page=${page}${queryString}`,
                    method: 'GET',
                };
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useGetShopPageProductsQuery,
    useGetCategoryPageProductsQuery,
    useGetBrandPageProductsQuery,
    useGetColorsQuery,
} = shopApi;

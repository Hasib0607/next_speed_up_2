import { name } from '@/consts';
import { apiSlice } from '../api/apiSlice';
import {
    setBestSellProduct,
    setFeatureProduct,
    setProduct,
    setStoreId,
} from './productSlice';

// Inject the getHome mutation endpoint into apiSlice
export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/product`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data  } = await queryFulfilled;
                    if (data) {
                        dispatch(setProduct(data?.data)); // Dispatch the action with the received data
                        dispatch(setStoreId(data?.store_id)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setProduct(null));
                }
            },
        }),
        getBestSellProduct: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/best_sell_product`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setBestSellProduct(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setBestSellProduct(null));
                }
            },
        }),
        getFeatureProduct: builder.query<any, any>({
            query: () => ({
                url: `get-domain/${name}/feature_product`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setFeatureProduct(data?.data)); // Dispatch the action with the received data
                    }
                } catch (error) {
                    dispatch(setFeatureProduct(null));
                }
            },
        }),
        getSingleProduct: builder.query<any, any>({
            query: ({ store_id, productId }) => ({
                url: `get/offer/product/${store_id}/${productId}`,
                method: 'GET',
            }),
        }),
        getProductDetails: builder.query<any, any>({
            query: ({ store_id, productId }) => ({
                url: `product-details/${store_id}/${productId}`,
                method: 'GET',
            }),
        }),
        getRelatedProducts: builder.query<any, any>({
            query: ({ productId }) => ({
                url: `related-product/${productId}`,
                method: 'GET',
            }),
        }),
        getReviews: builder.query<any, any>({
            query: ({ productId }) => ({
                url: `get/review/${productId}`,
                method: 'GET',
            }),
        }),
        getCategoryProduct: builder.query<any, any>({
            query: ({ id }) => ({
                url: `getcatproducts/${id}`,
                method: 'GET',
            }),
            // configuration for an individual endpoint, overriding the api setting
            providesTags:  (id) => [{ type: 'HomeCategoryProduct', id }],
            // providesTags: ['HomeCategoryProduct'],
            keepUnusedDataFor: 600,
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useGetProductQuery,
    useGetSingleProductQuery,
    useGetCategoryProductQuery,
    useGetBestSellProductQuery,
    useGetFeatureProductQuery,
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery
} = productApi;

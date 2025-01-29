import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from '../auth/authSlice';

// Inject the getHome mutation endpoint into apiSlice
export const checkOutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkCouponAvailability: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `check/coupon-is-available/${store_id}`,
                method: 'GET',
            }),
        }),
        checkCouponValidation: builder.query<any, any>({
            query: ({ store_id, coupon_code }) => ({
                url: `verifycoupon/${store_id}/${coupon_code}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getCampaign: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `campaign/${store_id}`,
                method: 'GET',
            }),
        }),
        getAddress: builder.query<any, any>({
            query: () => ({
                url: `address`,
                method: 'GET',
            }),
        }),
        getDistrict: builder.query<any, any>({
            query: () => ({
                url: `get/district`,
                method: 'GET',
            }),
        }),
        getFormFields: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `checkout-page/form-field/${store_id}`,
                method: 'GET',
            }),
        }),
        easyOrderAddressSave: builder.mutation<any, any>({
            query: (data) => ({
                url: `address/easy-order/save`,
                method: 'POST',
                body: data,
            }),
        }),
        userAddressSave: builder.mutation<any, any>({
            query: (data) => ({
                url: `address/save`,
                method: 'POST',
                body: data,
            }),
        }),
        userAddressUpdate: builder.mutation<any, any>({
            query: (data) => ({
                url: `address/edit`,
                method: 'POST',
                body: data,
            }),
        }),
        userAddressDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `address/delete`,
                method: 'POST',
                body: data,
            }),
        }),
        userPlaceOrder: builder.mutation<any, any>({
            query: (data) => ({
                url: `placeorder`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const userData = response?.data?.data?.userData || {};
                    if (userData && userData?.token) {
                        dispatch(
                            userLoggedIn({
                                accessToken: userData?.token,
                                user: userData?.user,
                                referral: userData?.referral,
                            }) // Dispatch the action with the received data
                        );
                    }
                    // Invalidate a specific tag to trigger a refetch
                    dispatch(
                        apiSlice.util.invalidateTags([
                            { type: 'AllOrders' },
                        ])
                    );
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
    }),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {
    useGetCampaignQuery,
    useGetAddressQuery,
    useGetDistrictQuery,
    useGetFormFieldsQuery,
    useUserAddressUpdateMutation,
    useEasyOrderAddressSaveMutation,
    useUserAddressSaveMutation,
    useUserAddressDeleteMutation,
    useUserPlaceOrderMutation,
    useCheckCouponAvailabilityQuery,
    useCheckCouponValidationQuery,
} = checkOutApi;

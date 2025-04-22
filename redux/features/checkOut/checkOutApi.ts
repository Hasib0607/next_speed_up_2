import { toast } from 'react-toastify';
import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from '../auth/authSlice';
import { setCouponResult } from '../filters/couponSlice';
import {
    setCountryArr,
    setDistrictArr,
    setFormFieldsArr,
} from './checkOutSlice';

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
            query: ({
                store_id,
                coupon_code,
                total,
                selectedShippingArea,
                selectedPayment,
            }) => ({
                url: `verifycoupon/${store_id}/${coupon_code}?amount=${total}&shipping=${selectedShippingArea}&payment=${selectedPayment}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const { status, data } = response?.data || {};
                    const couponData = { ...data, code_status: status };
                    if (status) {
                        dispatch(setCouponResult(couponData));
                    }
                } catch (error: any) {
                    const { status } = error?.error || {};
                    const { message } = error?.error?.data || {};
                    if (status == 404) {
                        dispatch(
                            setCouponResult({ code: null, code_status: false })
                        );
                        toast.error(message, { toastId: message });
                    }
                }
            },
            keepUnusedDataFor: 0,
        }),
        couponAutoApply: builder.query<any, any>({
            query: ({
                store_id,
                total,
                selectedShippingArea,
                selectedPayment,
            }) => ({
                url: `verifycoupon-auto-apply/${store_id}/${total}?shipping=${selectedShippingArea}&payment=${selectedPayment}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const { status, data } = response?.data || {};
                    const couponData = { ...data, code_status: status };
                    if (status) {
                        dispatch(setCouponResult(couponData));
                    }
                } catch (error: any) {
                    dispatch(
                        setCouponResult({ code: null, code_status: false })
                    );
                }
            },
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const districtArr = response?.data?.data || [];
                    if (response?.data?.status && districtArr) {
                        dispatch(setDistrictArr(districtArr));
                    }
                } catch (error) {
                    // console.error("Error in getDistrict mutation:", error);
                }
            },
        }),
        getCountry: builder.query<any, any>({
            query: () => ({
                url: `get/country`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const countryInfoArr = response?.data?.data || [];
                    if (response?.data?.status && countryInfoArr) {
                        dispatch(setCountryArr(countryInfoArr));
                    }
                } catch (error) {
                    // console.error("Error in getCountry mutation:", error);
                }
            },
        }),
        getBookingFormFields: builder.query<any, any>({
            query: ({ store_id, module_id }) => ({
                url: `booking-from/${store_id}/${module_id}`,
                method: 'GET',
            }),
        }),
        getFormFields: builder.query<any, any>({
            query: ({ store_id }) => ({
                url: `checkout-page/form-field/${store_id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    const formFieldsArr = response?.data?.data || [];
                    if (response?.data?.status && formFieldsArr) {
                        dispatch(setFormFieldsArr(formFieldsArr));
                    }
                } catch (error) {
                    // console.error("Error in getFormFields mutation:", error);
                }
            },
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
                        apiSlice.util.invalidateTags([{ type: 'AllOrders' }])
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
    useGetCountryQuery,
    useGetFormFieldsQuery,
    useGetBookingFormFieldsQuery,
    useUserAddressUpdateMutation,
    useEasyOrderAddressSaveMutation,
    useUserAddressSaveMutation,
    useUserAddressDeleteMutation,
    useUserPlaceOrderMutation,
    useCheckCouponAvailabilityQuery,
    useCheckCouponValidationQuery,
} = checkOutApi;

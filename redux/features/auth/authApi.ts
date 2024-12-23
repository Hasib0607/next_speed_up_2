import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';
import { toast } from 'react-toastify';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerByEmail: builder.mutation<any, any>({
            query: (data) => ({
                url: `user-registration-email`,
                method: 'POST',
                body: data,
            }),
        }),
        registerByPhone: builder.mutation<any, any>({
            query: (data) => ({
                url: `userinfo`,
                method: 'POST',
                body: data,
            }),
        }),
        logIn: builder.mutation<any, any>({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.token) {
                        dispatch(
                            userLoggedIn({
                                accessToken: data?.token,
                                user: data?.user,
                                referral: data?.referral,
                            }) // Dispatch the action with the received data
                        );
                    }
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
        logOut: builder.mutation<any, any>({
            query: () => ({
                url: `logout`,
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(
                            userLoggedOut()
                        );
                        toast.success(data?.success || "Logout Successful")
                    }
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
        verifyOtp: builder.mutation<any, any>({
            query: (body) => ({
                url: `users/checkotp`,
                method: 'POST',
                body: body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.token) {
                        dispatch(
                            userLoggedIn({
                                accessToken: data?.token,
                                user: data?.user,
                                referral: data?.referral,
                            }) // Dispatch the action with the received data
                        );
                    }
                } catch (error) {
                    // console.error("Error in getHome mutation:", error);
                }
            },
        }),
        resendOtp: builder.mutation<any, any>({
            query: (body) => ({
                url: `user/resendotp`,
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {
    useLogInMutation,
    useLogOutMutation,
    useRegisterByEmailMutation,
    useRegisterByPhoneMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
} = authApi;

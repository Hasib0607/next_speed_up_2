import { checkOutApi } from '@/redux/features/checkOut/checkOutApi';
import { AppDispatch } from '@/redux/store';
import { OrderRequireTypes } from '@/types';
import { handleClearCart } from '@/utils/_cart-utils/cart-utils';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const placeOrder = (
    formData: any,
    dispatch: AppDispatch,
    setIsLoading: Function,
    emptySms?: boolean
) => {
    const isEmptySms = emptySms ?? false;
    setIsLoading(true);
    dispatch(checkOutApi.endpoints.userPlaceOrder.initiate(formData))
        .unwrap()
        .then(({ data, status }: any) => {
            const { order, url } = data || {};

            if (status) {
                handleClearCart(dispatch)
                if (url) {
                    window.location.replace(url);
                } else {
                    {
                        isEmptySms &&
                            toast.success(
                                `Your order placed without sms confirmation!`
                            );
                    }
                    toast.success(
                        `Your #${order?.reference_no} order complete successfully!`
                    );
                    setIsLoading(false);
                    window.location.replace('/thank-you');
                }
            } else {
                toast.error('Can not place order, please try again!');
                setIsLoading(false);
            }
        })
        .catch((error: any) => {
            if ('data' in error) {
                const errorData = error as any;
                if (errorData?.status == 404) {
                    toast.error(errorData?.data?.message);
                } else {
                    toast.error('Something went wrong! Please try again.');
                }
            }
            setIsLoading(false);
        });
};

export const placeOrderWithSwal = (
    formData: any,
    dispatch: AppDispatch,
    setIsLoading: Function
) => {
    Swal.fire({
        title: 'Do you want to continue?',
        text: 'Your vendor does not have any SMS left!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continue',
        reverseButtons: true,
    }).then((result: any) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You cannot get SMS for order confirmation and also cannot receive login credentials!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Proceed',
                reverseButtons: true,
            }).then((result: any) => {
                if (result.isConfirmed) {
                    placeOrder(formData, dispatch, setIsLoading, true);
                }
            });
        }
    });
};

export const handlePlaceOrder = async (
    isAbleToOrder: boolean,
    smsCount: number,
    formData: any,
    dispatch: AppDispatch,
    setIsLoading: Function,
    orderRequire: OrderRequireTypes,
    data: any
) => {
    if (isAbleToOrder) {
        if (orderRequire?.isPhoneRequired && data?.phone) {
            if (smsCount > 0) {
                placeOrder(formData, dispatch, setIsLoading);
            } else {
                placeOrderWithSwal(formData, dispatch, setIsLoading);
            }
        } else if (orderRequire?.isEmailRequired && data?.email) {
            if (smsCount > 0) {
                placeOrder(formData, dispatch, setIsLoading);
            } else {
                placeOrderWithSwal(formData, dispatch, setIsLoading);
            }
        } else {
            // if (!userAddress && !data.address) {
            //     toast.warning('Please Select The Address', {
            //         toastId: userAddress,
            //     });
            // }
            // if (!userPhone && !user) {
            //     toast.warning('Please write your phone number', {
            //         toastId: userPhone,
            //     });
            // }
            // if (!userName && !user) {
            //     toast.warning('Please write your name', { toastId: userName });
            // }
            // if (!data.payment_type) {
            //     toast.warning('Please Select Payment Method', {
            //         toastId: data.payment_type,
            //     });
            // }
            // if (data.shipping === null) {
            //     toast.warning('Please Select Shipping Area', {
            //         toastId: data.shipping,
            //     });
            // }
            if (orderRequire?.isPhoneRequired && !data?.phone) {
                toast.error(
                    'Phone number is mandatory!'
                );
            }
            if (orderRequire?.isEmailRequired && !data?.email) {
                toast.error(
                    'Email is mandatory!'
                );
            }
        }
    }
};

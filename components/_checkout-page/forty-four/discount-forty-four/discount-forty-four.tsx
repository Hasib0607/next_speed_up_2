'use client';

import {
    checkOutApi,
    useCheckCouponAvailabilityQuery,
} from '@/redux/features/checkOut/checkOutApi';
import { AppDispatch, RootState } from '@/redux/store';
import { numberParser } from '@/helpers/numberParser';
import { btnhover } from '@/site-settings/style';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setDiscount } from '@/helpers/setDiscount';
import { classNames } from '@/helpers/littleSpicy';
import { setCouponDiscount } from '@/redux/features/filters/couponSlice';

const DiscountFortyFour = ({
    appStore,
    shippingArea,
    className,
}: any) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const dispatch: AppDispatch = useDispatch();
    const store_id = appStore?.id || null;

    const cartList = useSelector((state: RootState) => state.cart.cartList);
    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );
    const { selectedShippingArea } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );
    const sTotal = subTotal(cartList);
    const total = numberParser(sTotal);

    const [loading, setLoading] = useState(false);
    const [couponAvailable, setCouponAvailable] = useState(false);

    const {
        data: couponData,
        isLoading: couponLoading,
        isSuccess: couponSuccess,
        refetch: couponRefetch,
    } = useCheckCouponAvailabilityQuery({ store_id });

    const onSubmit = ({ coupon_code }: any) => {
        setLoading(true);
        if (coupon_code != '') {
            dispatch(
                checkOutApi.endpoints.checkCouponValidation.initiate(
                    {
                        store_id,
                        coupon_code,
                        total,
                        selectedShippingArea,
                        selectedPayment,
                    },
                    { forceRefetch: true }
                )
            )
                .unwrap()
                .then((res: any) => {
                    const couponValidation = res?.data || {};
                    if (res?.status) {
                        const result = setDiscount(
                            couponValidation,
                            total,
                            shippingArea
                        );
                        dispatch(setCouponDiscount(result));
                        toast.success(
                            'Successfully Applied Coupon',
                            couponValidation?.id
                        );
                        reset();
                        setLoading(false);
                    }
                })
                .catch((couponValidationError: any) => {
                    const { status } = couponValidationError || {};
                    if (status == 404) {
                        dispatch(setCouponDiscount(0));
                        setLoading(false);
                    }
                });
        }
    };

    // set auto coupon
    useEffect(() => {
        if (total > 0 && selectedShippingArea !== null) {
            dispatch(
                checkOutApi.endpoints.couponAutoApply.initiate(
                    {
                        store_id,
                        total,
                        selectedShippingArea,
                        selectedPayment,
                    },
                    { forceRefetch: true }
                )
            )
                .unwrap()
                .then((res: any) => {
                    const autoCouponValidation = res?.data || {};
                    if (res?.status) {
                        const result = setDiscount(
                            autoCouponValidation,
                            total,
                            shippingArea
                        );
                        console.log("result",result);
                        
                        dispatch(setCouponDiscount(result));
                    }
                })
                .catch((couponAutoValidationError: any) => {
                    const { status } = couponAutoValidationError || {};
                    if (status == 404) {
                        dispatch(setCouponDiscount(0));
                    }
                });
        }
    }, [
        dispatch,
        store_id,
        total,
        shippingArea,
        selectedShippingArea,
        selectedPayment,
    ]);

    // get coupon status
    useEffect(() => {
        const isCoupon = couponData?.status || false;
        if (couponSuccess) {
            setCouponAvailable(isCoupon);
        }
    }, [couponData, couponSuccess]);

    return (
        <div className={className ? className : 'flex flex-wrap justify-start'}>
            {couponAvailable && (
                <div className="">
                    <div className="flex flex-col gap-4 w-full">
                        <p className="block text-sm font-semibold text-gray-900 pb-2 sm:pb-0">
                            {'Got any Coupon Code?'}
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex gap-2"
                        >
                            <div className="flex justify-center w-80">
                                <input
                                    {...register('coupon_code', {
                                        required: true,
                                    })}
                                    type={'text'}
                                    className="border border-gray-400 py-2 px-2 rounded w-full"
                                />
                            </div>
                            <div
                                className={classNames(
                                    'center px-4 py-2 w-48 font-normal rounded text-[var(--text-color)] bg-[var(--header-color)] lg:cursor-pointer text-base',`${btnhover}`
                                )}
                            >
                                {loading ? (
                                    <RotatingLines
                                        width="20"
                                        strokeColor="#6495ED"
                                        strokeWidth="6"
                                    />
                                ) : (
                                    <input
                                        type={'submit'}
                                        value={'Add Coupon'}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                    {errors.code && (
                        <span className="text-red-500">Field is empty</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiscountFortyFour;

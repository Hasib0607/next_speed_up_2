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
import { setSelectedShippingArea } from '@/redux/features/filters/shippingAreaFilterSlice';

const DiscountSeven = ({
    design,
    appStore,
    headersetting,
    setCouponDis,
    shippingArea,
    setShippingArea,
    bookingStatus,
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
                        setCouponDis(result);
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
                        setCouponDis(0);
                        setLoading(false);
                    }
                });
        }
    };

    const getCostByAreaId = (id: string): number | null => {
        if (id === '1') return headersetting?.shipping_area_1_cost;
        if (id === '2') return headersetting?.shipping_area_2_cost;
        if (id === '3') return headersetting?.shipping_area_3_cost;
        return null;
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const areaId = e.target.value;
        const selectedCost = getCostByAreaId(areaId);
        if (areaId) {
            dispatch(setSelectedShippingArea(areaId));
            setShippingArea(selectedCost);
        }
    };

    useEffect(() => {
        if (headersetting?.selected_shipping_area) {
            dispatch(
                setSelectedShippingArea(headersetting?.selected_shipping_area)
            );
            const initialAreaCost =
                headersetting?.[
                    `shipping_area_${headersetting.selected_shipping_area}_cost`
                ];
            if (initialAreaCost) {
                setShippingArea(initialAreaCost);
            }
        }
    }, [headersetting, setShippingArea, dispatch]);

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
                        setCouponDis(result);
                    }
                })
                .catch((couponAutoValidationError: any) => {
                    const { status } = couponAutoValidationError || {};
                    if (status == 404) {
                        setCouponDis(0);
                    }
                });
        }
    }, [
        setCouponDis,
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
        <div
            className={
                className
                    ? className
                    : 'grid sm:flex flex-wrap justify-between items-center grid-cols-6 gap-6'
            }
        >
            {!bookingStatus && (
                <div className="col-span-6 sm:col-span-3">
                    <div className="flex justify-between gap-4 items-center pb-3">
                        <label
                            htmlFor="name"
                            className="block sm:text-xl text-base font-semibold text-gray-700"
                        >
                            Shipping Area
                        </label>
                        <div>
                            <select
                                id="shippingArea"
                                name="shippingArea"
                                onChange={(e: any) => handleShippingChange(e)}
                                value={selectedShippingArea || ''}
                                className="mt-1 block sm:w-full w-36 py-2 font-semibold border capitalize border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                <option value={'0'}>--Select Area--</option>
                                {headersetting?.shipping_area_1 && (
                                    <option value={'1'}>
                                        {headersetting?.shipping_area_1}
                                    </option>
                                )}
                                {headersetting?.shipping_area_2 && (
                                    <option value={'2'}>
                                        {headersetting?.shipping_area_2}
                                    </option>
                                )}
                                {headersetting?.shipping_area_3 && (
                                    <option value={'3'}>
                                        {headersetting?.shipping_area_3}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {store_id !== 3601 && store_id !== 3904 && couponAvailable && (
                <div className="">
                    <div className="flex sm:flex-row flex-col gap-4 justify-between items-start sm:items-center pb-3 ">
                        <label
                            htmlFor="name"
                            className="block sm:text-xl font-semibold text-gray-700 pb-2 sm:pb-0"
                        >
                            {'Discount'}
                        </label>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex items-start gap-y-2"
                        >
                            <div className="flex flex-col justify-center">
                                <input
                                    {...register('coupon_code', {
                                        required: true,
                                    })}
                                    type={'text'}
                                    className="border border-gray-400 py-2 px-2 rounded-sm w-full"
                                />
                            </div>
                            {loading ? (
                                <div
                                    style={{
                                        backgroundColor: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                    className={`px-4 py-2 ml-2 font-semibold rounded-sm lg:cursor-pointer text-lg ${btnhover}`}
                                >
                                    <RotatingLines
                                        width="20"
                                        strokeColor="#6495ED"
                                        strokeWidth="6"
                                    />
                                </div>
                            ) : (
                                <input
                                    type={'submit'}
                                    value={'Apply'}
                                    style={{
                                        backgroundColor: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                    className={`px-4 py-2 ml-2 font-semibold rounded-sm lg:cursor-pointer text-lg ${btnhover}`}
                                />
                            )}
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

export default DiscountSeven;

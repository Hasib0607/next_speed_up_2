'use client';

import {
    checkOutApi,
    useCheckCouponAvailabilityQuery,
} from '@/redux/features/checkOut/checkOutApi';
import { AppDispatch, RootState } from '@/redux/store';
import { numberParser } from '@/helpers/numberParser';
import { btnhover } from '@/site-settings/style';
import {
    getCampainOfferDeliveryFee,
    subTotal,
} from '@/utils/_cart-utils/cart-utils';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setDiscount } from '@/helpers/setDiscount';
import {
    setSelectedShippingArea,
    setShippingAreaCost,
} from '@/redux/features/filters/shippingAreaFilterSlice';
import BDT from '@/utils/bdt';
import { setCouponDiscount } from '@/redux/features/filters/couponSlice';
import {
    getShippingAreaIdByCost,
    getShippingCostByAreaId,
} from '@/helpers/littleSpicy';

const DiscountFortyThree = ({
    design,
    appStore,
    headersetting,
    shippingColOne,
    shippingOff,
    select,
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

    const { selectedShippingArea, shippingAreaCost } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    const sTotal = useMemo(() => subTotal(cartList), [cartList]);
    const total = useMemo(() => numberParser(sTotal), [sTotal]);

    const [loading, setLoading] = useState(false);
    const [couponAvailable, setCouponAvailable] = useState(false);

    const {
        data: couponData,
        isLoading: couponLoading,
        isSuccess: couponSuccess,
        refetch: couponRefetch,
    } = useCheckCouponAvailabilityQuery({ store_id });

    const isDeliveryOfferExitsInCart = useMemo(
        () => getCampainOfferDeliveryFee(cartList, selectedShippingArea),
        [cartList, selectedShippingArea]
    );

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
                            selectedShippingArea
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

    const handleShippingSelectChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const areaId = e.target.value;
        const selectedCost = getShippingCostByAreaId(areaId, headersetting);
        if (areaId) {
            dispatch(setSelectedShippingArea(areaId));
            dispatch(setShippingAreaCost(selectedCost));
        }
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCost = numberParser(e.target.value);
        const areaId = getShippingAreaIdByCost(selectedCost, headersetting);
        if (areaId) {
            dispatch(setSelectedShippingArea(areaId));
            dispatch(setShippingAreaCost(selectedCost));
        }
    };

    useEffect(() => {
        if (headersetting?.selected_shipping_area) {
            dispatch(
                setSelectedShippingArea(headersetting?.selected_shipping_area)
            );
            const initialAreaCost =
                headersetting?.[
                    `shipping_area_${headersetting?.selected_shipping_area}_cost`
                ];

            if (initialAreaCost >= 0) {
                dispatch(setShippingAreaCost(initialAreaCost));
            }
        } else {
            dispatch(setSelectedShippingArea(null));
        }
    }, [headersetting, dispatch]);

    useEffect(() => {
        const selectedCost = getShippingCostByAreaId(
            selectedShippingArea,
            headersetting
        );

        if (isDeliveryOfferExitsInCart) {
            dispatch(setShippingAreaCost(0));
        } else {
            dispatch(setShippingAreaCost(selectedCost));
        }
    }, [
        headersetting,
        isDeliveryOfferExitsInCart,
        selectedShippingArea,
        dispatch,
    ]);

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
                            shippingAreaCost
                        );
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
        shippingAreaCost,
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
                select
                    ? 'grid sm:flex flex-wrap justify-between items-center grid-cols-6 gap-6'
                    : shippingColOne
                      ? 'grid grid-cols-1 gap-6'
                      : 'grid grid-cols-6 gap-6 items-center'
            }
        >
            <div className="col-span-6">
                {!shippingOff && (
                    <div className="col-span-6 xl:col-span-3">
                        <div className="flex flex-col gap-4 items-start">
                            <label
                                htmlFor="shippingArea"
                                className="block text-xl font-semibold text-gray-700"
                            >
                                Shipping Area
                            </label>
                            <div className="w-full flex flex-col gap-2">
                                {/* Button for Shipping Area 1 */}
                                {headersetting?.shipping_area_1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const event = {
                                                target: {
                                                    value: headersetting.shipping_area_1_cost,
                                                },
                                            } as ChangeEvent<HTMLInputElement>;
                                            handleShippingChange(event);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2 font-semibold border rounded-lg transition-colors ${
                                            selectedShippingArea === '1'
                                                ? 'bg-[var(--header-color)] border-[var(--header-color)]'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span>
                                            {headersetting.shipping_area_1}
                                        </span>
                                        <span className="block font-semibold mt-1">
                                            <BDT />
                                            {headersetting.shipping_area_1_cost}
                                        </span>
                                    </button>
                                )}

                                {/* Button for Shipping Area 2 */}
                                {headersetting?.shipping_area_2 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const event = {
                                                target: {
                                                    value: headersetting.shipping_area_2_cost,
                                                },
                                            } as ChangeEvent<HTMLInputElement>;
                                            handleShippingChange(event);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2 font-semibold border rounded-lg transition-colors
                ${
                    selectedShippingArea === '2'
                        ? 'bg-[var(--header-color)] border-[var(--header-color)]'
                        : 'border-gray-300 hover:bg-gray-50'
                }`}
                                    >
                                        <span>
                                            {headersetting.shipping_area_2}
                                        </span>
                                        <span className="block font-semibold mt-1">
                                            <BDT />
                                            {headersetting.shipping_area_2_cost}
                                        </span>
                                    </button>
                                )}

                                {/* Button for Shipping Area 3 */}
                                {headersetting?.shipping_area_3 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const event = {
                                                target: {
                                                    value: headersetting.shipping_area_3_cost,
                                                },
                                            } as ChangeEvent<HTMLInputElement>;
                                            handleShippingChange(event);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2 font-semibold border rounded-lg transition-colors
                ${
                    selectedShippingArea === '3'
                        ? 'bg-[var(--header-color)] border-[var(--header-color)]'
                        : 'border-gray-300 hover:bg-gray-50'
                }`}
                                    >
                                        {headersetting.shipping_area_3}
                                        <span className="block font-semibold mt-1">
                                            <BDT />
                                            {headersetting.shipping_area_3_cost}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {couponAvailable && (
                    <div className="mt-6">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <label
                                htmlFor="name"
                                className="block text-xl font-semibold text-gray-700"
                            >
                                {'Discount'}
                            </label>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex gap-2 flex-wrap justify-start "
                            >
                                <div className="flex flex-col justify-center">
                                    <input
                                        {...register('coupon_code', {
                                            required: true,
                                        })}
                                        type={'text'}
                                        className="border border-gray-400 py-2 px-2 rounded-sm"
                                    />
                                </div>
                                {loading ? (
                                    <div
                                        style={{
                                            backgroundColor:
                                                design?.header_color,
                                            color: design?.text_color,
                                        }}
                                        className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer ${btnhover}`}
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
                                            backgroundColor:
                                                design?.header_color,
                                            color: design?.text_color,
                                        }}
                                        className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer h-auto ${btnhover}`}
                                    />
                                )}
                            </form>
                        </div>
                        {errors.code && (
                            <span className="pt-3 text-red-500">
                                Field is empty
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountFortyThree;

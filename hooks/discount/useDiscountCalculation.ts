'use client';

import { getShippingCostByAreaId } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { setDiscount } from '@/helpers/setDiscount';
import {
    checkOutApi,
    useCheckCouponAvailabilityQuery,
} from '@/redux/features/checkOut/checkOutApi';
import { setCouponDiscount } from '@/redux/features/filters/couponSlice';
import {
    setSelectedShippingArea,
    setShippingAreaCost,
} from '@/redux/features/filters/shippingAreaFilterSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import {
    getCampainOfferDeliveryFee,
    subTotal,
} from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const useDiscountCalculation = ({ headersetting }: any) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const dispatch: AppDispatch = useAppDispatch();
    const store_id = numberParser(headersetting?.store_id) || null;
    const shippingMethods = JSON.parse(headersetting?.shipping_methods);

    const cartList = useAppSelector((state: RootState) => state.cart.cartList);
    const selectedPayment = useAppSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );

    const { selectedShippingArea, shippingAreaCost } = useAppSelector(
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
        const areaId = numberParser(e.target.value);
        
        const selectedCost = getShippingCostByAreaId(areaId, headersetting);
        dispatch(setShippingAreaCost(selectedCost));
        if (areaId === 0) {
            dispatch(setSelectedShippingArea(null))
            return
        }
        dispatch(setSelectedShippingArea(areaId));
    };

    const handleShippingChange = (item: any) => {
        dispatch(setSelectedShippingArea(item.id));
        dispatch(setShippingAreaCost(item.cost));
    };

    useEffect(() => {
        if (headersetting?.selected_shipping_area) {
            const selectedShippingAreaId = numberParser(
                headersetting?.selected_shipping_area
            );
            dispatch(setSelectedShippingArea(selectedShippingAreaId));

            const initialAreaCost = getShippingCostByAreaId(
                selectedShippingAreaId,
                headersetting
            );

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

    return {
        shippingMethods,
        couponAvailable,
        loading,
        handleShippingChange,
        handleShippingSelectChange,
        selectedShippingArea,
        register,
        handleSubmit,
        onSubmit,
        errors,
    };
};

export default useDiscountCalculation;

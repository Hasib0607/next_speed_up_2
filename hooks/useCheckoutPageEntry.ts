'use client';

import { numberParser } from '@/helpers/numberParser';
import { useGetBookingFormFieldsQuery } from '@/redux/features/checkOut/checkOutApi';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import {
    grandTotal,
    subTotal,
    totalCampainOfferDiscount,
} from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';

const useCheckoutPageEntry = ({ headersetting }: any) => {
    const store_id = headersetting?.store_id || null;
    const dispatch: AppDispatch = useAppDispatch();
    const module_id = 108;

    const {
        data: userBookingFormFieldsData,
        isLoading: userBookingFormFieldsLoading,
        isSuccess: userBookingFormFieldsSuccess,
    } = useGetBookingFormFieldsQuery({ store_id, module_id });

    const [tax, setTax] = useState<any>(0);
    const [bookingData, setBookingData] = useState<any>(null);
    const [bookingStatus, setBookingStatus] = useState<boolean>(false);

    const { cartList } = useAppSelector((state: RootState) => state.cart);

    const total = useMemo(() => subTotal(cartList), [cartList]);

    const cartTotalCampainOfferDiscountAmount = useMemo(
        () => totalCampainOfferDiscount(cartList),
        [cartList]
    );

    const { totalcampainOfferAmount } = useAppSelector(
        (state: RootState) => state.campainOfferFilters
    );

    const { couponDiscount } = useAppSelector(
        (state: RootState) => state.couponSlice
    );

    const { shippingAreaCost } = useAppSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    const totalDis = useMemo(
        () => couponDiscount + totalcampainOfferAmount,
        [couponDiscount, totalcampainOfferAmount]
    );

    const gTotal = useMemo(
        () => grandTotal(total, tax, shippingAreaCost, totalDis),
        [total, tax, shippingAreaCost, totalDis]
    );

    const isCartEmpty = useMemo(() => cartList?.length === 0, [cartList]);

    useEffect(() => {
        if (cartTotalCampainOfferDiscountAmount > 0) {
            dispatch(
                setTotalCampainOfferDis(cartTotalCampainOfferDiscountAmount)
            );
        } else {
            dispatch(setTotalCampainOfferDis(0));
        }
    }, [cartTotalCampainOfferDiscountAmount, dispatch]);

    useEffect(() => {
        dispatch(setPurchaseList([]));
        dispatch(setGrandTotal(0));
    }, [dispatch]);

    useEffect(() => {
        if (headersetting?.tax) {
            const tax = (numberParser(headersetting?.tax) / 100) * total;
            setTax(tax);
        }
    }, [headersetting?.tax, total]);

    // Extracting booking data from db
    useEffect(() => {
        if (userBookingFormFieldsSuccess) {
            const userBookingFormFields =
                userBookingFormFieldsData?.data?.data || [];
            setBookingData(userBookingFormFields);
            setBookingStatus(userBookingFormFieldsData?.status);
        }
    }, [userBookingFormFieldsData, userBookingFormFieldsSuccess]);

    return {
        tax,
        total,
        gTotal,
        totalDis,
        isCartEmpty,
        bookingData,
        bookingStatus,
        userBookingFormFieldsLoading,
    };
};

export default useCheckoutPageEntry;

'use client';

import { useGetBookingFormFieldsQuery } from '@/redux/features/checkOut/checkOutApi';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import YourOrders from './your-orders/your-order';

import { AppDispatch, RootState } from '@/redux/store';
import BookingFrom from '@/components/BookingFrom';
import {
    grandTotal,
    subTotal,
    totalCampainOfferDiscount,
} from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import PriceBreakdown from './price-breakdown/price-breakdown';
import { numberParser } from '@/helpers/numberParser';
import AddressFortyFour from './address-forty-four/address-forty-four';
import DiscountFortyFour from './discount-forty-four/discount-forty-four';
import PaymentGatewayFortyFour from './payment-gateway-forty-four/payment-gateway-forty-four';
import PaymentConditionsFortyFour from './payment-conditions-forty-four';

const CheckOutFortyThree = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;
    const module_id = 108;
    const dispatch: AppDispatch = useAppDispatch();
    const { cartList } = useAppSelector((state: RootState) => state.cart);
    const { shippingAreaCost } = useAppSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    const total = subTotal(cartList);
    const {
        data: userBookingFormFieldsData,
        isLoading: userBookingFormFieldsLoading,
        isSuccess: userBookingFormFieldsSuccess,
    } = useGetBookingFormFieldsQuery({ store_id, module_id });

    const [selectAddress, setSelectAddress] = useState(null);
    const [bookingData, setBookingData] = useState<any>(null);
    const [checked, setChecked] = useState<boolean>(false);
    const [tax, setTax] = useState<any>(0);
    const [bookingStatus, setBookingStatus] = useState<boolean>(false);

    const cartTotalCampainOfferDiscountAmount = useMemo(
        () => totalCampainOfferDiscount(cartList),
        [cartList]
    );

    const { totalcampainOfferAmount } = useSelector(
        (state: RootState) => state.campainOfferFilters
    );

    const { couponDiscount } = useSelector(
        (state: RootState) => state.couponSlice
    );

    const totalDis = useMemo(
        () => couponDiscount + totalcampainOfferAmount,
        [couponDiscount, totalcampainOfferAmount]
    );

    const gTotal = grandTotal(total, tax, shippingAreaCost, totalDis);

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
    

    // Extracting data from db
    useEffect(() => {
        if (userBookingFormFieldsSuccess) {
            const userBookingFormFields =
                userBookingFormFieldsData?.data?.data || [];
            setBookingData(userBookingFormFields);
            setBookingStatus(userBookingFormFieldsData?.status);
        }
    }, [userBookingFormFieldsData, userBookingFormFieldsSuccess]);

    if (cartList?.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="text-center">
                    <h3 className="text-gray-400 text-2xl font-bold">
                        You have no product in your cart!{' '}
                    </h3>
                    <h6 className="text-gray-400 text-xl font-semibold">
                        Please Add Some Product
                    </h6>
                </div>
            </div>
        );
    }

    const formFieldStyle =
        'w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400 placeholder:capitalize';

    return (
        <div className="container lg:px-28 px-5 mt-10">
            <div className="lg:grid lg:grid-cols-5 lg:gap-20 py-4 px-2">
                <div className="mt-5 lg:mt-0 lg:col-span-3 space-y-4">
                    <div className="pb-5">
                        <h1 className="text-2xl font-bold text-center ">
                            Checkout Info
                        </h1>
                    </div>
                    {bookingStatus && (
                        <div className="overflow-hidden">
                            <div className="px-4 py-5 bg-[#F4F4F4] space-y-6 sm:p-6">
                                <BookingFrom bookingData={bookingData} />
                            </div>
                        </div>
                    )}
                    {userBookingFormFieldsLoading ? (
                        'loading...'
                    ) : (
                        <>
                            {!bookingStatus && (
                                    <div>
                                        <AddressFortyFour
                                            design={design}
                                            appStore={appStore}
                                            selectAddress={selectAddress}
                                            setSelectAddress={setSelectAddress}
                                            formFieldStyle={formFieldStyle}
                                        />
                                    </div>
                            )}
                        </>
                    )}
                    <div className="py-5 sm:p-6 bg-[#F4F4F4] rounded">
                        <PriceBreakdown gTotal={gTotal} total={total} />
                    </div>
                    <div>
                        <PaymentGatewayFortyFour
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                        />
                    </div>

                    <div>
                        <DiscountFortyFour appStore={appStore} />
                    </div>

                    <div>
                        <PaymentConditionsFortyFour
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            setChecked={setChecked}
                        />
                    </div>
                </div>

                <div className="mt-5 lg:mt-0 lg:col-span-2">
                    <YourOrders
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                        selectAddress={selectAddress}
                        gTotal={gTotal}
                        totalDis={totalDis}
                        tax={tax}
                        bookingStatus={bookingStatus}
                        checked={checked}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckOutFortyThree;

'use client';

import { useState } from 'react';
import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import DiscountSeven from '../_components/discount-seven/discount-seven';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import BookingFrom from '@/components/BookingFrom';
import useCheckoutPageEntry from '@/hooks/useCheckoutPageEntry';

const CheckOutForty = ({ design, appStore, headersetting }: any) => {
    const [selectAddress, setSelectAddress] = useState(null);
    const {
        tax,
        gTotal,
        totalDis,
        isCartEmpty,
        bookingStatus,
        bookingData,
        userBookingFormFieldsLoading,
    } = useCheckoutPageEntry(headersetting);

    if (isCartEmpty) {
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
        'w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400';

    return (
        <div className="container lg:px-28 px-5 mt-10">
            <div className="text-center pb-5">
                <h1 className="text-2xl uppercase">Checkout</h1>
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
                <div className="mt-5 lg:mt-0 lg:col-span-2">
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
                                <>
                                    <h3 className="font-semibold text-xl text-black">
                                        Shipping Address
                                    </h3>
                                    <div className="overflow-hidden">
                                        <div className="px-4 py-5 bg-[#F4F4F4] space-y-6 sm:p-6">
                                            <Address
                                                design={design}
                                                appStore={appStore}
                                                selectAddress={selectAddress}
                                                setSelectAddress={
                                                    setSelectAddress
                                                }
                                                formFieldStyle={formFieldStyle}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="overflow-hidden my-5">
                        <div className="px-4 py-5 bg-[#F4F4F4] space-y-6 sm:p-6">
                            <DiscountSeven
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                                bookingStatus={bookingStatus}
                                className={''}
                            />
                        </div>
                    </div>
                    <div className="overflow-hidden my-5">
                        <div className="px-4 py-5 bg-[#F4F4F4] space-y-6 sm:p-6">
                            <PaymentGateway
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                            />
                        </div>
                    </div>
                    <PaymentConditions
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                    />
                </div>

                <div className="mt-5 lg:mt-0 lg:col-span-1">
                    <YourOrders
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                        selectAddress={selectAddress}
                        gTotal={gTotal}
                        totalDis={totalDis}
                        tax={tax}
                        bookingStatus={bookingStatus}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckOutForty;

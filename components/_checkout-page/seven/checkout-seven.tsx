'use client';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import DiscountSeven from '../_components/discount-seven/discount-seven';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import Booking from '@/components/BookingFrom';
import useCheckoutPageEntry from '@/hooks/useCheckoutPageEntry';
import { useState } from 'react';

const CheckOutSeven = ({ design, appStore, headersetting }: any) => {
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
        <div className="bg-white container px-5">
            <h1 className="text-center py-10 text-3xl font-bold">Checkout</h1>
            <div className="md:grid lg:grid-cols-3 md:gap-10 xl:gap-16 mt-1 py-4 px-2">
                <div className="mt-5 lg:mt-0 lg:col-span-2">
                    {bookingStatus && <Booking bookingData={bookingData} />}
                    {userBookingFormFieldsLoading ? (
                        'loading...'
                    ) : (
                        <>
                            {!bookingStatus && (
                                <>
                                    <h3 className="font-semibold text-xl text-black">
                                        Shipping Address
                                    </h3>
                                    <div
                                        className={`${
                                            design?.template_id === '34'
                                                ? 'bg-thirty-one border border-white'
                                                : 'bg-white'
                                        }  shadow sm:rounded-md sm:overflow-hidden mb-5`}
                                    >
                                        <div className="px-4 py-5 space-y-6 sm:p-6">
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
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <DiscountSeven
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                                bookingStatus={bookingStatus}
                            />
                        </div>
                    </div>
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <PaymentGateway
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                                note
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

export default CheckOutSeven;

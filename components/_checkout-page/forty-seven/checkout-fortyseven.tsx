'use client';

import { useState } from 'react';
import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import useCheckoutPageEntry from '@/hooks/useCheckoutPageEntry';

const CheckOutFortySeven = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;

    const [selectAddress, setSelectAddress] = useState(null);
    const { tax, gTotal, totalDis, isCartEmpty } =
        useCheckoutPageEntry(headersetting);

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
        'w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400 placeholder-gray-500 placeholder:capitalize';

    return (
        <div
            className=""
        >
            <div className="sm:container px-5 xl:px-24">
                <h2 className="py-10 text-4xl font-semibold mt-12">
                    Checkout
                </h2>
                <div className="container">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-1 py-4">
                        <div className="mt-5 lg:mt-0 lg:col-span-1 lg:h-max lg:sticky lg:top-28">
                            <div
                                className="sm:overflow-hidden mb-5"
                            >
                                <div className="px-4 py-5 space-y-6 sm:p-6">
                                    <Address
                                        design={design}
                                        appStore={appStore}
                                        selectAddress={selectAddress}
                                        setSelectAddress={setSelectAddress}
                                        formFieldStyle={formFieldStyle}
                                        distLang = {"en"}
                                    />
                                </div>
                            </div>

                            <Discount
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                                shippingColOne
                            />

                            {/* don't remove this below */}
                            {/* <div className="border border-gray-300 rounded-md p-6">
                                <PaymentGateway
                                    selectPayment={selectPayment}
                                    setSelectPayment={setSelectPayment}
                                />
                            </div> */}
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFortySeven;

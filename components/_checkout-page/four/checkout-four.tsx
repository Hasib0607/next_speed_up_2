'use client';

import { useEffect, useState } from 'react';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import useCheckoutPageEntry from '@/hooks/useCheckoutPageEntry';

const CheckOutFour = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;

    const [checked, setChecked] = useState<boolean>(false);
    const [selectAddress, setSelectAddress] = useState(null);

    const { tax, gTotal, totalDis, isCartEmpty } =
        useCheckoutPageEntry(headersetting);


    useEffect(() => {
        if (store_id !== 8729) {
            setChecked(true);
        }
    }, [store_id]);

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
        <div className="" style={{ backgroundColor: '#F3F4F6' }}>
            <h2 className="py-10 text-4xl font-semibold text-center">
                Checkout
            </h2>
            <div className="container">
                <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
                    <div className="mt-5 lg:mt-0 lg:col-span-2">
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
                                   setSelectAddress={setSelectAddress}
                                   formFieldStyle={formFieldStyle}
                                />
                            </div>
                        </div>
                        <Discount
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            shippingColOne
                            shippingOff
                            select
                        />
                        <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
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
                            setChecked={setChecked}
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
                            checked={checked}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFour;
